<template>
    <div class="container">
      <div class="left-column">
        <FriendsColumn
          :friends="FrensList"
          @toggleFriend="toggleFriend"
        />
      </div>
      <div class="right-column">
        <GamesList
          :games="filteredGames"
        />
      </div>
    </div>
  </template>
  
  <script>
  import FriendsColumn from './Frens/FrensColumn.vue';
  import GamesList from './Frens/GamesList.vue';
  
  export default {
    data() {
      return {
        FrensList: [], // Initially empty
        GameList: [],  // Initially empty
        selectedFriends: []
      };
    },
    computed: {
      filteredGames() {
        return this.GameList.filter(game => {
          const friendsWhoOwn = this.selectedFriends.filter(friend =>
            friend.Games.includes(game.ShortName)
          );
          return friendsWhoOwn.length > 0 && friendsWhoOwn.length <= game.MaxPlayers;
        });
      }
    },
    methods: {
      toggleFriend(friend) {
        const index = this.selectedFriends.indexOf(friend);
        if (index > -1) {
          this.selectedFriends.splice(index, 1);
        } else {
          this.selectedFriends.push(friend);
        }
      },
      async fetchData() {
        try {
          const response = await fetch('/Frens/FrensGameData.json'); // Fetch the JSON file from public folder
          const data = await response.json();
          this.FrensList = data.FrensList;
          this.GameList = data.GameList;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    },
    mounted() {
      this.fetchData(); // Fetch data when the component is mounted
    }
  };
  </script>
  