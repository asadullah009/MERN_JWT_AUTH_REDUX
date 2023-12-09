import express from 'express';
import { GetUser, Login, Signup, VarifyToken,  } from '../controllers/userContrllers.js';

const router = express.Router();


router.post('/signup', Signup)
router.post('/login', Login )
router.get('/user', VarifyToken, GetUser)



export default router;