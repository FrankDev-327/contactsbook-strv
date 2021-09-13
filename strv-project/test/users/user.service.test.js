'use strict';

const UserModel = require('../models/users.model.test');

module.exports = {
    creatingUser: async (email, password) => {
        try {
            if (email == '') throw new Error('Email cannot be empty.');

            if (password == '') throw new Error('Password cannot be empty.');

            const existingEmail = await UserModel.findOne({ email: email });
            if (existingEmail) throw new Error(`A user with the email ${email} already exists.`);

            const newUser = new UserModel({
                email: email,
                password: password
            });

            await newUser.save();
            return { userId: newUser._id };

        } catch (error) {
            throw error;
        }
    },
    findingUser: async (userId) => {
        const user = await UserModel.findById(userId);
        return {
            email: user.email,
            password: user.password
        };
    },
    loggingUser: async (email, password) => {
        try {
            if (email == '') throw new Error('Email cannot be empty.');

            if (password == '') throw new Error('Password cannot be empty.');
            
            const userInfo = await UserModel.findOne({ email: email });
            
            if (!userInfo) throw new Error('The email or password are incorrect.');
           
            if (password !== userInfo.password) throw new Error('The email or password are incorrect.');

            return {
                email: userInfo.email,
                password: userInfo.password
            };

        } catch (error) {
            throw error;
        }
    }
}