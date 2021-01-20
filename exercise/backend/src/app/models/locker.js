import lockerModel from "./schemas/locker";

const find = (query = {}) => lockerModel.find(query).lean().exec();

const create = (locker) => lockerModel.create(locker);

const update = (id, payload) =>
  lockerModel.findByIdAndUpdate(id, payload, { new: true });

const findById = (id) => lockerModel.findById(id).lean().exec();

export default {
  find,
  create,
  update,
  findById,
};
