<template>
  <div class="group">
    <h4>{{ lockers.name }}</h4>
    <b-card-group deck>
      <LockerCard
        v-for="locker in lockers.list"
        :key="locker._id"
        :id="locker._id"
        :title="locker.name"
        :firstHourPrice="locker.price.firstHour"
        :afterHourPrice="locker.price.afterHour"
        :onReserve="onReserve(locker)"
        :reservation="locker.reservation"
      />
    </b-card-group>
  </div>
</template>

<script>
import LockerCard from "./Card";

export default {
  name: "LockerGroup",
  components: {
    LockerCard
  },
  props: {
    lockers: {
      name: String,
      list: Array
    },
    onReserve: Function
  }
};
</script>

<style>
.group {
  margin-bottom: 10px;
}
</style>
