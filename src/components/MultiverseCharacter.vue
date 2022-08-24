<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
import Archetypes from "./Multiverse/Archetypes.json"
var Rank = 1
var Archetype = "Blaster"
var ArchetypeInfo = Archetypes[Archetype || "Blaster"]
var RankInfo = ArchetypeInfo?.Ranks[Rank]
</script>

<template>
    <div class="scrolling-image-container">
        <div class="scrolling-image"></div>
    </div>
  <div class="Biography">
    <div>Real Name: </div><input v-model="RealName" placeholder="John Lastname" />
    <div>Height: Weight: Gender:</div>
    <div>Eyes: Skin: Hair:</div>
    <div>Distinguishing Features</div>
    <div>Bio: </div><textarea v-model="Bio" placeholder="Tell us about your character" />
    <div>Rank: {{ Rank }}</div>
    <div>Attack: {{ RankInfo.MinFightDamage }}-{{ RankInfo.MaxFightDamage }}</div>
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
.scrolling-image-container {
  overflow: hidden;
}
.scrolling-image {
  background: url("https://freedesignfile.com/upload/2015/04/Hexagon-layered-seamless-pattern-vector-material-03.jpg") repeat-x;
  height: 396px;
  width: 1604px;
  animation: slide 3s linear infinite;
}
@keyframes slide {
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(-1604px); /* The image width */
  }
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
