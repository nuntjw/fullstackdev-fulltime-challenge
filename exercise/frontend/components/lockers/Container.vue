<template>
  <b-container>
    <div v-if="state === STATE.LOADING">
      Loading
    </div>
    <div v-else-if="state === STATE.COMPLETED">
      <b-row class="count-users">
        {{ countingUsers }}
      </b-row>
      <b-row
        v-for="(lockers, i) in [smallLockers, mediumLockers, largeLockers]"
        :key="`locker-list-${i + 1}`"
      >
        <b-col class="col-md-12">
          <LockerGroup :lockers="lockers" :onPending="onPending" />
        </b-col>
      </b-row>
    </div>
    <div v-else-if="state === STATE.ERROR">
      Error
    </div>
  </b-container>
</template>

<script>
import LockerGroup from "./Group";
import { getClient } from "../../plugins/socketIO";
import { filterBySize } from "../../plugins/lockerHelper";
import { STATE } from "../../constants/common";
import { SIZE } from "../../constants/locker";
import { EVENT } from "../../constants/socket";

export default {
  name: "LockersContainer",
  components: {
    LockerGroup
  },
  data() {
    return {
      smallLockers: { name: "Small", list: [] },
      mediumLockers: { name: "Medium", list: [] },
      largeLockers: { name: "Large", list: [] },
      state: "IDLE",
      usersCount: 0
    };
  },
  methods: {
    onPending: locker => e => {
      e.preventDefault();
      const io = getClient();
      return io.emit(EVENT.PENDING, {
        lockerId: locker._id,
        pendingBy: "nuntjw"
      });
    },
    onReserve: locker => e => {
      e.preventDefault();
      const io = getClient();
      const payload = {
        lockerId: locker._id,
        reservedBy: "nunt",
        reserveHours: 3
      };
      io.emit(EVENT.RESERVE, payload);
    }
  },
  computed: {
    countingUsers() {
      return `${this.usersCount - 1} user(s) watching with you!`;
    }
  },
  async fetch() {
    this.state = STATE.LOADING;

    const io = getClient();

    io.on(EVENT.USERS, ({ count }) => {
      this.usersCount = count;
    });

    io.on(EVENT.LOCKERS, ({ data }) => {
      this.smallLockers.list = filterBySize(SIZE.S, data);
      this.mediumLockers.list = filterBySize(SIZE.M, data);
      this.largeLockers.list = filterBySize(SIZE.L, data);
      this.state = STATE.COMPLETED;
    });

    io.on(EVENT.ERROR, error => {
      console.log(error);
    });
  },
  created() {
    this.STATE = STATE;
  }
};
</script>

<style>
.header {
  margin: 10px;
}

.count-users {
  justify-content: flex-end;
}
</style>
