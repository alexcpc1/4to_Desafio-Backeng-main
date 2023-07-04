import {Router} from "express";
// import { CartFiles } from "../daos/managers/carts.Files.js";
// import { ProductsFiles } from "../daos/managers/products.files.js";
import { CartsMongo } from "../daos/managers/carts.mongo.js";
import { ProductsMongo } from "../daos/managers/products.mongo.js";
import { CartModel } from "../daos/models/cart.model.js";
import { ProductsModel } from "../daos/models/product.model.js";
import { addCart, getCarts, addProductToCart, updateCart, updateQuantityInCart, deleteProduct, deleteCart } from "../controllers/carts.controller.js";

//servicio
// const cartsService = new CartFiles("carts.json");
// const productsService = new ProductsFiles('products.json');
const cartsService = new CartsMongo(CartModel);
const productsService = new ProductsMongo(ProductsModel);

const router = Router();

// 1
//agregar carrito
router.post("/",addCart);

// 2
//ruta para listar todos los productos de un carrito
router.get("/:cid", getCarts);
// //3
// //ruta para agregar un producto al carrito
// router.put("/:cid/product/:pid",async(req,res)=>{
//     try {
//         const cartId = req.params.cid;
//         const productId = req.params.pid;
//         const cart = await cartsService.getCartById(cartId);
//         // console.log("cart: ", cart);
//         if(cart) {
//             const product = await productsService.getProductById(productId);
//         // console.log("product: ", product);
//             if(product) {
//                 const cartUpdated = await cartsService.addProductToCart(cartId, productId);
//                 res.json({status:"success", cart:cartUpdated, message:"Producto Agregado"});
//             } else {
//                 res.status(400).json({status: "error", message: "No se puede agregar este producto"});
//             }
//         } else{
//             res.status(400).json({status: "error", message: "Este carrito no existe"});
//         }
//     } catch (error) {
//         res.status(400).json({status:"error", menssage: error.message});
//     }
// });
// copia
router.put("/:cid/:pid", addProductToCart);

// ruta para actualizar todos los productos de un carrito.
router.put("/:cid", updateCart);

//ruta para actualizar cantidad de un producto en el carrito
router.put("/:cid/product/:pid",updateQuantityInCart);

//ruta para eliminar un producto del carrito
router.delete("/:cid/product/:pid",deleteProduct);

router.delete("/:cid", deleteCart);

export {router as cartsRouter};