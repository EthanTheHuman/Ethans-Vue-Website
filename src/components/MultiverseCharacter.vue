
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
const data = reactive({
    Archetype: "Blaster",
    Rank: 1,
    ArchetypeInfo: Archetypes["Blaster"],
    RankInfo: Archetypes["Blaster"].Ranks[1]
})

var GetData = function () {
    data.ArchetypeInfo = Archetypes[data.Archetype || "Blaster"];
    data.RankInfo = data.ArchetypeInfo?.Ranks[data.Rank];
}
</script>

<template>
    <div class="scrolling-image-container">
        <div class="scrolling-image"></div>
    </div>
  <div class="archetype-info infobox">
    <h2>Archetype</h2>
    <select v-model="data.Archetype" @change="GetData()">
        <option disabled value="---">Please select your archetype</option>
        <option v-for="Archetype in ArchetypeList">{{ Archetype }}</option>
    </select>
    <div>{{ data.ArchetypeInfo.Name }}</div>
    <div>Description: {{ data.ArchetypeInfo.Description }}</div>
    <div>Examples: {{ data.ArchetypeInfo.Examples.join(', ') }} Proficiencies: {{ data.ArchetypeInfo.RaisedCaps.join(', ') }}</div>
  </div>
  <div class="Biography infobox">
    <h2>Bio</h2>
    <div>Real Name: </div><input v-model="RealName" placeholder="John Lastname" />
    <div>Height: Weight: Gender:</div>
    <div>Eyes: Skin: Hair:</div>
    <div>Distinguishing Features</div>
    <div>Bio: </div><textarea v-model="Bio" placeholder="Tell us about your character" />
    <div>Rank: {{ Rank }}</div>
    <div>Attack: {{ data.RankInfo.MinFightDamage }}-{{ data.RankInfo.MaxFightDamage }}</div>
  </div>
  <div class="infobox">
    <h2>Rank</h2>
    <div>{{ data.Rank }}</div>
    <div>Might: {{data.RankInfo.Might}} {{data.RankInfo.MightDef}}</div>
    <div>Fight Damage: {{ data.RankInfo.MinFightDamage }}-{{ data.RankInfo.MaxFightDamage }}</div>
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

.archetype-info {
  margin: 0px;
  text-align: center;
  background-color: red;
  border: 1px solid white;
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
  width: 100%;
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
