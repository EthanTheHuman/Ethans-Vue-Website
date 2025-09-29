<script setup>
import data from './Frens/FrensGameData.json'
</script>

<template>
    <div class="container">
        <div class="left-column">
            <FrensColumn :friends="FrensList" :selectedFriends="selectedFriends" @toggleFriend="toggleFriend" />
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
            const shuffledList = this.GameList.sort(() => Math.random() - 0.5);
            const filtered = shuffledList.filter(game => {
                const friendsWhoOwn = this.selectedFriends.filter(friend =>
                    friend.Games.includes(game.ShortName)
                );
                let hasRequiredFriend = true;
                if (game.RequiredFrens && game.RequiredFrens?.length > 0) {
                    hasRequiredFriend = game.RequiredFrens.some(name => friendsWhoOwn.some(friend => friend.Name === name));
                }
                return friendsWhoOwn.length == this.selectedFriends.length
                    && friendsWhoOwn.length <= game.MaxPlayers
                    && friendsWhoOwn.length >= game.MinPlayers
                    && hasRequiredFriend
            });
            if (this.selectedFriends.length === 0) {
                return shuffledList;
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

/* Flexbox layout to make the two columns sit side by side */
.container {
    display: flex !important;
    flex-direction: row !important; /* Explicitly set to row layout */
    height: 100%; /* Use full height of parent container */
    width: 100%; /* Ensure full width */
    padding: 10px;
    gap: 20px; /* Space between columns */
    overflow: hidden; /* Prevent any overflow from this container */
    box-sizing: border-box;
}

/* Style for the left column */
.left-column {
    flex: 0 0 auto; /* Don't grow, don't shrink, size based on content */
    min-width: 250px; /* Minimum width for usability */
    max-width: 350px; /* Maximum width to prevent it from getting too wide */
    padding-right: 10px;
    overflow: visible; /* No scrolling in left column - it should fit its content */
    height: fit-content; /* Height based on content */
    max-height: 100%; /* Don't exceed container height */
}

/* Style for the right column */
.right-column {
    flex: 1; /* Take up remaining space */
    padding-left: 10px;
    border-left: 1px solid white;
    overflow-y: auto; /* Only this column should scroll */
    overflow-x: hidden; /* Prevent horizontal scrolling */
    height: calc(100% - 20px); /* Full height minus container padding */
    box-sizing: border-box;
}
</style>