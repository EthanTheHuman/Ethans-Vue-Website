// GameBacklog API Service
class GameBacklogAPI {
  constructor() {
    this.apiKey = import.meta.env.VITE_STEAMGRIDDB_API_KEY || null;
    
    if (import.meta.env.DEV) {
      this.baseURL = '/api/steamgriddb';
    } else {
      this.baseURL = '/.netlify/functions/steamgriddb';
    }
  }

  async searchGames(query) {
    try {
      if (!query.trim()) return [];

      if (!this.apiKey) {
        return this.getMockSearchResults(query);
      }

      const url = `${this.baseURL}/search/autocomplete/${encodeURIComponent(query)}`;
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return this.formatSearchResults(data.data || []);
    } catch (error) {
      console.error('Error searching games:', error);
      return this.getMockSearchResults(query);
    }
  }

  async getGameArtwork(gameId, dimensions = '600x900') {
    try {
      if (!this.apiKey) {
        return `https://via.placeholder.com/${dimensions}?text=Game+Art`;
      }

      const response = await fetch(`${this.baseURL}/grids/game/${gameId}?dimensions=${dimensions}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        return data.data[0].url;
      }
      
      return `https://via.placeholder.com/${dimensions}?text=No+Art`;
    } catch (error) {
      console.error('Error fetching game artwork:', error);
      return `https://via.placeholder.com/${dimensions}?text=Error`;
    }
  }

  formatSearchResults(results) {
    return results.map(result => ({
      id: result.id,
      name: result.name,
      thumb: result.thumb || `https://picsum.photos/150/150?random=${result.id}`,
      released: result.release_date ? new Date(result.release_date * 1000).getFullYear() : null,
      verified: result.verified || false,
      types: result.types || []
    }));
  }

  getMockSearchResults(query) {
    const mockGames = [
      'The Legend of Zelda: Breath of the Wild',
      'Super Mario Odyssey',
      'God of War',
      'Red Dead Redemption 2',
      'The Witcher 3: Wild Hunt',
      'Cyberpunk 2077',
      'Elden Ring',
      'Hades',
      'Among Us',
      'Fall Guys',
      'Assassin\'s Creed Valhalla',
      'Call of Duty: Modern Warfare II',
      'FIFA 23',
      'Minecraft',
      'Grand Theft Auto V',
      'Fortnite',
      'Apex Legends',
      'Valorant',
      'League of Legends',
      'World of Warcraft'
    ];

    const filtered = mockGames.filter(game => 
      game.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      filtered.push(query);
    }

    return filtered.slice(0, 5).map((gameName, index) => ({
      id: Date.now() + index,
      name: gameName,
      thumb: `https://picsum.photos/150/150?random=${Date.now() + index}`,
      released: new Date().getFullYear() - Math.floor(Math.random() * 10),
      verified: Math.random() > 0.3
    }));
  }

  async getGameArtworkByType(gameId, type = 'grid', dimensions = null) {
    const types = {
      grid: 'grids',
      hero: 'heroes', 
      logo: 'logos',
      icon: 'icons'
    };

    try {
      if (!this.apiKey) {
        const defaultDimensions = {
          grid: '600x900',
          hero: '1920x620',
          logo: '400x400',
          icon: '128x128'
        };
        
        const dim = dimensions || defaultDimensions[type];
        return `https://via.placeholder.com/${dim}?text=${type}`;
      }

      const endpoint = types[type] || 'grids';
      let url = `${this.baseURL}/${endpoint}/game/${gameId}`;
      
      if (dimensions) {
        url += `?dimensions=${dimensions}`;
      }

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        return data.data[0].url;
      }
      
      return `https://via.placeholder.com/300x400?text=No+${type}`;
    } catch (error) {
      console.error(`Error fetching game ${type}:`, error);
      return `https://via.placeholder.com/300x400?text=Error`;
    }
  }
}

export default new GameBacklogAPI();
