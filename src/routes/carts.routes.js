import {Router} from "express";
// import { CartFiles } from "../daos/managers/carts.Files.js";
// import { ProductsFiles } from "../daos/managers/products.files.js";
import { CartsMongo } from "../daos/managers/carts.mongo.js";
import { ProductsMongo } from "../daos/managers/products.mongo.js";
import { CartModel } from "../daos/models/cart.model.js";
import { ProductsModel } from "../daos/models/product.model.js";

//servicio
// const cartsService = new CartFiles("carts.json");
// const productsService = new ProductsFiles('products.json');
const cartsService = new CartsMongo(CartModel);
const productsService = new ProductsMongo(ProductsModel);

const router = Router();

// 1
//agregar carrito
router.post("/",async(req,res)=>{
    try {
        const cartAdded = await cartsService.addCart();
        res.json({status:"success", result:cartAdded, message:"Carrito Agregado"});
        console.log(cartAdded);
    } catch (error) {
        res.status(400).json({status:"error", error:error.message});
    }
});

// //Ruta para visualizar los carritos
// router.get("/",async(req,res)=>{
//     try {
//         const cart = await cartsService.getCarts();
//        //res.json({status:"success",data:cart});
//        res.render("cart", {data:cart})
//     } catch (error) {
//         console.log(error.message);
//         res.status(400).json({status:"error", message:"Hubo un error al obtener el carrito"});
//     }
// });
// 2
//ruta para listar todos los productos de un carrito
router.get("/:cid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        //obtenemos el carrito
        const cart = await cartsService.getCarts(cartId);
        if (cart) {
            res.json({status:"success", cart:cart});
        } else {
            res.status(400).json({status: "error", message: "Este carrito no existe"})
        }
    } catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }
});
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
// copia del profe
router.put("/:cid/:pid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await  cartsService.getCarts(cartId);
        // verificar que el producto exista antes de agregarlo al carrito.
        const result = await cartsService.addProductToCart(cartId,productId);
        res.json({status:"success", data:result});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

// ruta para actualizar todos los productos de un carrito.
router.put("/:cid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const products = req.body.products;
        const cart = await cartsService.getCartById(cartId);
        cart.products = [...products];
        const response = await cartsService.updateCart(cartId, cart);
        res.json({status:"success", result:response, message:"Carrito actualizado"});
    } catch (error) {
        res.status(400).json({status:"error", error:error.message});
    }
});

//ruta para actualizar cantidad de un producto en el carrito
router.put("/:cid/product/:pid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        await cartsService.getCartById(cartId);
        await productsService.getProductById(productId);
        const response = await cartsService.updateQuantityInCart(cartId, productId, quantity);
        res.json({status:"success", result: response, message:"Producto actualizado"});
    } catch (error) {
        res.status(400).json({status:"error", message :error.message});
    }
});

//ruta para eliminar un producto del carrito
router.delete("/:cid/product/:pid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartsService.getCartById(cartId);
        // console.log("cart: ", cart);
        if (cart) {
            const product = await productsService.getProductById(productId);
        // console.log("product: ", product);
            if (product) {
                const response = await cartsService.deleteProduct(cartId, productId);
                res.json({status:"success", result:response, message:"Producto eliminado"});
            } else {
                res.status(400).json({status: "error", message: "No se puede eliminar este producto"});
            }
        } else{
            res.status(400).json({status: "error", message: "Este carrito no existe"});
        }
    } catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }
});

router.delete("/:cid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        cart.products=[];
        const response = await cartsService.updateCart(cartId, cart);
        res.json({status:"success", result: response, message:"Carrito eliminado"});
    } catch (error) {
        res.status(400).json({status:"error", error:error.message});
    }
});

export {router as cartsRouter};