<template>
  <div id="app">
    <div class="title">monstrosity</div>
    <template v-if="!isGameEnded">
      <template v-if="!isGameRunning">
        <Main />
      </template>
      <template v-else>
        <PlayArea />
      </template>
    </template>
    <template v-else>
      <EndGameScreen />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Main from "./components/Main";
import PlayArea from "./components/PlayArea";
import EndGameScreen from "./components/EndGameScreen";
export default {
  name: "App",
  components: {
    Main,
    PlayArea,
    EndGameScreen
  },
  computed: mapGetters(["isGameRunning","isGameEnded"]),
  methods: {
    ...mapActions(["change_game_status"]),
    stop() {
      this.change_game_status();
    }
  }
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
#app {
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  min-height: 100vh;
  max-height: 100%;
  background: #233f87;
  color: #f0a5b0;
  text-align: center;
  font-family: "Bebas Neue", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.title {
  font-size: 5rem;
  padding: 2rem 0;
}
</style>
