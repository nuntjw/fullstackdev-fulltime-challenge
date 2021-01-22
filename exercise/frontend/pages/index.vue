<template>
  <div>
    <b-row class="header">
      <b-col class="col-md-12">
        <h1>Coin Lockers</h1>
      </b-col>
    </b-row>
    <LockersContainer />
  </div>
</template>

<script>
import LockersContainer from "../components/lockers/Container";

export default {
  name: "index",
  components: {
    LockersContainer
  }
};
</script>
