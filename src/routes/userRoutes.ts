import { Router } from "express";
import UserController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();
// router.get("/", UserController.allUsers)
const usercontroller=new UserController()
router.post("/register", usercontroller.register)
router.post("/login", usercontroller.login)
router.post("/refresh", usercontroller.refresh);
router.get("/profile", authMiddleware, usercontroller.profile);
router.put('/profile/:userId', usercontroller.updateProfile);
router.post("/verify-twofa", usercontroller.verifyTwoFA.bind(usercontroller));
router.put("/2fa/:userId", usercontroller.toggleTwoFA);
router.post("/switchOnTwoFA",usercontroller.switchOnTwoFA)
router.post("/otpOnMail/:userId",usercontroller.otpOnMail)
export default router;
