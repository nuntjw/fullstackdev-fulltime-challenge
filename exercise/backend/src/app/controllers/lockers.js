import lockerModel from "app/models/locker";
import { STATUS, SIZE } from "app/constants/locker";
import { getPriceBySize } from "app/helpers/lockers";

const findAll = async (req, res) => {
  const lockers = await lockerModel.find();
  return res.json({
    data: lockers,
  });
};

const create = async (req, res) => {
  const { name, size = SIZE.S } = req.body;
  const payload = {
    name: name,
    size,
    price: getPriceBySize(size),
    status: STATUS.IDLE,
  };

  const result = await lockerModel.create(payload);
  return res.json({
    data: result,
  });
};

export default {
  findAll,
  create,
};
