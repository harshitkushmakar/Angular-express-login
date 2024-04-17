import Role from '../models/Role.js';
import { CreateSucess } from '../utils/success.js';

export const createRole = async (req, res, next) => {
    try {
        if (req.body.role && req.body.role !== '') {
            // Assuming Role model is imported and defined elsewhere
            const newRole = new Role(req.body);
            await newRole.save();
            return res.send("Role Created!");
        } else {
            return res.status(400).send("Bad Request");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error!");
    }
}

export const updaterole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id });

        if (role) {
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).send("Role Updated!")
        }
        else {
            return res.status(404).send("role not found!")
        }
    }
    catch (error) {
        return res.status(500).send("Internal Error!");
    }
}

export const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        return res.status(200).send(roles);
    }
    catch (error) {
        return res.status(500).send("Internal Server Error!");


    }
}

export const deleteRole = async (req, res, next) => {
        try {
           const roleId = req.params.id;
           const role = await Role.findById({_id: roleId})
     
         if(role){
            await Role.findByIdAndDelete(roleId);
           return next(CreateSucess(200, "role deleted "))
          } else{
            
            
            return next(CreateSucess(400, "Role Not found"))
         }

        } catch (error) {
           
            return next(CreateSucess(500, " Internal Server Error! "));
        }


}


