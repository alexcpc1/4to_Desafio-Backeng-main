import {Router} from "express";
// import { ProductsFiles } from "../daos/managers/products.files.js";
// import { ProductsMongo } from "../daos/managers/products.mongo.js";
// se importa el modelo de productos
// import { ProductsModel } from "../daos/models/product.model.js";
import { getProducts, createProduct, getProductById, deleteProduct } from "../controllers/products.controller.js";

// services
// const productsService = new ProductsMongo(ProductsModel);

const router = Router();

router.get("/", getProducts);

//ruta para agregar un producto
router.post("/",createProduct);

router.get("/:pid", getProductById);

//ruta para eliminar el producto
router.delete("/:pid", deleteProduct);

export {router as productsRouter};