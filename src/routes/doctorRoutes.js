import express from 'express'
import DoctorController from "../controllers/doctorController.js";
import UserController from "../controllers/userController.js";
import validator from "../middlewares/validator.js";

const router = express.Router()

const doctorController = new DoctorController();

router.get('/', async function (req, res) {
    await doctorController.getDoctors(req, res)
})

router.post('/', validator.addDoctor, async function (req, res) {
    await doctorController.addDoctor(req, res)
})

export default router