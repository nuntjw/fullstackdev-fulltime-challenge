<template>
  <b-modal v-model="visible">
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="3">
          <label :for="'name'">Name</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="name" :id="'name'" type="text" />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <label for="reserve-hours">Reserve {{ reserveHours }} Hours</label>
          <b-form-input
            id="reserve-hours"
            v-model="reserveHours"
            type="range"
            min="1"
            max="24"
            v-on:change="calculateAmount"
          />
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col sm="12">
          <div>Amount: {{ calculateAmount() }} Baht</div>
          <div>
            Money: {{ money }} Baht
            <span class="reset" @click="resetMoney">reset</span>
          </div>
          <div class="change" v-if="money >= calculateAmount()">
            Change: {{ money - calculateAmount() }} Baht
          </div>
          <MoneyInput
            :disabled="money >= calculateAmount()"
            :onClickMoney="onClickMoney"
          />
        </b-col>
      </b-row>
    </b-container>
    <template #modal-header>
      <b>Reserve {{ pendingLocker && pendingLocker.name }}</b>
    </template>
    <template #modal-footer>
      <div class="w-100">
        <b-button
          :disabled="isDisabledConfirmBtn()"
          variant="success"
          size="sm"
          class="float-right confirm-btn"
          @click="onClickReserve"
        >
          Confirm
        </b-button>
        <b-button
          variant="light"
          size="sm"
          class="float-right"
          @click="onCancel"
        >
          Cancel
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { calculatePrice } from "../../plugins/lockerHelper";
import MoneyInput from "../MoneyInput";

export default {
  name: "ReserveModal",
  components: {
    MoneyInput
  },
  props: {
    modalVisible: Boolean,
    onCloseModal: Function,
    onReserve: Function,
    pendingLocker: Object
  },
  data() {
    return {
      visible: this.modalVisible,
      reserveHours: "1",
      name: "",
      money: 0
    };
  },
  methods: {
    resetMoney() {
      this.money = 0;
    },
    calculateAmount() {
      if (!this.pendingLocker) return null;
      return calculatePrice(this.pendingLocker.price, this.reserveHours);
    },
    isDisabledConfirmBtn() {
      const isMoneyEnought = this.money >= this.calculateAmount();
      return !isMoneyEnought || this.name.length === 0 || this.reserveHours.length === 0;
    },
    onClickReserve(e) {
      e.preventDefault();
      this.onReserve(this.name, this.reserveHours, this.money);
      this.money = 0;
    },
    onCancel(e) {
      this.money = 0;
      this.onCloseModal(e);
    },
    onClickMoney({ val }) {
      const setCount = () => {
        this.money += +val;
      };
      return function(e) {
        e.preventDefault();
        setCount();
      };
    }
  },
  watch: {
    modalVisible() {
      this.visible = this.modalVisible;
    }
  }
};
</script>
<style>
.confirm-btn {
  margin-left: 10px;
}
.reset {
  color: blue;
  font-weight: bold;
  cursor: pointer;
}
.change {
  text-align: right;
}
</style>
