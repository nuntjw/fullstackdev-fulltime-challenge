import { calculatePrice } from "app/helpers/lockers";
import { SIZE } from "app/constants/locker";

describe("[Unit] lockers helper", () => {
  describe("[Function] calculatePrice", () => {
    it("should return calculate result correctly, case first hour", () => {
      const hours = 1;
      const result = calculatePrice(SIZE.S, hours);
      const expectResult = 50;
      expect(result).toEqual(expectResult);
    });

    it("should return calculate result correctly, aftter hour", () => {
      const hours = 2;
      const result = calculatePrice(SIZE.S, hours);
      const expectResult = 75;
      expect(result).toEqual(expectResult);
    });
  });
});
