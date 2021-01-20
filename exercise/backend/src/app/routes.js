import express from "express";
import lockerCtrl from "app/controllers/lockers";
import authToken from "app/middleware/authToken";

const router = express.Router();

router.get("/lockers", authToken, lockerCtrl.findAll);
router.post("/lockers", authToken, lockerCtrl.create);

export default router;
