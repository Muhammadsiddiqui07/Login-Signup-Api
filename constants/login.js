import express from 'express';
import bcrypt from 'bcrypt'
import User from '../Modals/user.js';
import product from './product.js';


const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).then(res => res.toObject());
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            return res.status(401).send({ message: "Invalid password" });
        }
        delete user.password
        return res.status(200).send({ message: 'User found', user: user, Product: product });
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
});

export default router;