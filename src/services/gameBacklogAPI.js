// GameBacklog API Service
// This service handles interactions with SteamGridDB API

class GameBacklogAPI {
  constructor() {
    // In a production environment, you should:
    // 1. Get your API key from https://www.steamgriddb.com/profile/preferences/api
    // 2. Store it securely (environment variables)
    // 3. Use a backend proxy to avoid exposing the API key
    this.apiKey = import.meta.env.VITE_STEAMGRIDDB_API_KEY || null; // Using environment variable
    
    // Use different endpoints for dev vs production
    if (import.meta.env.DEV) {
      // Development: Use Vite proxy
      this.baseURL = '/api/steamgriddb';
    } else {
      // Production: Use Netlify function
      this.baseURL = '/.netlify/functions/steamgriddb';
    }
    
    // Debug: Log API key status
    console.log('SteamGridDB API Key loaded:', this.apiKey ? 'Yes (Key: ' + this.apiKey.substring(0, 8) + '...)' : 'No');
    console.log('Using proxy URL:', this.baseURL);
    console.log('Environment:', import.meta.env.DEV ? 'Development' : 'Production');
  }

  // Search for games
  async searchGames(query) {
    try {
      if (!query.trim()) return [];

      console.log('Searching for:', query);
      console.log('Using baseURL:', this.baseURL);
      console.log('API Key available:', !!this.apiKey);

      // If no API key is set, return mock data for development
      if (!this.apiKey) {
        console.log('No API key, returning mock data');
        return this.getMockSearchResults(query);
      }

      const url = `${this.baseURL}/search/autocomplete/${encodeURIComponent(query)}`;
      console.log('Fetching URL:', url);

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      console.log('First result structure:', JSON.stringify(data.data[0], null, 2));
      console.log('All available fields for first result:', Object.keys(data.data[0] || {}));
      return this.formatSearchResults(data.data || []);
    } catch (error) {
      console.error('Error searching games:', error);
      // Fallback to mock data on error
      console.log('Falling back to mock data');
      return this.getMockSearchResults(query);
    }
  }

  // Get game artwork
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

  // Format search results to consistent structure
  formatSearchResults(results) {
    return results.map((result, index) => ({
      id: result.id,
      name: result.name,
      thumb: result.thumb || `https://picsum.photos/150/150?random=${result.id}`,
      released: result.release_date ? new Date(result.release_date * 1000).getFullYear() : null,
      verified: result.verified || false,
      types: result.types || [],
      // Preserve all original data for debugging
      _raw: result
    }));
  }

  // Mock data for development/testing when API key is not available
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

    // Filter mock games based on query
    const filtered = mockGames.filter(game => 
      game.toLowerCase().includes(query.toLowerCase())
    );

    // If no matches, create a mock entry for the search query
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

  // Enhanced artwork fetching with different types
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
