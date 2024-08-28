import express from 'express';
import User from '../constants/user.js';
import login from '../constants/login.js'


const router = express.Router()

router.use('/signin', User)
router.use('/login', login)

export default router;