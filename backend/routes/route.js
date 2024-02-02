import express from 'express';
import validLogin from '../controllers/validLogin.js';
import validRegister from '../controllers/validRegister.js';

export const router = express.Router()

router.post('/formulaire/user/register', validRegister);
router.post('/formulaire/user/login', validLogin);