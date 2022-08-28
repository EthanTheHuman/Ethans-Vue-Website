
<script setup>
import { reactive } from 'vue'
import Archetypes from "./Multiverse/Archetypes.json"
const ArchetypeList = [
    "Blaster",
    "Bruiser",
    "Genius",
    "Polymath",
    "Protector",
    "Striker"
]
const data = reactive({
    Archetype: "Blaster",
    Rank: 1,
    ArchetypeInfo: Archetypes["Blaster"],
    RankInfo: Archetypes["Blaster"].Ranks[1]
})

var GetData = function () {
    data.Rank = Math.min(Math.max(data.Rank, 1), 25);
    data.ArchetypeInfo = Archetypes[data.Archetype || "Blaster"];
    data.RankInfo = data.ArchetypeInfo?.Ranks[data.Rank] || Archetypes["Blaster"].Ranks[0];
}
</script>

<template>
  <div class="scrolling-image-container">
      <div class="scrolling-image"></div>
  </div>
  <div class="archetype-info infobox">
    <h1>{{ data.Biography?.Name || "YourName" }}</h1>
  </div>
  <div class="row">
    <div class="infobox" style="width: 33%;">
      <h1>RANK</h1>
      <div class="row">
        <div v-on:click="data.Rank--; GetData();">-</div>
        <h1>{{ data.Rank }}</h1>
        <div v-on:click="data.Rank++; GetData();">+</div>
      </div>
    </div>
    <div class="infobox" style="width: 66%;">
      <h1>{{ data.Archetype }}</h1>
    </div>
  </div>
  <div class="archetype-info infobox">
    <h2>Archetype</h2>
    <select v-model="data.Archetype" @change="GetData()">
        <option disabled value="---">Please select your archetype</option>
        <option v-for="Archetype in ArchetypeList">{{ Archetype }}</option>
    </select>
    <div>{{ data.ArchetypeInfo?.Name }}</div>
    <div>Description: {{ data.ArchetypeInfo.Description }}</div>
    <div>Examples: {{ data.ArchetypeInfo.Examples.join(', ') }} Proficiencies: {{ data.ArchetypeInfo.RaisedCaps.join(', ') }}</div>
  </div>
  <div class="Biography infobox">
    <h2>Biography</h2>
    <div>Real Name: </div><input v-model="RealName" placeholder="John Lastname" />
    <div>Gender: </div><input v-model="RealName" placeholder="Male" />
    <div>Height: </div><input v-model="RealName" placeholder="Male" />
    <div>Weight: </div><input v-model="RealName" placeholder="Male" />
    <div>Eyes: </div><input v-model="RealName" placeholder="Male" />
    <div>Skin: </div><input v-model="RealName" placeholder="Male" />
    <div>Hair: </div><input v-model="RealName" placeholder="Male" />
    <div>Distinguishing Features: </div><textarea v-model="Bio" placeholder="Tell us about your character" />
    <div>Occupation: </div><input v-model="RealName" placeholder="Male" />
    <div>Teams: </div><input v-model="RealName" placeholder="Male" />
    <div>Base: </div><input v-model="RealName" placeholder="Male" />
    <div>History: </div><textarea v-model="Bio" placeholder="Tell us about your character" />
    <div>Personality: </div><textarea v-model="Bio" placeholder="Tell us about your character" />
    <div>Backstory</div>
    <ul>
      <li></li>
    </ul>
    <div>Traits</div>
    <ul>
      <li></li>
    </ul>
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
  width: 100%;
  text-align: center;
  background: rgb(166,0,0);
  background: linear-gradient(0deg, rgba(166,0,0,0.8001794467787114) 0%, rgba(255,0,0,0.8982186624649859) 50%, rgba(255,96,96,1) 100%);
  border: 1px solid white;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  height: 100%;
}
.scrolling-image {
  background: url("https://freedesignfile.com/upload/2015/04/Hexagon-layered-seamless-pattern-vector-material-03.jpg") repeat;
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
