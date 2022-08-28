
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
    <div class="infobox centered" style="width: 33%;">
      <h1>RANK</h1>
      <div class="row">
        <div v-on:click="data.Rank--; GetData();">-</div>
        <h1><input type="number" min="1" max="25" v-model="data.Rank" placeholder="1" @change="GetData()"/></h1>
        <div v-on:click="data.Rank++; GetData();">+</div>
      </div>
    </div>
    <div class="infobox" style="width: 66%;">
      <h1>
        <select v-model="data.Archetype" @change="GetData()">
          <option disabled value="---">Please select your archetype</option>
          <option v-for="Archetype in ArchetypeList">{{ Archetype }}</option>
        </select>
      </h1>
    </div>
  </div>
  <div class="archetype-info infobox">
    <h2>Archetype</h2>
    <div>{{ data.ArchetypeInfo?.Name }}</div>
    <div>Description: {{ data.ArchetypeInfo.Description }}</div>
    <div>Examples: {{ data.ArchetypeInfo.Examples.join(', ') }} Proficiencies: {{ data.ArchetypeInfo.RaisedCaps.join(', ') }}</div>
  </div>
  <div class="row">
    <div class="infobox" style="text-align: center;">
    <h2>ABILITIES</h2>
      <table>
        <tr>
          <th>Total Score</th>
          <th>Modifier</th>
          <th>Score</th>
          <th>Defense</th>
          <th>Total Defense</th>
        </tr>
        <tr>
          <td></td>
          <td>{{ data.RankInfo.Might }}</td>
          <td>MIGHT</td>
          <td>{{ data.RankInfo.MightDef }}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>{{ data.RankInfo.Agility }}</td>
          <td>AGILITY</td>
          <td>{{ data.RankInfo.AgilityDef }}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>{{ data.RankInfo.Resilience }}</td>
          <td>RESILIENCE</td>
          <td>{{ data.RankInfo.ResilienceDef }}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>{{ data.RankInfo.Vigilance }}</td>
          <td>VIGILANCE</td>
          <td>{{ data.RankInfo.VigilanceDef }}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>{{ data.RankInfo.Ego }}</td>
          <td>EGO</td>
          <td>{{ data.RankInfo.EgoDef }}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>{{ data.RankInfo.Logic }}</td>
          <td>LOGIC</td>
          <td>{{ data.RankInfo.LogicDef }}</td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="infobox">
      <h2>STATS</h2>
      <div>Fight Damage: {{ data.RankInfo.MinFightDamage }}-{{ data.RankInfo.MaxFightDamage }}</div>
      <div>Ranged Damage: {{ data.RankInfo.MinRangedDamage }}-{{ data.RankInfo.MaxRangedDamage }}</div>
      <div>Health: {{ data.RankInfo.Health }}/{{ data.RankInfo.Health }}</div>
      <div>Focus: {{ data.RankInfo.Focus }}/{{ data.RankInfo.Focus }}</div>
    </div>
  </div>
  <div class="Biography infobox">
    <h2>Biography</h2>
    <div>Real Name: </div><input v-model="RealName" placeholder="John Lastname" />
    <div>Gender: </div><input v-model="RealName" placeholder="Male" />
    <div>Height: </div><input v-model="RealName" placeholder="6'0" />
    <div>Weight: </div><input v-model="RealName" placeholder="205 lbs." />
    <div>Eyes: </div><input v-model="RealName" placeholder="Brown" />
    <div>Skin: </div><input v-model="RealName" placeholder="White" />
    <div>Hair: </div><input v-model="RealName" placeholder="Brown" />
    <div>Distinguishing Features: </div><textarea v-model="Bio" placeholder="What makes your character stand out?" />
    <div>Occupation: </div><input v-model="RealName" placeholder="Adventurer" />
    <div>Teams: </div><input v-model="RealName" placeholder="Avengers probably" />
    <div>Base: </div><input v-model="RealName" placeholder="Mobile" />
    <div>History: </div><textarea v-model="Bio" placeholder="Tell us about your character's backstory" />
    <div>Personality: </div><textarea v-model="Bio" placeholder="Tell us about your character's personality" />
    <div>Backstory</div>
    <ul>
      <li></li>
    </ul>
    <div>Traits</div>
    <ul>
      <li></li>
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

td {
  border: 2px solid black;
  padding: 2px;
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
  text-align: center;background: rgb(255,0,0);
  background: linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(255,0,0,0.1) 100%);
  border: 2px solid red;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.centered {
  align-items: center;
  text-align: center;
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
