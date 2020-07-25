<template>
  <div class="container">
    <div class="grid">
      <div class="player">
        {{ getPlayerName }}
        <div
          class="health-bar active"
          :style="{ width: `${player.health}%` }"
        />
        {{ player.health }}
      </div>
      <div class="monster">
        <span>Monster</span>
        <div
          class="health-bar active"
          :style="{ width: `${monster.health}%` }"
        />
        {{ monster.health }}
      </div>
    </div>
    <div class="fightAnim">Fight</div>
    <ActionButtons
      :attack="attack"
      :special="specialAttack"
      :canSpecial="makeSpecialAttackActive"
      :heal="heal"
      :canHeal="makeHealActive"
      :giveup="giveUp"
    />
  </div>
</template>

<script>
import ActionButtons from "./ActionButtons";
import { mapGetters, mapActions } from "vuex";
const PLAYER = "player";
const MONSTER = "monster";
export default {
  name: "play-area",
  components: {
    ActionButtons
  },
  computed: mapGetters(["getPlayerName"]),
  data: () => ({
    player: {
      health: 100,
      attackMin: 5,
      attackMax: 12,
      specialAttackMin: 12,
      specialAttackMax: 20,
      damageGiven: 0,
      damageTaken: 0
    },
    monster: {
      health: 100,
      attackMin: 9,
      attackMax: 15
    },
    makeSpecialAttackActive: false,
    makeHealActive: false
  }),
  methods: {
    ...mapActions(["end_game"]),
    calculateAttack(max, min) {
      return Math.floor(Math.random() * max) + min;
    },
    endGame(health, whoWon) {
      if (health <= 0) {
        this.end_game(whoWon);
        return true;
      }
      return false;
    },
    attack() {
      const attackDamage = this.calculateAttack(
        this.player.attackMax,
        this.player.attackMin
      );
      this.monster.health -= attackDamage;
      if (this.endGame(this.monster.health, PLAYER)) return 0;
      this.player.damageGiven += 1;
      if (this.player.damageGiven >= 3) this.makeSpecialAttackActive = true;

      const attackTaken = this.calculateAttack(
        this.monster.attackMax,
        this.player.attackMin
      );
      this.player.health -= attackTaken;
      if (this.endGame(this.player.health, MONSTER)) return 0;
      this.player.damageTaken += 1;
      if (this.player.damageTaken >= 2) this.makeHealActive = true;
    },
    specialAttack() {
      if (this.makeSpecialAttackActive) {
        const attackDamage = this.calculateAttack(
          this.player.specialAttackMax,
          this.player.specialAttackMin
        );
        this.monster.health -= attackDamage;
        if (this.endGame(this.monster.health, PLAYER)) return 0;

        const attackTaken = this.calculateAttack(7, 2);
        this.player.health -= attackTaken;
        if (this.endGame(this.player.health, MONSTER)) return 0;

        this.player.damageGiven = 0;
        this.player.damageTaken = 0;
        this.makeSpecialAttackActive = false;
        this.makeHealActive = false;
      }
    },
    heal() {
      if (this.makeHealActive) {
        const healAmount = this.calculateAttack(
          this.player.attackMax,
          this.player.attackMin
        );
        if (healAmount + this.player.health >= 100) this.player.health += 10;
        this.player.health += healAmount;

        this.player.damageTaken = 0;
        this.player.damageGiven = 0;

        const shouldTakeDamage = this.calculateAttack(10, 1);
        if (shouldTakeDamage < 3) {
          const calculateDamage = this.calculateAttack(7, 3);
          this.player.health -= calculateDamage;
          if (this.endGame(this.player.health, MONSTER)) return 0;
        }
        this.makeHealActive = false;
        this.makeSpecialAttackActive = false;
      }
    },
    giveUp() {
      this.end_game(-1, "surrender");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 2rem;
  font-size: 1.6rem;
  color: darken(#f0a5b0, 10%);
}
.grid {
  display: grid;
  grid-template-columns: 50% 50%;
  text-align: center;
  & .player,
  & .monster {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    & span {
      text-align: center;
    }
  }
  & .health-bar {
    width: 100%;
    height: 1rem;
    background: rgb(165, 165, 165);
    margin: 1rem 0;
    transition: linear 0.3s;
    &.active {
      background: rgb(255, 96, 96);
      animation: health-bar;
      animation-duration: 1s;
    }
  }
}
.fightAnim {
  width: 99%;
  color: darken(#f0a5b0, 10%);
  animation: fight;
  animation-duration: 1s;
}
@keyframes health-bar {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
@keyframes fight {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
