<template>
  <b-container>
    <div v-if="state === 'LOADING'">
      Loading
    </div>
    <div v-else-if="state === 'COMPLETED'">
      <b-row class="count-users">
        {{ usersCount }} user(s) watching with you!
      </b-row>
      <b-row
        v-for="(lockers, i) in [smallLockers, mediumLockers, largeLockers]"
        :key="`locker-list-${i + 1}`"
      >
        <b-col class="col-md-12">
          <LockerGroup :lockers="lockers" :onReserve="onReserve" />
        </b-col>
      </b-row>
    </div>
    <div v-else-if="state === 'ERROR'">
      Error
    </div>
  </b-container>
</template>

<script>
import LockerGroup from "./Group";
import { getClient } from "../../plugins/socketIO";
import { filterBySize } from "../../plugins/lockerHelper";

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
    onReserve: locker => e => {
      e.preventDefault();
      console.log("reserve", locker);
      // const payload = {
      //   lockerId: locker._id,
      //   reservedBy: name,
      //   reserveHours: reserveHours
      // };
      // socket.emit("reserve", payload);
    },
  },
  async fetch() {
    this.state = "LOADING";

    const io = getClient();

    io.on("users", ({ count }) => {
      this.usersCount = count;
    });

    io.on("lockers", ({ data }) => {
      this.smallLockers.list = filterBySize("SMALL", data);
      this.mediumLockers.list = filterBySize("MEDIUM", data);
      this.largeLockers.list = filterBySize("LARGE", data);
      this.state = "COMPLETED";

      console.log(this.smallLockers, this.mediumLockers, this.largeLockers);
    });
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
