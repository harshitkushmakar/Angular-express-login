import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";


export const VerifyToken = (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token)

        return next(CreateError(400, "you are not authenticated!"));
    jwt.verify(token, process.env.JWT_SECRET, (err, use) => {
        if (err) {


            return next(CreateError(403, "Token is not valid"));
        }
        else {
            req.user = user;
        }
        next();
    })
}

export const verifyUser = (req, res, next) => {
    VerifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();

        } else {
            return next(CreateError(403, "You are not authorized"))
        }

    })

}

export const verifyAdmin = (req, res, next) => {
    VerifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();

        } else {
            return next(CreateError(403, "You are not authorized"))
        }

    })

}