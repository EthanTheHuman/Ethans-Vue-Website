<script setup>
const icons = {
  LinkedIn: `M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z`,
  Itch: `M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.137 2.41 2.466 2.41h.024c1.33 0 2.466-1.102 2.466-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.435 2.41C22.78 8.43 24 7.282 24 5.98V4.95c-.02-.62-2.082-2.99-3.13-3.612-3.253-.114-5.508-.134-8.87-.133-3.362 0-7.945.053-8.87.133zm6.376 6.477a2.74 2.74 0 0 1-.468.602c-.5.49-1.19.795-1.947.795a2.786 2.786 0 0 1-1.95-.795c-.182-.178-.32-.37-.446-.59-.127.222-.303.412-.486.59a2.788 2.788 0 0 1-1.95.795c-.092 0-.187-.025-.264-.052-.107 1.113-.152 2.176-.168 2.95v.005l-.006 1.167c.02 2.334-.23 7.564 1.03 8.85 1.952.454 5.545.662 9.15.663 3.605 0 7.198-.21 9.15-.664 1.26-1.284 1.01-6.514 1.03-8.848l-.006-1.167v-.004c-.016-.775-.06-1.838-.168-2.95-.077.026-.172.052-.263.052a2.788 2.788 0 0 1-1.95-.795c-.184-.178-.36-.368-.486-.59-.127.22-.265.412-.447.59a2.786 2.786 0 0 1-1.95.794c-.76 0-1.446-.303-1.948-.793a2.74 2.74 0 0 1-.468-.602 2.738 2.738 0 0 1-.463.602 2.787 2.787 0 0 1-1.95.794h-.16a2.787 2.787 0 0 1-1.95-.793 2.738 2.738 0 0 1-.464-.602zm-2.004 2.59v.002c.795.002 1.5 0 2.373.953.687-.072 1.406-.108 2.125-.107.72 0 1.438.035 2.125.107.873-.953 1.578-.95 2.372-.953.376 0 1.876 0 2.92 2.934l1.123 4.028c.832 2.995-.266 3.068-1.636 3.07-2.03-.075-3.156-1.55-3.156-3.025-1.124.184-2.436.276-3.748.277-1.312 0-2.624-.093-3.748-.277 0 1.475-1.125 2.95-3.156 3.026-1.37-.004-2.468-.077-1.636-3.072l1.122-4.027c1.045-2.934 2.545-2.934 2.92-2.934zM12 12.714c-.002.002-2.14 1.964-2.523 2.662l1.4-.056v1.22c0 .056.56.033 1.123.007.562.026 1.124.05 1.124-.008v-1.22l1.4.055C14.138 14.677 12 12.713 12 12.713z`,
  Git: `M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187`
}
</script>

<template>
  <div class="pagebody">
    <img
      src="https://images.squarespace-cdn.com/content/v1/5d8979ba31fedf1660dce626/1614467353576-S3JXOXAHTB3NITJ9TI7V/image-asset.gif"
      class="firecutin">
    <div class="content">
      <h1>ETHAN.+</h1>
      <p>
        This is still a work in progress as we remake the entire website from scratch using Vue 3! Make sure to check back
        to see how the website is progressing.
      </p>
      <div class="mainMenuSelect">
        <h1>PERSONAL </h1>
        <a class="grayed-out">ABOUT ME</a>
        <a class="grayed-out">PROJECTS</a>
        <a class="grayed-out">ART GALLERY</a>
        <a class="grayed-out">BLOG</a>
        <h1>SOCIAL</h1>
        <a href="https://www.linkedin.com/in/ethan-hoppe/"><svg role="img" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <title>LinkedIn</title>
            <path :d="icons.LinkedIn" />
          </svg>LinkedIn</a>
        <a href="https://ethanthehuman.itch.io/"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>Itch</title>
            <path :d="icons.Itch" />
          </svg>ITCH.IO</a>
        <a href="https://github.com/EthanTheHuman"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>Git</title>
            <path :d="icons.Git" />
          </svg>GITHUB</a>
      </div>
      <h3>In the mean time, check out some of my games from itch.io</h3>
      <div class="itchLinks">
        <iframe frameborder="0"
          src="https://itch.io/embed/515223?bg_color=2f3c49&amp;fg_color=d7d7e5&amp;link_color=a559f9&amp;border_color=4c4b5c"
          max-width="552" width=100% max-height="167"><a href="https://netherpetal.itch.io/last-rites">Last Rites by
            Netherpetal, EthanTheHuman, AwkwardWhale, James Bennett</a></iframe><br />
        <iframe frameborder="0"
          src="https://itch.io/embed/1149820?linkback=true&amp;bg_color=EFB66F&amp;fg_color=68401f&amp;link_color=97F851&amp;border_color=875933"
          max-width="552" width=100% max-height="167"><a href="https://ethanthehuman.itch.io/rolling-stars">Rolling Stars
            by EthanTheHuman</a></iframe><br />
        <iframe frameborder="0" src="https://itch.io/embed/461325?linkback=true&amp;fg_color=000000&amp;link_color=999da9"
          max-width="552" width=100% max-height="167"><a href="https://ethanthehuman.itch.io/ricochet">Ricochet by
            EthanTheHuman, GenghisGhan</a></iframe><br />
      </div>
    </div>
  </div>
</template>

<style scoped>

* {
  box-sizing: border-box;
  color: white;
  margin: 0;
}

h1 {
  font-size: 3rem;
  margin-bottom: 0;
  color: var(--main-color);
}

svg {
  fill: currentColor;
  width: 1em;
  height: 1em;
  vertical-align: baseline;
  position: relative;
  top: 0.15em;
  left: 0.1em;
  margin-right: 0.5em;
}

.pagebody {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  height: 100%;
}

.grayed-out {
  color: gray;
  text-decoration: none;
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 0 2rem;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-text);
}

.mainMenuSelect {
  width: 100%;
  text-align: left;
  display: block;
  margin-right: auto;
  margin-top: 20px;
  padding-left: 1rem;
}

.itchLinks {
  justify-content: space-between;
  display: block;
  padding-left: 2rem;
  padding-right: 2rem;
}

.mainMenuSelect h1 {
  font-size: 1.4rem;
  margin-bottom: 0;
  color: var(--main-color);
  margin-left: -5px;
}

.mainMenuSelect a {
  display: block;
  width: 100%;
  margin-bottom: 0;
  padding-left: 1.4rem;
  font-size: 1.4rem;
}

.mainMenuSelect a:hover {
  background-color: rgb(255, 255, 255);
  font-size: 1.5rem;
  color: black;
  fill: black;
  padding-left: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.mainMenuSelect a:hover svg {
  background-color: rgb(255, 255, 255);
  font-size: 1.5rem;
  fill: black;
}

.firecutin {
  max-width: 300px;
  width: 100%;
  flex: 0 0 auto;
  background-color: whitesmoke;
  object-fit: cover;
  border-left: solid white 3px;
  border-right: solid white 3px;
  display: flex;
}
@media (min-width: 768px) {
  .mainMenuSelect::before {
    content: '';   /* This is necessary to make the pseudo-element render */
    display: block;
    position: absolute;
    top: 0;        /* Start from the top of the .content element */
    bottom: 0;     /* Stretch to the bottom of the .content element */
    left: 0;       /* Place it at the left side */
    width: 0.25rem;    /* Width of the line */
    background-color: var(--main-color);  /* Color of the line; change as needed */
  }

  .mainMenuSelect a::before {
    content: '';   /* This is necessary to make the pseudo-element render */
    display: block;
    position: absolute;
    top: 0;        /* Start from the top of the .content element */
    bottom: 0;     /* Stretch to the bottom of the .content element */
    left: 0;       /* Place it at the left side */
    width: 1rem;    /* Width of the line */
    background-color: var(--main-color);  /* Color of the line; change as needed */
  }
}

@media (max-width: 768px) {
  .pagebody {
    flex-direction: column;
    align-items: center;
    /* Center the children on the X-axis */
  }

  .firecutin {
    width: 100%;
    /* Adjust based on how large you want the image on mobile */
    height: 50px;
    max-width: none;
    margin: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: solid white 3px;
  }

  .content {
    width: 90%;
    /* Take up 90% of the screen width */
    text-align: center;
    padding: 1rem 0;
    /* Padding to the top and bottom, no horizontal padding */
  }

  .mainMenuSelect {
    text-align: left;
    padding: 0;
  }

  .itchLinks {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
