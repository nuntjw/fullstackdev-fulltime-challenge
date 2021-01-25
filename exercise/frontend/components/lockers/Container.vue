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
    <ReserveModal
      :modalVisible="pendingLocker !== null"
      :onCloseModal="onCloseModal"
      :pendingLocker="pendingLocker"
      :onReserve="onReserve"
    />
  </b-container>
</template>

<script>
import LockerGroup from "./Group";
import { getClient } from "../../plugins/socketIO";
import { filterBySize } from "../../plugins/lockerHelper";
import { STATE } from "../../constants/common";
import { SIZE } from "../../constants/locker";
import { EVENT } from "../../constants/socket";
import ReserveModal from "./ReserveModal";

export default {
  name: "LockersContainer",
  components: {
    LockerGroup,
    ReserveModal
  },
  data() {
    return {
      smallLockers: { name: "Small", list: [] },
      mediumLockers: { name: "Medium", list: [] },
      largeLockers: { name: "Large", list: [] },
      state: "IDLE",
      usersCount: 0,
      pendingLocker: null
    };
  },
  methods: {
    onPending(locker) {
      const onToggleModal = () => {
        this.pendingLocker = locker;
      };
      return function(e) {
        e.preventDefault();
        const io = getClient();
        io.emit(EVENT.PENDING, {
          lockerId: locker._id
        });
        onToggleModal();
      };
    },
    onCloseModal(e) {
      e.preventDefault();
      const io = getClient();
      io.emit(EVENT.CANCEL_PENDING, {
        lockerId: this.pendingLocker._id
      });
      this.pendingLocker = null;
    },
    onReserve(name, hours, money) {
      const io = getClient();
      const payload = {
        lockerId: this.pendingLocker._id,
        reservedBy: name,
        reserveHours: hours,
        money,
      };
      console.log(payload)
      io.emit(EVENT.RESERVE, payload);
      this.pendingLocker = null;
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
