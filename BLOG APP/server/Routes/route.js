import express from 'express';

import {signupUser} from '../Controlers/user_controler.js';

const router = express.Router();


router.post('/signup',signupUser);


export default router;