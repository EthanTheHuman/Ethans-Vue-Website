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
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

li {
    float: left;
}

li a{
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover {
    background-color: black;
}

.navbar {
    width: 100%;
    margin-left: -8px;
    margin-right: -8px;
    margin-top: -8px;
    margin-bottom: 0px;
    padding: 0;
    background-color: green;
    border: 0px 0px 1px 0px solid white;
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
