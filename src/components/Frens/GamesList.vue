<template>
    <div>
        <h3>Available Games</h3>
        <div v-if="games.length > 0">
            <div v-for="game in games" :key="game.Name" class="game-card">
                <img :src="game.Poster" :alt="game.Name" />
                <h4>{{ game.Name }}</h4>
                <p>Min Players: {{ game.MinPlayers }}</p>
                <p>Max Players: {{ game.MaxPlayers }}</p>
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

<style>
.game-card {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
}
.game-card img {
    width: auto;
    height: 100%;
}
</style>