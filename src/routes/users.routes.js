import { Router } from "express";
import { checkRoles, checkUserAuthenticated } from "../middlewares/auth.js";
import { modifyRole } from "../controllers/users.controller.js";
import { uploadUserDoc } from "../utils.js";
import { uploadDocumentsControl } from "../controllers/users.controller.js";
import { getAllUsersController } from "../controllers/users.controller.js";
import { deleteInactiveUsersControl, removeUserControl, getUserByIdControl } from "../controllers/users.controller.js";


const router = Router();

router.put("/premium/:uid", checkUserAuthenticated, checkRoles(["admin"]), modifyRole);

router.post("/:uid/documents", checkUserAuthenticated, uploadUserDoc.fields([{name:"identificacion", maxCount: 1}, {name:"domicilio", maxCount: 1}, {name:"estadoDeCuenta", maxCount: 1}]), uploadDocumentsControl);

router.get("/", checkUserAuthenticated, checkRoles(["admin"]), getAllUsersController);

router.delete("/", checkUserAuthenticated, checkRoles(["admin"]), deleteInactiveUsersControl);

router.delete("/:uid", checkUserAuthenticated, checkRoles(["admin"]), removeUserControl);

router.get("/:uid", checkUserAuthenticated, checkRoles(["admin", "premium"]), getUserByIdControl);

export {router as usersRouter};