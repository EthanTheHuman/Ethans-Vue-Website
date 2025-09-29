<template>
  <!-- 
    Game Backlog Component
    Features:
    - Add games by searching SteamGridDB API
    - Drag & drop to reorder priority
    - Custom tags and names
    - Import/Export backlog as JSON for transferring between browsers
    - Filter by tags and sort by name/priority
  -->
  <div class="game-backlog">
    <div class="header-section">
      <h1>Game Backlog</h1>
      <div class="controls">
        <div class="search-section">
          <div class="search-input-container">
            <input
              v-model="searchQuery"
              @input="searchGames"
              type="text"
              placeholder="Search for games to add..."
              class="search-input"
            />
            <button 
              v-if="searchResults.length > 0"
              @click="clearSearch"
              class="clear-search-button"
              type="button"
            >
              ×
            </button>
          </div>
          <div v-if="searchResults.length > 0" class="search-results">
            <div
              v-for="game in searchResults"
              :key="game.id"
              @click="addGameToBacklog(game)"
              class="search-result-item"
            >
              <span class="game-name">{{ game.name }}</span>
              <span v-if="game.types && game.types.length > 0" class="platform-info">{{ game.types.join(', ') }}</span>
              <span v-if="game.released" class="release-year">({{ game.released }})</span>
            </div>
          </div>
        </div>
        
        <div class="view-controls">
          <button
            @click="currentView = 'priority'"
            :class="{ active: currentView === 'priority' }"
            class="view-button"
          >
            Priority Order
          </button>
          <button
            @click="currentView = 'name'"
            :class="{ active: currentView === 'name' }"
            class="view-button"
          >
            Name Order
          </button>
        </div>
        
        <div class="data-controls">
          <button @click="exportBacklog" class="data-button export-button">
            📤 Export
          </button>
          <input
            ref="fileInput"
            type="file"
            accept=".json"
            @change="handleImport"
            style="display: none;"
          />
          <button @click="$refs.fileInput.click()" class="data-button import-button">
            📥 Import
          </button>
        </div>
      </div>
    </div>

    <div class="filter-section">
      <div class="tag-filters">
        <span class="filter-label">Filter by tags:</span>
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="toggleTagFilter(tag)"
          :class="{ active: selectedTags.includes(tag) }"
          class="tag-filter-button"
        >
          {{ tag }}
        </button>
        <button @click="clearTagFilters" class="clear-filters-button">Clear All</button>
      </div>
      
      <button @click="surpriseMe" class="surprise-button">🎲 Surprise Me!</button>
    </div>

    <div class="games-grid" :class="{ 'priority-view': currentView === 'priority' }">
      <div
        v-for="(game, index) in filteredGames"
        :key="game.id"
        :draggable="currentView === 'priority'"
        @dragstart="onDragStart(index)"
        @dragover="onDragOver"
        @drop="onDrop(index)"
        class="game-card"
        :class="{ dragging: draggingIndex === index }"
      >
        <div class="game-image">
          <img :src="game.image || game.thumb" :alt="game.name" />
          <div v-if="currentView === 'priority'" class="priority-number">{{ index + 1 }}</div>
        </div>
        
        <div class="game-info">
          <div class="game-name">
            <div class="canonical-name">{{ game.name }}</div>
            <input
              v-model="game.customName"
              @blur="updateCustomName(game)"
              class="custom-name-input"
              :placeholder="'Sort name (leave blank for default)'"
            />
          </div>
          
          <div class="game-tags">
            <input
              v-model="game.tagInput"
              @keyup.enter="addTag(game)"
              @blur="addTag(game)"
              placeholder="Add tags..."
              class="tag-input"
              :key="game.id + '-tag-input'"
            />
            <div class="tags-list">
              <span
                v-for="tag in game.tags"
                :key="tag"
                class="tag"
                @click="removeTag(game, tag)"
              >
                {{ tag }} ×
              </span>
            </div>
          </div>
        </div>
        
        <button @click="removeGame(game.id)" class="remove-button">×</button>
      </div>
    </div>
    
    <div v-if="filteredGames.length === 0" class="empty-state">
      <p v-if="backlogGames.length === 0">No games in your backlog yet. Search for games above to get started!</p>
      <p v-else>No games match your current filters.</p>
    </div>
  </div>
</template>

<script>
import GameBacklogAPI from '../../services/gameBacklogAPI.js';

export default {
  name: 'GameBacklog',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      searchTimeout: null,
      backlogGames: [],
      currentView: 'priority', // 'priority' or 'name'
      selectedTags: [],
      draggingIndex: null,
      nextId: 1,
    }
  },
  computed: {
    allTags() {
      const tags = new Set();
      this.backlogGames.forEach(game => {
        game.tags.forEach(tag => tags.add(tag));
      });
      return Array.from(tags).sort();
    },
    filteredGames() {
      let filtered = this.backlogGames.filter(game => {
        if (this.selectedTags.length === 0) return true;
        return this.selectedTags.some(tag => game.tags.includes(tag));
      });

      if (this.currentView === 'name') {
        filtered = [...filtered].sort((a, b) => {
          const nameA = a.customName || a.name;
          const nameB = b.customName || b.name;
          return nameA.localeCompare(nameB);
        });
      }
      // For priority view, we maintain the existing order

      return filtered;
    }
  },
  methods: {
    async searchGames() {
      if (!this.searchQuery.trim()) {
        this.searchResults = [];
        return;
      }

      // Clear previous timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Debounce the search
      this.searchTimeout = setTimeout(async () => {
        try {
          this.searchResults = await GameBacklogAPI.searchGames(this.searchQuery);
        } catch (error) {
          console.error('Error searching games:', error);
          this.searchResults = [];
        }
      }, 300);
    },
    clearSearch() {
      this.searchQuery = '';
      this.searchResults = [];
    },
    async addGameToBacklog(gameData) {
      const existingGame = this.backlogGames.find(g => g.name === gameData.name);
      if (existingGame) {
        alert('Game already in backlog!');
        return;
      }

      // Get the actual game artwork in 600x900 poster format
      let gameImage = gameData.thumb;
      try {
        gameImage = await GameBacklogAPI.getGameArtwork(gameData.id, '600x900');
        console.log('Fetched poster artwork for', gameData.name, ':', gameImage);
      } catch (error) {
        console.log('Could not fetch artwork, using placeholder');
        gameImage = `https://picsum.photos/600/900?random=${gameData.id}`;
      }

      const newGame = {
        id: this.nextId++,
        steamGridId: gameData.id, // Store the SteamGridDB ID
        name: gameData.name,
        customName: '',
        image: gameImage,
        thumb: gameData.thumb,
        tags: [],
        tagInput: '', // Ensure each game has its own empty tagInput
        priority: this.backlogGames.length, // Add at end (lowest priority)
        verified: gameData.verified || false,
        released: gameData.released || null
      };

      this.backlogGames.push(newGame);
      this.searchResults = [];
      this.searchQuery = '';
      this.saveToLocalStorage();
    },
    removeGame(gameId) {
      const index = this.backlogGames.findIndex(g => g.id === gameId);
      if (index > -1) {
        this.backlogGames.splice(index, 1);
        // Update priorities for remaining games
        this.backlogGames.forEach((game, i) => {
          game.priority = i;
        });
        this.saveToLocalStorage();
      }
    },
    updateCustomName(game) {
      // Custom name is already bound to the input, no additional action needed
      this.saveToLocalStorage();
    },
    addTag(game) {
      if (!game.tagInput.trim()) return;
      
      const newTag = game.tagInput.trim().toLowerCase();
      if (!game.tags.includes(newTag)) {
        game.tags.push(newTag);
        // Sort tags alphabetically after adding
        game.tags.sort();
        this.saveToLocalStorage();
      }
      // Always clear the input after attempting to add a tag
      game.tagInput = '';
    },
    removeTag(game, tag) {
      const index = game.tags.indexOf(tag);
      if (index > -1) {
        game.tags.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    toggleTagFilter(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
    },
    clearTagFilters() {
      this.selectedTags = [];
    },
    surpriseMe() {
      const filtered = this.filteredGames;
      if (filtered.length === 0) {
        alert('No games match your current filters!');
        return;
      }
      
      const randomGame = filtered[Math.floor(Math.random() * filtered.length)];
      alert(`🎮 Your random game is: ${randomGame.customName || randomGame.name}!`);
    },
    // Drag and drop methods for priority reordering
    onDragStart(index) {
      if (this.currentView !== 'priority') return;
      this.draggingIndex = index;
    },
    onDragOver(event) {
      if (this.currentView !== 'priority') return;
      event.preventDefault();
    },
    onDrop(targetIndex) {
      if (this.currentView !== 'priority' || this.draggingIndex === null) return;
      
      event.preventDefault();
      
      const draggedGame = this.backlogGames[this.draggingIndex];
      
      // Remove the dragged item
      this.backlogGames.splice(this.draggingIndex, 1);
      
      // Insert at new position
      this.backlogGames.splice(targetIndex, 0, draggedGame);
      
      // Update priorities
      this.backlogGames.forEach((game, i) => {
        game.priority = i;
      });
      
      this.draggingIndex = null;
      this.saveToLocalStorage();
    },
    exportBacklog() {
      try {
        const exportData = {
          version: '1.0',
          exportDate: new Date().toISOString(),
          games: this.backlogGames.map(game => {
            const { tagInput, ...gameData } = game;
            return gameData;
          }),
          nextId: this.nextId
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `game-backlog-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert(`Successfully exported ${this.backlogGames.length} games!`);
      } catch (error) {
        console.error('Error exporting backlog:', error);
        alert('Failed to export backlog. Please try again.');
      }
    },
    handleImport(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.name.endsWith('.json')) {
        alert('Please select a valid JSON file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target.result);
          this.importBacklog(importData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Invalid JSON file. Please check the file and try again.');
        }
      };
      reader.readAsText(file);
      
      // Reset the input so the same file can be selected again if needed
      event.target.value = '';
    },
    importBacklog(importData) {
      try {
        // Validate the import data structure
        if (!importData.games || !Array.isArray(importData.games)) {
          throw new Error('Invalid file format: missing games array');
        }

        // Ask user how to handle the import
        const importChoice = confirm(
          `This will import ${importData.games.length} games.\n\n` +
          'Click "OK" to REPLACE your current backlog.\n' +
          'Click "Cancel" to MERGE with your current backlog.'
        );

        let newGames = [...importData.games];
        let newNextId = importData.nextId || this.nextId;

        if (!importChoice) {
          // Merge mode: Add new games that don't already exist
          const existingGameNames = new Set(this.backlogGames.map(g => g.name.toLowerCase()));
          const uniqueNewGames = importData.games.filter(game => 
            !existingGameNames.has(game.name.toLowerCase())
          );

          // Reassign IDs to avoid conflicts
          const maxExistingId = Math.max(...this.backlogGames.map(g => g.id), 0);
          uniqueNewGames.forEach((game, index) => {
            game.id = maxExistingId + index + 1;
          });

          newGames = [...this.backlogGames, ...uniqueNewGames];
          newNextId = Math.max(newNextId, maxExistingId + uniqueNewGames.length + 1);

          alert(`Successfully merged ${uniqueNewGames.length} new games into your backlog!`);
        } else {
          // Replace mode: Use imported data as-is
          alert(`Successfully replaced your backlog with ${newGames.length} games!`);
        }

        // Validate and clean up the games data
        newGames.forEach((game, index) => {
          // Ensure required properties exist
          if (!game.id) game.id = index + 1;
          if (!game.name) game.name = 'Unknown Game';
          if (!game.tags) game.tags = [];
          if (!game.customName) game.customName = '';
          if (typeof game.priority !== 'number') game.priority = index;
          
          // Remove tagInput if it exists (shouldn't be persisted)
          delete game.tagInput;
          
          // Ensure tags are sorted
          game.tags.sort();
        });

        // Update component state
        this.backlogGames = newGames;
        this.nextId = newNextId;
        
        // Update priorities to ensure they're sequential
        this.backlogGames.forEach((game, index) => {
          game.priority = index;
        });

        // Save to localStorage
        this.saveToLocalStorage();

      } catch (error) {
        console.error('Error importing backlog:', error);
        alert('Failed to import backlog: ' + error.message);
      }
    },
    // Local storage methods
    saveToLocalStorage() {
      try {
        // Create a clean copy of games without tagInput to avoid persisting input state
        const gamesToSave = this.backlogGames.map(game => {
          const { tagInput, ...gameWithoutInput } = game;
          return gameWithoutInput;
        });
        
        localStorage.setItem('gameBacklog', JSON.stringify({
          games: gamesToSave,
          nextId: this.nextId
        }));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },
    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('gameBacklog');
        if (saved) {
          const data = JSON.parse(saved);
          this.backlogGames = data.games || [];
          this.nextId = data.nextId || 1;
          
          // Ensure all games have required properties and sorted tags
          this.backlogGames.forEach(game => {
            if (!game.tags) game.tags = [];
            if (!game.customName) game.customName = '';
            // Always clear tagInput on load - don't persist input state
            game.tagInput = '';
            // Sort existing tags alphabetically
            game.tags.sort();
          });
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
  },
  mounted() {
    this.loadFromLocalStorage();
  }
}
</script>

<style src="./GameBacklog.css" scoped></style>
