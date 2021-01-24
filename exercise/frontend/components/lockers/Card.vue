<template>
  <b-card
    :title="title"
    tag="article"
    footer-tag="footer"
    class="mb-2 locker-card"
  >
    <b-card-text>
      {{ firstHour }} <br />
      {{ afterHour }}
    </b-card-text>
    <b-card-text class="reserved" v-if="isReserved()">
      <span>Reserved by {{ reservation.reservedBy }}</span>
      <br />
      <Countdown :expiredAt="reservation.expiredAt" />
    </b-card-text>
    <template #footer>
      <div class="custom-card-footer">
        <b-button
          :disabled="(pendingBy && true) || isReserved()"
          :variant="pendingBy || isReserved() ? 'light' : 'primary'"
          @click="onPending($event)"
          >Reserve
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
import moment from "moment";
import Countdown from "../Countdown";

export default {
  name: "LockerCard",
  components: {
    Countdown
  },
  props: {
    title: String,
    firstHourPrice: Number,
    afterHourPrice: Number,
    onPending: Function,
    reservation: Object,
    pendingBy: String
  },
  methods: {
    isReserved() {
      return this.reservation
        ? moment(this.reservation.expiredAt).isAfter(moment())
        : false;
    }
  },
  computed: {
    firstHour() {
      return `First hour: ${this.firstHourPrice} THB`;
    },
    afterHour() {
      return `After hour: ${this.afterHourPrice} THB`;
    },
    btnText() {
      if (this.pendingBy) {
        return "Pending";
      } else if (this.isReserved()) {
        return "Reserved";
      }
      return "Reserve";
    }
  }
};
</script>

<style>
.locker-card {
  max-width: 20rem;
}
.custom-card-footer {
  text-align: right;
}
.reserved {
  text-align: right;
}
</style>
