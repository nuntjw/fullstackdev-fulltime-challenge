<template>
  <div>
    <b-row style="margin: 10px;">
      <b-col class="col-md-12">
        <h1>Coin Lockers</h1>
      </b-col>
    </b-row>
    <b-container>
      <b-row>
        <b-col class="col-md-12">
          <h4>Small</h4>
          <b-card-group deck>
            <b-card
              v-for="item in list"
              :key="item.id"
              title="Locker"
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                First hour: 50 THB<br>After hour: 100 THB
              </b-card-text>

              <b-button href="#" variant="primary">Reserve</b-button>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-md-12">
          <h4>Medium</h4>
          <b-card-group deck>
            <b-card
              v-for="item in list"
              :key="item.id"
              title="Locker"
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                First hour: 50 THB<br>After hour: 100 THB
              </b-card-text>

              <b-button href="#" variant="primary">Reserve</b-button>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-md-12">
          <h4>Large</h4>
          <b-card-group deck>
            <b-card
              v-for="item in list"
              :key="item.id"
              title="Locker"
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                First hour: 50 THB<br>After hour: 100 THB
              </b-card-text>

              <b-button href="#" variant="primary">Reserve</b-button>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    };
  }
};
</script>

<style></style>
