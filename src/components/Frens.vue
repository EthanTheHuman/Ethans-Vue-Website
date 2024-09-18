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

/* Flexbox layout to make the two columns sit side by side */
.container {
    display: flex  !important;
    justify-content: space-between;
    /* Ensure space between columns */
    padding: 10px;
}

/* Style for the left column */
.left-column {
    flex: 1;
    /* This means the left column will take up 1/3 of the available space */
    padding-right: 10px;
    border-right: 1px solid white;
}

/* Style for the right column */
.right-column {
    flex: 3;
    /* This means the right column will take up 2/3 of the available space */
    padding-left: 10px;
    overflow-y: auto;
    max-height: 100%;
}

/* Optional: Customize the background or borders to see the layout better */
.left-column,
.right-column {
}
</style>