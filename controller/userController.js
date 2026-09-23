import Users from "../model/userModel.js";

export const create = async (req, res) => {
    try {
        const newUserInfo = req.body;
        const newUser = new Users(newUserInfo);

        const {login} = newUser;

        const userExist = await Users.findOne({login});

        if (userExist){
            return res.status(400).json({message: "User with this login already exist"});
        }

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
        const userID = req.params.userID;
        const user = await Users.findOne(userID)
        if (!user) {
            return res.status(404).json({message: "There are no Users with this ID"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}