<script setup>
import data from './Frens/FrensGameData.json'
</script>

<template>
    <div class="container">
        <div class="left-column">
            <FrensColumn :friends="FrensList" @toggleFriend="toggleFriend" />
        </div>
        <div class="right-column">
            <GamesList :games="filteredGames" />
        </div>
    </div>
</template>

<script>
import FrensColumn from './Frens/FrensColumn.vue';
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
            const filtered = this.GameList.filter(game => {
                const friendsWhoOwn = this.selectedFriends.filter(friend =>
                    friend.Games.includes(game.ShortName)
                );
                return friendsWhoOwn.length == this.selectedFriends.length && friendsWhoOwn.length <= game.MaxPlayers && friendsWhoOwn.length >= game.MinPlayers;
            });
            if (this.selectedFriends.length === 0) {
                return this.GameList;
            }
            else {
                return filtered;
            }
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


<style scoped>

* {
  box-sizing: border-box;
  color: white;
  margin: 0;
}

h1 {
  font-size: 3rem;
  margin-bottom: 0;
  color: var(--main-color);
}

svg {
  fill: currentColor;
  width: 1em;
  height: 1em;
  vertical-align: baseline;
  position: relative;
  top: 0.15em;
  left: 0.1em;
  margin-right: 0.5em;
}

.pagebody {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  height: 100%;
}

.grayed-out {
  color: gray;
  text-decoration: none;
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 0 2rem;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-text);
}

.mainMenuSelect {
  width: 100%;
  text-align: left;
  display: block;
  margin-right: auto;
  margin-top: 20px;
  padding-left: 1rem;
}

.itchLinks {
  justify-content: space-between;
  display: block;
  padding-left: 2rem;
  padding-right: 2rem;
}

.mainMenuSelect h1 {
  font-size: 1.4rem;
  margin-bottom: 0;
  color: var(--main-color);
  margin-left: -5px;
}

.mainMenuSelect a {
  display: block;
  width: 100%;
  margin-bottom: 0;
  padding-left: 1.4rem;
  font-size: 1.4rem;
}

.mainMenuSelect a:hover {
  background-color: rgb(255, 255, 255);
  font-size: 1.5rem;
  color: black;
  fill: black;
  padding-left: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.mainMenuSelect a:hover svg {
  background-color: rgb(255, 255, 255);
  font-size: 1.5rem;
  fill: black;
}

.firecutin {
  max-width: 300px;
  width: 100%;
  flex: 0 0 auto;
  background-color: whitesmoke;
  object-fit: cover;
  border-left: solid white 3px;
  border-right: solid white 3px;
  display: flex;
}
@media (min-width: 768px) {
  .mainMenuSelect::before {
    content: '';   /* This is necessary to make the pseudo-element render */
    display: block;
    position: absolute;
    top: 0;        /* Start from the top of the .content element */
    bottom: 0;     /* Stretch to the bottom of the .content element */
    left: 0;       /* Place it at the left side */
    width: 0.25rem;    /* Width of the line */
    background-color: var(--main-color);  /* Color of the line; change as needed */
  }

  .mainMenuSelect a::before {
    content: '';   /* This is necessary to make the pseudo-element render */
    display: block;
    position: absolute;
    top: 0;        /* Start from the top of the .content element */
    bottom: 0;     /* Stretch to the bottom of the .content element */
    left: 0;       /* Place it at the left side */
    width: 1rem;    /* Width of the line */
    background-color: var(--main-color);  /* Color of the line; change as needed */
  }
}

@media (max-width: 768px) {
  .pagebody {
    flex-direction: column;
    align-items: center;
    /* Center the children on the X-axis */
  }

  .firecutin {
    width: 100%;
    /* Adjust based on how large you want the image on mobile */
    height: 50px;
    max-width: none;
    margin: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: solid white 3px;
  }

  .content {
    width: 90%;
    /* Take up 90% of the screen width */
    text-align: center;
    padding: 1rem 0;
    /* Padding to the top and bottom, no horizontal padding */
  }

  .mainMenuSelect {
    text-align: left;
    padding: 0;
  }

  .itchLinks {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>