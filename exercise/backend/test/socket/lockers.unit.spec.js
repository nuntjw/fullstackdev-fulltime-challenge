import { emitCurrentState, reserve } from "socket/lockers";
import lockerModel from "app/models/locker";
import { SIZE } from "app/constants/locker";
import { calculatePrice } from "app/helpers/lockers";

jest.mock("app/models/locker", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
}));

jest.mock("app/helpers/lockers", () => ({
  calculatePrice: jest.fn(),
}));

Date.now = jest.fn(() => new Date("2020-01-01T00:00:00Z"));

describe("[Unit] lockers socket", () => {
  let mockIO;
  beforeEach(() => {
    mockIO = {
      emit: jest.fn(),
      engine: {
        clientsCount: 1,
      },
    };
  });

  describe("[Function] emitCurrentState", () => {
    it("should emit current state correctly", async () => {
      await emitCurrentState(mockIO);
      expect(lockerModel.find).toHaveBeenCalled();
      expect(mockIO.emit).toHaveBeenCalledTimes(2);
    });
  });

  describe("[Function] reserve", () => {
    it("should reserve success", async () => {
      const mockMsg = {
        lockerId: "test-id",
        reservedBy: "test-user",
        reserveHours: 2,
      };
      lockerModel.findById.mockResolvedValue(() => ({
        size: SIZE.S,
      }));
      lockerModel.update.mockResolvedValue(() => ({
        _id: mockMsg.lockerId,
      }));
      lockerModel.find.mockResolvedValue(() => [{ _id: 1 }, { _id: 2 }]);
      calculatePrice.mockReturnValue(75);
      
      await reserve(mockIO)(mockMsg);
      expect(mockIO.emit).toHaveBeenCalled();
    });
  });
});
