import express from 'express'
import ScheduleController from "../controllers/scheduleController.js";
import validator from "../middlewares/validator.js";

const router = express.Router()

const scheduleController = new ScheduleController();

router.get('/', async function (req, res) {
    await scheduleController.getSchedule(req, res)
})
router.post('/', validator.addSchedule, async function (req, res) {
    await scheduleController.addSchedule(req, res)
})

export default router
