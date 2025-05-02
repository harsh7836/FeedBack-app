import express from "express";
import {registerController, loginController, testController} from '../controllers/authController.js';
import { isAdmin, requirSignIn } from "../middlewares/authMiddlewares.js";

//route object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

//test controller
router.get('/test',requirSignIn,isAdmin, testController)

export default router;