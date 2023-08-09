import { RequestHandler } from "express";
import UserModel from "../models/user";
import { validationResult } from "express-validator/src/validation-result";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() == false) {
        const error = new Error('Validation failed');
        throw error;
    }
    
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    bcrypt.hash(password, 12)
        .then((hashedPassword) => {
            const user = new UserModel({
                email: email,
                password: hashedPassword,
                name: name
            })

            return user.save();
        })
        .then((result) => {
            res.status(201).json({message: 'User created', userId: result._id});
        })
        .catch((error) => {
            next(error);
        })
}

export const login: RequestHandler = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser: any;

    UserModel.findOne({email: email})
        .then((user) => {
            if (user == null) {
                const error = new Error('User not present');
                throw error;
            }

            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then((isEqual) => {
            if (isEqual == false) {
                const error = new Error('Password invalid');
                throw error;
            }

            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, process.env.APP_KEY!, {expiresIn: '1h'});

            res.status(200).json({token: token, userId: loadedUser._id.toString()})
        })
        .catch((error) => {
            next(error);
        })
}