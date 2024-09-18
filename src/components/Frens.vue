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
                this.FrensList = data.FrensList;
                this.FrensList.push({ Name: 'Ethan', Games: ['Minecraft'] });
                this.GameList = data.GameList;
                this.GameList.push({ Name: 'Minecraft', MinPlayers: 1, MaxPlayers: 4, ShortName: 'MC' });
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
/* Reset */

html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}


/* Essentials */

.container {
    display: table;
}

.content {
    display: table-row;
    height: 100%;
}

.content-body {
    display: table-cell;
}


/* Aesthetics */

.container {
    width: 100%;
    height: 100%;
    color: black;
    height: 100vh;
    width: 100vw;
}

.header,
.footer {
    background: dodgerblue;
}

.content-body {
    overflow: hidden;
}
</style>

<style>
:root {
    --main-color: orange;
}
</style>