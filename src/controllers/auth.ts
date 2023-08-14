import { RequestHandler } from "express";
import UserModel from "../models/user";
import { validationResult } from "express-validator/src/validation-result";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() == false) {
        const error = new Error('Validation failed');
        throw error;
    }
    
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({
        email: email,
        password: hashedPassword,
        name: name
    })

    res.status(201).json({message: 'User created', userId: user._id});
    res.send();
}

export const login: RequestHandler = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({email: email});
    if (user == null) {
        const error = new Error('User not present');
        throw error;
    }
    const loadedUser = user;

    const comparisionResult = await bcrypt.compare(password, user.password);
    if (comparisionResult == false) {
        const error = new Error('Password invalid');
        throw error;
    }

    const token = jwt.sign({
        email: loadedUser.email,
        userId: loadedUser._id.toString()
    }, process.env.APP_KEY!, {expiresIn: '1h'});

    res.status(200).json({token: token, userId: loadedUser._id.toString()})
    res.send();
}