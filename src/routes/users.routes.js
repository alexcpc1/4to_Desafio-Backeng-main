import { Router } from "express";
import { checkRoles, checkUserAuthenticated } from "../middlewares/auth.js";
import { modifyRole } from "../controllers/users.controller.js";

const router = Router();

router.put("/premium/:uid", checkUserAuthenticated, checkRoles(["admin"]), modifyRole);

export {router as usersRouter};