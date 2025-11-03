import { Router } from "express";
import UserController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();
// router.get("/", UserController.allUsers)
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/refresh", UserController.refresh);
router.get("/profile", authMiddleware, UserController.profile);
router.put('/profile/:userId', UserController.updateProfile);


export default router;
