<template>
  <div>
    <div class="input-area">
      <label for="player-name" />
      <input
        type="text"
        v-model="player_name"
        @input="isPlayerNameSet"
        @keyup.enter="startGame"
        id="player-name"
        placeholder="player name"
        autocomplete="off"
      />
      <button class="btn" @click="startGame" :class="{ active: isActive }">
        start
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Main",
  data: () => ({
    player_name: "",
    isActive: false
  }),
  methods: {
    ...mapActions(["change_game_status"]),
    isPlayerNameSet() {
      this.isActive = !!this.player_name.trim();
    },
    startGame() {
      if (this.player_name.trim()) this.change_game_status(this.player_name);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-area {
  text-align: center;
  & input {
    font-size: 1.6rem;
    border: 0;
    outline: none;
    padding: 1rem;
    color: darken(#f0a5b0, 10%);
    text-align: center;
    background: transparent;
  }
  & .btn {
    margin-top: 2rem;
    font-size: 1.6rem;
    color: #595f71;
    background: transparent;
    border: 0;
    transition: 0.3s;
    outline: none;
    &.active {
      color: #f0a5b0;
      transition: 0.5s;
    }
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }
}
</style>
