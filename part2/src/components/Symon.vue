<template>
  <section class="symon">
    <h1 class="symon__title title">Symon no Says</h1>
    <div class="symon__circle circle-game">
      <ul
        class="circle-game__controls"
        @click="onTouch"
      >
        <li>
          <button
            class="circle-game__control circle-game__control--1"
            type="button"
            :disabled="playing"
          >
            DO
          </button>
        </li>
        <li>
          <button
            class="circle-game__control circle-game__control--2"
            type="button"
            :disabled="playing"
          >
            FA
          </button>
        </li>
        <li>
          <button
            class="circle-game__control circle-game__control--3"
            type="button"
            :disabled="playing"
          >
            MI
          </button>
        </li>
        <li>
          <button
            class="circle-game__control circle-game__control--4"
            type="button"
            :disabled="playing"
          >
            RE
          </button>
        </li>
      </ul>
    </div>
    <div class="symon__info">
      <div class="symon__level">
        <h2 class="sub-title">Раунд: {{treck.length}}</h2>
      </div>
      <button
        class="btn"
        type="button"
        @click="onStart"
        :disabled="start"
      >START</button>

      <div class="symon__difficulty">
        <h2 class="sub-title">Выберете уровень сложности:</h2>
        <ul class="symon__options difficulty-otions">
          <li class="symon__option">
            <input
              class="input"
              type="radio"
              name="difficulty"
              id="symon-easy"
              value="easy"
              v-model="difficulty"
            >
            <label
              class="label"
              for="symon-easy"
            >Лёгкий</label>
          </li>
          <li class="symon__option">
            <input
              class="input"
              type="radio"
              name="difficulty"
              id="symon-normal"
              value="normal"
              v-model="difficulty"
            >
            <label
              class="label"
              for="symon-normal"
            >Нормальный</label>
          </li>
          <li class="symon__option">
            <input
              class="input"
              type="radio"
              name="difficulty"
              id="symon-hard"
              value="hard"
              v-model="difficulty"
            >
            <label
              class="label"
              for="symon-hard"
            >Сложный</label>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import noteDo from "@/assets/sound/do.mp3";
import noteFa from "@/assets/sound/fa.mp3";
import noteMi from "@/assets/sound/mi.mp3";
import noteRe from "@/assets/sound/re.mp3";

export default {
  name: "symon",
  components: {},
  data() {
    return {
      audio: {},
      start: false,
      playing: false,
      difficulty: "easy",
      treck: [],
      stepCounter: 0,
      durationRound: 2000,
    };
  },

  computed: {
    audioMap() {
      return Object.keys(this.audio).map((item) => item);
    },
    level() {
      return this.treck.length;
    },
    speed() {
      switch (this.difficulty) {
        case "easy":
          return 1500;
        case "normal":
          return 1000;
        case "hard":
          return 400;
        default:
          return 1500;
      }
    },
  },
  methods: {
    onStart() {
      if (!this.start) {
        this.start = true;
        this.addSound();
        this.play();
      }
    },
    getTouchName(item) {
      if (item.classList.contains("circle-game__control--1")) {
        return "do";
      } else if (item.classList.contains("circle-game__control--2")) {
        return "fa";
      } else if (item.classList.contains("circle-game__control--3")) {
        return "mi";
      } else if (item.classList.contains("circle-game__control--4")) {
        return "re";
      }
    },
    onTouch(e) {
      const item = e.target.closest(".circle-game__control");

      if (item) {
        const touchName = this.getTouchName(item);
        if (this.start && !this.playing) {
          this.playOne(touchName); //Можно писать await
          if (touchName !== this.treck[this.stepCounter]) {
            this.start = false;
            setTimeout(() => {
              this.gameOver();
            }, this.speed);
          } else if (this.treck.length === this.stepCounter + 1) {
            this.playing = true;
            setTimeout(() => {
              this.stepCounter = 0;
              this.addSound();
              this.play();
            }, this.durationRound);
          } else {
            this.stepCounter++;
          }
        } else if (!this.start) {
          this.playOne(touchName);
        }
      }
    },
    async playOne(name) {
      return new Promise((resolve) => {
        this.addActive(name);
        let audio = this.audio[name].cloneNode();
        audio.play();
        setTimeout(() => {
          this.removeActive(name);
          resolve();
        }, this.speed);
      });
    },

    async play() {
      this.playing = true;
      for (let [i, name] of this.treck.entries()) {
        await this.playOne(name);
        if (i === this.treck.length - 1) {
          setTimeout(() => {
            this.playing = false;
          }, this.speed);
        }
      }
    },
    addSound() {
      const indexSound = Math.floor(Math.random() * this.audioMap.length);
      const soundName = this.audioMap[indexSound];
      this.treck.push(soundName);
    },

    gameOver() {
      this.start = false;
      this.treck = [];
      this.stepCounter = 0;
      alert("Вы проиграли");
    },
    addActive(sound) {
      const add = (name) => {
        let control = document.querySelector(name);
        control?.classList.add("active");
      };
      if (sound == "do") {
        add(".circle-game__control--1");
      } else if (sound == "fa") {
        add(".circle-game__control--2");
      } else if (sound == "mi") {
        add(".circle-game__control--3");
      } else if (sound == "re") {
        add(".circle-game__control--4");
      }
    },
    removeActive(sound) {
      const remove = (name) =>
        document.querySelector(name)?.classList.remove("active");
      if (sound == "do") {
        remove(".circle-game__control--1");
      } else if (sound == "fa") {
        remove(".circle-game__control--2");
      } else if (sound == "mi") {
        remove(".circle-game__control--3");
      } else if (sound == "re") {
        remove(".circle-game__control--4");
      }
    },
  },
  mounted() {
    this.audio.do = new Audio(noteDo);
    this.audio.fa = new Audio(noteFa);
    this.audio.mi = new Audio(noteMi);
    this.audio.re = new Audio(noteRe);
  },
};
</script>

<style lang="sass">
.symon
  display: grid
  &__title
    grid-column: 1/3
  &__circle
    grid-column: 1/3
  &__info
    grid-column: 1/3
  @media (min-width:$tabletWidth + 'px')
    grid-template-columns: 70% 1fr
    &__title
      grid-column: 1/3
    &__circle
      grid-column: 1/2
    &__info
      grid-column: 2/3

  &__option
    display: flex
    align-items: center
    gap: 0 10px
    &:not(:last-child)
      margin-bottom: 5px

.circle-game
  align-self: start
  display: flex
  justify-content: center
  &__controls
    display: grid
    grid-template-columns: 50% 50%
    grid-template-rows: 50% 50%
    border-radius: 50%
    border: 1px black solid
    overflow: hidden

  &__control
    width: 110px
    height: 110px
    color: #fff
    transition: box-shadow 300ms ease-in-out, background 200ms ease
    @media (any-hover: hover)
      &:hover
        box-shadow: 0 0 10px 0 #3498db inset, 0 0 10px 4px #3498db
        &:disabled
          box-shadow: none
          cursor: default

    @media (min-width:$tabletWidth + 'px')
      width: 180px
      height: 180px

  &__control--1
    background-color: #ff4b4b
    &.active
      background-color: #FF0000
      box-shadow: 0 0 10px 0 #3498db inset, 0 0 10px 4px #3498db
  &__control--2
    background-color: #9539fc
    &.active
      background-color: #580EAD
      box-shadow: 0 0 10px 0 #3498db inset, 0 0 10px 4px #3498db

  &__control--3
    background-color: #eae165
    &.active
      background-color: #FFF140
      box-shadow: 0 0 10px 0 #3498db inset, 0 0 10px 4px #3498db

  &__control--4
    background-color: #6cdb6c
    &.active
      background-color: #39E639
      box-shadow: 0 0 10px 0 #3498db inset, 0 0 10px 4px #3498db
</style>
