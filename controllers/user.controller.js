import { CreateError } from "../utils/error.js"
import User from "../models/Users.js";
import { CreateSucess} from "../utils/success.js"


export const getAllUsers =async (req, res, next) => {
    try {
          const users = await User.find();
          return next(CreateSucess(200, "All Users", users));            
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"))

    }


}

export const getById = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
          return next(CreateError(404, "user not found!"));
        }
        return next(CreateSucess(200, "Single User", user))

         
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));

    }
}
