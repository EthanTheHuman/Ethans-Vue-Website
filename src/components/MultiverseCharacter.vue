<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="Biography">
    <div>Real Name: </div><input v-model="RealName" placeholder="John Lastname" />
    <div>Height: Weight: Gender:</div>
    <div>Eyes: Skin: Hair:</div>
    <div>Distinguishing Features</div>
    <div>Bio: </div><textarea v-model="Bio" placeholder="Tell us about your character" />
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
