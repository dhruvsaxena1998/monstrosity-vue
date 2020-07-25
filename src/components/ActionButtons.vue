<template>
  <div class="container">
    <div class="spacer"></div>
    <div class="buttons">
      <div class="btn active" @click="attack">Attack</div>
      <div class="btn" @click="special" :class="{ active: canSpecial }">
        Special Attack
      </div>
      <div class="btn" @click="heal" :class="{ active: canHeal }">Heal</div>
      <div class="btn active" @click="giveup">Give UP</div>
    </div>
    <div class="spacer"></div>
  </div>
</template>
<script>
export default {
  props: ["attack", "special", "heal", "giveup", "canSpecial", "canHeal"]
};
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 15% auto 15%;
  @media (max-width: 768px) {
    grid-template-columns: 5% auto 5%;
  }
  @media (max-width: 555px) {
    grid-template-columns: 100%;
  }
}
.buttons {
  padding: 8rem 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #595f71;
  & .btn {
    cursor: pointer;
    margin: 10px;
    outline: #595f71;
    &.active {
      color: darken(#f0a5b0, 10%);
    }
  }
}
</style>
