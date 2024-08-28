import express from 'express';
import User from '../Modals/user.js';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import product from '../constants/product.js';

const router = express.Router();

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    password: Joi.string().min(6).required(),
});

router.post('/', async (req, res) => {
    try {
        await userSchema.validateAsync(req.body);
        const { name, email, phone, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { name, email, phone, password: hashedPassword };
        const newUser = new User(userData);
        await newUser.save();
        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, "MS");
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            token
        };
        return res.status(200).send({ message: 'User Added Successfully!', user: userResponse, Product: product });
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
});

export default router;
