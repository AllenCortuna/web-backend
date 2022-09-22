import express from 'express';
const router = express.Router();


import {signin , login} from '../controlers/user.js';


router.post('/signin', signin);
router.post('/login', login);

export default router;
