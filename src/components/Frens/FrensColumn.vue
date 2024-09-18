<template>
    <div>
      <h3>Friends List</h3>
      <div v-for="friend in friends" :key="friend.Name">
        <button @click="toggle(friend)">
          {{ friend.Name }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['friends'],
    methods: {
      toggle(friend) {
        this.$emit('toggleFriend', friend);
      }
    }
  };
  </script>
  