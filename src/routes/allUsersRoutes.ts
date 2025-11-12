import {Router} from "express"
import allUsersController from "../controllers/allUsersController"
const router=Router();
const alluserscontroller=new allUsersController()
router.get("/users",alluserscontroller.getAllUsers)
router.delete("/users/:id", alluserscontroller.deleteUser); 
router.put("/users/:id/toggle-pin", alluserscontroller.togglePin);
router.get("/users/religion-counts", alluserscontroller.getReligionCounts);

router.put("/users/:id",alluserscontroller.editUser)
export default router   