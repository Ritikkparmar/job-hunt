import express from " express";
import { updateProfile } from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated.js"
const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);

router.route("/profile/update").post(isAuthenticated,updateProfile);
export default router;
