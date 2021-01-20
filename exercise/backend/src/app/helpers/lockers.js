import { PRICE, SIZE } from "app/constants/locker";

export const getPriceBySize = (size) => PRICE[size];

export const calculatePrice = (size, hours) => {
  const price = PRICE[size];
  let currentHours = hours;
  let amount = 0;
  if (hours < 1) return amount;
  amount += price.firstHour;
  currentHours--;
  while (currentHours > 0) {
    amount += price.afterHour;
    currentHours--;
  }
  return amount;
};
