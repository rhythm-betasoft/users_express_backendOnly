import {Router} from "express"
import allUsersController from "../controllers/allUsersController"
const router=Router();
router.get("/users",allUsersController.getAllUsers)
router.delete("/users/:id", allUsersController.deleteUser); 
router.put("/users/:id",allUsersController.editUser)
export default router