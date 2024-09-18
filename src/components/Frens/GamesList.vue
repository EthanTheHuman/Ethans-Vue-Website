<template>
    <div>
        <h3>Available Games</h3>
        <div v-if="games.length > 0">
            <div v-for="game in games" :key="game.Name" class="game-card">
                <div class="game-poster">
                    <img :src="game.Poster" :alt="game.Name" />
                </div>
                <div class="game-info">
                    <h4>{{ game.Name }}</h4>
                    <p>Min Players: {{ game.MinPlayers }}</p>
                    <p>Max Players: {{ game.MaxPlayers }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No games available for the selected friends.</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['games']
};
</script>

<style scoped>
.game-card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #222;
    /* You can adjust this based on your theme */
    color: white;
    /* For text on dark background */
}

/* Style for the game poster (image) */
.game-poster img {
    width: 100%;
    /* Adjust width as needed */
    height: 100%;
    object-fit: contain;
    max-height: 200px;
    margin-right: 15px;
    /* Add space between the image and the text */
    border-radius: 5px;
}

/* Style for the game info text */
.game-info h4 {
    margin: 0;
    font-size: 1.2rem;
}

.game-info p {
    margin: 5px 0;
}
</style>