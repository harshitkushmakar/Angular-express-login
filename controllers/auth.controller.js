import Role from "../models/Role.js"
import Users from "../models/Users.js";
import bcrpyt from "bcryptjs"
import { CreateError } from "../utils/error.js";
import { CreateSucess } from "../utils/success.js";
import jwt from "jsonwebtoken";

//user

export const register = async (req, res, next) => {

    const role = await Role.find({ role: 'Users' });
    const salt = await bcrpyt.genSalt(10);
    const hashPassword = await bcrpyt.hash(req.body.password, salt)


    const newUser = Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        roles: role
    });

    await newUser.save();
    return next(CreateSucess(200, "user Registered sucessfully!"));
}

//admin

export const registerAdmin = async (req, res, next) => {

    const role = await Role.find({ role: 'Users' });
    const salt = await bcrpyt.genSalt(10);
    const hashPassword = await bcrpyt.hash(req.body.password, salt)


    const newUser = Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        isAdmin: true,
        roles: role
    });

    await newUser.save();
    return next(CreateSucess(200, "user Registered sucessfully!"));
}


export const login = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
            .populate("roles", "role");

        const { roles } = user;

        if (!user) {

            return res.status(400).send("user not found")
        }
        const isPasswordCorrect = await bcrpyt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send("password is incorrect!");
        }
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin:
                    user.isAdmin, roles: roles
            },
            process.env.JWT_SECRET
        )
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({
                status: 200,
                message: "Login",
                data: user
            })


        return next(CreateSucess(200, "Login Sucess!"));

    } catch (error) {
        return res.status(500).send("something went wrong!")
    }

}

