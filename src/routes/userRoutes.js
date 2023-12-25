import express from 'express'
import UserController from "../controllers/userController.js";
import validator from "../middlewares/validator.js";

const router = express.Router()

const userController = new UserController();

router.get('/', async function (req, res) {
    await userController.getUsers(req, res)
})

router.post('/', validator.addUser, async function (req, res) {
    await userController.addUser(req, res)
})

export default router