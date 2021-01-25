export const filterBySize = (size, list = []) =>
  list.filter(item => item.size === size);

export const calculatePrice = (price, hours) => {
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
