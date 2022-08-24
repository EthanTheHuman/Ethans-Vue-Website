<script setup>
import { ref, computed } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/NavBar.vue'
import TheWelcome from './components/TheWelcome.vue'
import MultiverseCharacter from './components/MultiverseCharacter.vue'

const routes = {
  '/': TheWelcome,
  '/multiverse': MultiverseCharacter
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <header>
    <Navbar/>
  </header>

  <main>
    <a href="#/">Home</a>&nbsp;
    <a href="#/multiverse">Multiverse character maker</a> 
    <component :is="currentView" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: block;
    width: 100%;
    margin: 0px;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
