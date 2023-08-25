import {Router} from "express";
// import { CartFiles } from "../daos/managers/carts.Files.js";
// import { ProductsFiles } from "../daos/managers/products.files.js";
import { CartsMongo } from "../daos/managers/carts.mongo.js";
import { ProductsMongo } from "../daos/managers/products.mongo.js";
import { CartModel } from "../daos/models/cart.model.js";
import { ProductsModel } from "../daos/models/product.model.js";
import { addCartControl, getCartsControl, addProductToCartControl, updateCartControl, updateQuantityInCartControl, deleteProductControl, deleteCartControl, purchaseControl } from "../controllers/carts.controller.js";
import { checkRoles, checkUserAuthenticated } from "../middlewares/auth.js";

//servicio
const cartsService = new CartsMongo(CartModel);
const productsService = new ProductsMongo(ProductsModel);

const router = Router();

//agregar carrito
router.post("/",addCartControl);
//ruta para listar todos los productos de un carrito
router.post("/:cid", getCartsControl);
router.post("/:cid/product/:pid", checkUserAuthenticated, checkRoles(["user", "premium"]), addProductToCartControl);
router.delete("/:cid/product/:pid", checkUserAuthenticated, checkRoles(["user", "premium"]), deleteProductControl);
// ruta para actualizar todos los productos de un carrito.
router.put("/:cid", checkUserAuthenticated, checkRoles(["user", "premium"]), updateCartControl);
//ruta para actualizar cantidad de un producto en el carrito
router.put("/:cid/product/:pid", checkUserAuthenticated, checkRoles(["user", "premium"]), updateQuantityInCartControl);
//ruta para eliminar un producto del carrito
router.delete("/:cid", checkUserAuthenticated, checkRoles(["user", "premium"]), deleteCartControl);
router.post("/:cid/purchase", purchaseControl);

export {router as cartsRouter};