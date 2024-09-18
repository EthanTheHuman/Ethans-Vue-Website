<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="navbar">
    <ul>
      <li><a href="#/">Home</a></li>
      <li><a href="#/multiverse">Multiverse Character Creator</a></li>
      <li class="spacer" style="flex-grow: 1;"></li>
      <!-- This spacer will grow and push the following items to the right -->
      <!-- <li><a href="#/frens">Frens Selector Sample</a></li> hidden -->
      <li><a href="#/">Ethan.+</a></li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

ul {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  border-radius: 25px;
}

li a:hover {
  background-color: black;
  border-radius: 25px;
}

.navbar {
  width: 100%;
  background-color: #404040;
  border-bottom: solid 3px white;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
