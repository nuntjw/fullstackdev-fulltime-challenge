<template>
  <b-card :title="title" tag="article" class="mb-2 locker-card">
    <b-card-text>
      {{ firstHour }} <br />
      {{ afterHour }}
    </b-card-text>

    <b-button
      :disabled="isReserved()"
      variant="primary"
      @click="onReserve($event)"
      >Reserve</b-button
    >
  </b-card>
</template>

<script>
import moment from "moment";

export default {
  name: "LockerCard",
  props: {
    id: String,
    title: String,
    firstHourPrice: Number,
    afterHourPrice: Number,
    onReserve: Function,
    reservation: Object
  },
  methods: {
    isReserved: () =>
      this.reservation
        ? moment(this.reservation.expiredAt).isAfter(moment())
        : false
  },
  computed: {
    firstHour() {
      return `First hour: ${this.firstHourPrice} THB`;
    },
    afterHour() {
      return `After hour: ${this.afterHourPrice} THB`;
    }
  }
};
</script>

<style>
.locker-card {
  max-width: 20rem;
}
</style>
