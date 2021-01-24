<template>
  <span>{{ countdownText }}</span>
</template>

<script>
import moment from "moment";

export default {
  name: "Countdown",
  props: {
    expiredAt: String
  },
  methods: {
    getDuration() {
      const now = moment();
      const diff = moment(this.expiredAt).diff(now);
      return moment.duration(diff);
    },
    startTimer() {
      this.timer = this.getDuration();
      this.intervalId = setInterval(() => {
        this.timer = this.getDuration();
      }, 1000);
    }
  },
  watch: {
    expiredAt(newVal, oldVal) {
      if (this.intervalId) clearInterval(this.intervalId);
      this.startTimer();
    }
  },
  computed: {
    countdownText() {
      if (!this.timer) return null;
      const [hours, minutes, seconds] = [
        this.timer.hours(),
        this.timer.minutes(),
        this.timer.seconds()
      ];
      return `
        available in ${hours}:${minutes}:${seconds}
      `;
    }
  },
  data() {
    return {
      timer: null,
      intervalId: null
    };
  },
  created() {
    this.startTimer();
  }
};
</script>
