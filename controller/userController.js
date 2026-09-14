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