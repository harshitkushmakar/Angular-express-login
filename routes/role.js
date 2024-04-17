import express from 'express';

import { updaterole, createRole, getAllRoles, deleteRole} from '../controllers/role.controller.js';

const router = express.Router();

//Create role 
router.post('/create', createRole),

    //Update role
    router.put('/update/:id', updaterole),

    //GET all the roles from DB
    router.get('/getAll', getAllRoles),

    //delete all the roles from DB
    router.delete('/deleteRole/:id', deleteRole)

export default router;
