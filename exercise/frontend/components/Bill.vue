<template>
  <div
    :class="{ bill: true, disabled }"
    :style="{ backgroundColor: getColor() }"
    @click="onClick"
  >
    {{ value }}
  </div>
</template>

<script>
export default {
  name: "Bill",
  props: {
    value: String,
    onClick: Function,
    disabled: Boolean
  },
  methods: {
    getColor() {
      switch (this.value) {
        case "20":
          return "green";
        case "50":
          return "blue";
        case "100":
          return "red";
        case "500":
          return "purple";
        case "1000":
          return "gray";
        default:
          return null;
      }
    }
  }
};
</script>

<style>
.bill {
  width: 65px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.disabled {
  pointer-events: none;
  cursor: initial;
}
</style>
