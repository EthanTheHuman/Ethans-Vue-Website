
<script setup>
import { reactive } from 'vue'
const ArchetypeList = [
    "Blaster",
    "Bruiser",
    "Genius",
    "Polymath",
    "Protector",
    "Striker"
]
import Archetypes from "./Multiverse/Archetypes.json"
const Archetype = reactive("Blaster")
const Rank = reactive(1);
const ArchetypeInfo = reactive(Archetypes[Archetype || "Blaster"])
const RankInfo = reactive(ArchetypeInfo?.Ranks[Rank])

var GetData = function () {
    console.log("Getting Data for Archetype " + Archetype + " Rank " + Rank);
    ArchetypeInfo = Archetypes[Archetype || "Blaster"];
    RankInfo = ArchetypeInfo?.Ranks[Rank];
}
</script>

<template>
    <div class="scrolling-image-container">
        <div class="scrolling-image"></div>
    </div>
  <div class="Biography infobox">
    <h2>Bio</h2>
    <div>Real Name: </div><input v-model="RealName" placeholder="John Lastname" />
    <div>Height: Weight: Gender:</div>
    <div>Eyes: Skin: Hair:</div>
    <div>Distinguishing Features</div>
    <div>Bio: </div><textarea v-model="Bio" placeholder="Tell us about your character" />
    <div>Rank: {{ Rank }}</div>
    <div>Attack: {{ RankInfo.MinFightDamage }}-{{ RankInfo.MaxFightDamage }}</div>
  </div>
  <div class="infobox">
    <h2>Archetype</h2>
    <select v-model="Archetype" @change="GetData()">
        <option disabled value="---">Please select your archetype</option>
        <option v-for="Archetype in ArchetypeList">{{ Archetype }}</option>
    </select>
    <div>{{ ArchetypeInfo.Name }}</div>
    <div>Description: {{ ArchetypeInfo.Description }}</div>
    <div>Examples: {{ ArchetypeInfo.Examples.join(', ') }}</div>
    <div>Proficiencies: {{ ArchetypeInfo.RaisedCaps.join(', ') }}</div>
  </div>
  <div class="infobox">
    <h2>Rank</h2>
    <div>{{ Rank }}</div>
    <div>Might: {{RankInfo.Might}} {{RankInfo.MightDef}}</div>
    <div>Fight Damage: {{ RankInfo.MinFightDamage }}-{{ RankInfo.MaxFightDamage }}</div>
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

.infobox {
    color: white;
    background-color: rgba(255, 0, 0, 0.204);
    border-radius: 25px;
    border: 1px solid red;
    margin: 10px;
    width: fit-content;
    padding: 10px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
.scrolling-image-container {
  overflow: hidden;
  position: absolute;
  top: 0; 
  left: 0;
  z-index: -100;
}
.scrolling-image {
  background: url("https://freedesignfile.com/upload/2015/04/Hexagon-layered-seamless-pattern-vector-material-03.jpg") repeat-x;
  height: 396px;
  width: 4010px;
  animation: slide 3s linear infinite;
}
@keyframes slide {
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(-401px); /* The image width */
  }
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
