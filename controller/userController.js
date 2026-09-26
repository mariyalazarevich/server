import Users from "../model/userModel.js";
import {sha256} from "../scripts.js"
import { SECRET_KEY as key } from "../index.js";
import jwt from "jsonwebtoken"

export const create = async (req, res) => {
    try {
        const {password} = req.body;
        const hashPassword = await sha256(password);
        const newUserInfo = req.body;
        newUserInfo.password = hashPassword;

        const {login} = newUserInfo;

        const userExist = await Users.findOne({login});

        if (userExist){
            return res.status(400).json({message: "User with this login already exist"});
        }

        const newUser = new Users(newUserInfo);

        res.status(200).json(await newUser.save());

    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getAll = async (req, res) => {
    try {
        const allUsers = await Users.find();
        if(!allUsers || allUsers.length === 0) {
            return res.status(404).json({message: "There are no Users with your request"})
        }
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne(id)
        if (!user) {
            return res.status(404).json({message: "There are no Users with this ID"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const updateUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const userWithID = await Users.findOne(id);;
        if (!userWithID){
            return res.status(404).json({message: "There are no User with this ID"})
        }
        await Users.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({message: "User updated succesfully"})
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const deleteByID = async (req, res) => {
    try {
        const id = req.params.id;
        const userWithID = await Users.findOne(id);;
        if (!userWithID){
            return res.status(404).json({message: "There are no User with this ID"})
        }
        await Users.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted succesfully"})
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const logIn = async (req, res) => {
    try {
        const {login, password} = req.body

        const hashPassword = await sha256(password)

        const existUser = await Users.findOne({login, password: hashPassword})

        if (!existUser){
            return res.status(404).json({message: "The user doesn't exist"})
        }

        const token = jwt.sign(
            {
                userId: existUser._id,
                login: existUser.login
            }, 
            key, 
            {expiresIn: "15m"}
        )

        res.cookie("token", token, {httpOnly: true})
        res.status(200).json(token)

    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}