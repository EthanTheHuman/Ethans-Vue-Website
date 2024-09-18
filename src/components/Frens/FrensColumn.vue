<template>
    <div>
      <h3>Friends List</h3>
      <div v-for="friend in friends" :key="friend.Name">
        <!-- Add :class to conditionally apply classes based on friend being selected -->
        <button 
          @click="toggle(friend)" 
          :class="{'selected': isSelected(friend), 'unselected': !isSelected(friend)}"
        >
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
      },
      isSelected(friend) {
        // This function checks if the friend is in the selectedFriends array in the parent
        return this.$parent.selectedFriends.includes(friend);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Default (unselected) button style */
  button {
    background-color: grey;
    color: white;
    border: none;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Add transition for smooth visual change */
  }
  
  /* Selected button style */
  button.selected {
    background-color: var(--main-color);
    color: white;
    border: 2px solid white; /* Adding a border */
    transform: scale(1.1); /* Slightly enlarge when selected */
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
  }
  
  /* Unselected button style */
  button.unselected {
    background-color: grey;
    color: white;
  }
  
  button:hover {
    background-color: darkgrey; /* Optional: a hover effect for both states */
  }
  </style>
