import express from 'express'
import { getUserAll, getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { regsiterUserValidation, validationLogin } from '../validations/users.js';
import { authticationUser } from '../middleWare/authMiddleWare.js';
const userRouter = express.Router();
userRouter.get('/', getUserAll);
userRouter.get('/getUserProfile', authticationUser, getUserProfile)
userRouter.post('/', regsiterUserValidation, registerUser);
userRouter.post('/login', validationLogin, loginUser);
userRouter.post('/logout', authticationUser, logoutUser);

export default userRouter;