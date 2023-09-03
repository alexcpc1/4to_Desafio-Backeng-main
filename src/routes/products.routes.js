import {Router} from "express";
// import { ProductsFiles } from "../daos/managers/products.files.js";
// import { ProductsMongo } from "../daos/managers/products.mongo.js";
// se importa el modelo de productos
// import { ProductsModel } from "../daos/models/product.model.js";
import { getProductsControl } from "../controllers/products.controller.js";
import { getProductByIdControl } from "../controllers/products.controller.js";
import { createProductControl } from "../controllers/products.controller.js";
import { deleteProductControl } from "../controllers/products.controller.js";
import { updateProductControl } from "../controllers/products.controller.js";
import { checkRoles, checkUserAuthenticated } from "../middlewares/auth.js";

// services
// const productsService = new ProductsMongo(ProductsModel);

const router = Router();

router.get("/", getProductsControl);
router.get("/:pid", getProductByIdControl);
//ruta para agregar un producto
router.post("/",checkUserAuthenticated, checkRoles(["admin", "premium"]),createProductControl);

// router.get("/:pid", checkUserAuthenticated, checkRoles(["admin", "premium"]), getProductByIdControl);
router.put("/:pid", checkUserAuthenticated, checkRoles(["admin", "premium"]), updateProductControl);
//ruta para eliminar el producto
router.delete("/:pid", checkUserAuthenticated, checkRoles(["admin", "premium"]), deleteProductControl);

export {router as productsRouter};