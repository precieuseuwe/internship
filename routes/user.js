import express from "express";
import {register, getProfile,login} from "../controllers/user.js";
import  verifyToken from "../utils/verifytoken.js";
const router = express.Router();


router.post('/register', register);
router.get('/users', getProfile);
router.post('/login',login);

router.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: `Welcome to your dashboard, user ${req.userId}` });
});

export default router;