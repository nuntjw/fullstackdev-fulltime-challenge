<template>
  <div :class="{ coin: true, disabled }" @click="onClick">{{ value }}</div>
</template>

<script>
export default {
  name: "Coin",
  props: {
    value: String,
    onClick: Function,
    disabled: Boolean
  }
};
</script>

<style>
.coin {
  width: 45px;
  height: 45px;
  background-color: gray;
  border-radius: 45px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
}

.disabled {
  pointer-events: none;
  cursor: initial;
}
</style>
