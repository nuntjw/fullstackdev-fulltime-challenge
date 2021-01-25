<template>
  <div class="money-input">
    <b-row style="margin-bottom: 10px;">
      <b-col
        sm="3"
        class="text-center"
        v-for="coin in moneyType.coins"
        :key="`coin-${coin.key}`"
      >
        <Coin
          :value="coin.val"
          :onClick="onClickMoney(coin)"
          :disabled="disabled"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="1" />
      <b-col
        sm="2"
        class="text-center"
        v-for="bill in moneyType.bills"
        :key="`bill-${bill.key}`"
      >
        <Bill
          :value="bill.val"
          :onClick="onClickMoney(bill)"
          :disabled="disabled"
        />
      </b-col>
      <b-col sm="1" />
    </b-row>
  </div>
</template>

<script>
import Coin from "./Coin";
import Bill from "./Bill";
import { COINS, BILLS } from "../constants/money";

export default {
  name: "MoneyInput",
  components: {
    Coin,
    Bill
  },
  props: {
    onClickMoney: Function,
    disabled: Boolean
  },
  data() {
    return {
      moneyType: {
        bills: BILLS,
        coins: COINS
      }
    };
  }
};
</script>

<style>
.money-input {
  margin: 25px 0;
}
</style>
