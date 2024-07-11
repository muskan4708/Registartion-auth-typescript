import { Router } from 'express';

import { deleteUserById, getUserById, getUsers, loginUser, logoutUser, registerUser } from '../controllers/userController';

const router = Router();


router.post('/', registerUser);
router.get('/logout',logoutUser)
router.post('/login',loginUser)
router.get("/getAllUsers",getUsers)
router.get("/getUserById/:id",getUserById)
router.delete("/delete/:id",deleteUserById)

export default router;
