<template>
  <div class="container">
    <div v-if="whoWon=='surrender'">
      Did monster beat you so hard that you had to surrender? lets beat them up this time for good
    </div>
    <div v-else-if="whoWon==='player'">
      <div class="player">
        Our lord {{ getPlayerName }} have defeated the monster.
      </div>
    </div>
    <div v-else>
      you lost. facing badluck? Try again
    </div>
    <button @click="restartGame">Start Again</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EndGameScreen",
  computed: mapGetters(["whoWon","getPlayerName"]),
  methods: {
    ...mapActions(["restart_game"]),
    restartGame() {
      this.restart_game();
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 6rem;
    font-size: 1.6rem;
    color: darken(#f0a5b0,20%);
    padding: 1.6rem;
    & button {
      border: 0;
      background: transparent;
      cursor: pointer;
      margin-top: 2rem;
      color: #f0a5b0;
      outline: none;
      transition: .3s;
      &:hover{
        transform: scale(1.2);
      }
    }
    & .player {
      color: #4fc39e;
    }
  }
</style>
