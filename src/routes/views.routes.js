import {Router} from "express";
import { ProductsMongo } from "../daos/managers/products.mongo.js";
import { ProductsModel } from "../daos/models/product.model.js";
import { CartsMongo } from "../daos/managers/carts.mongo.js";
import { CartModel } from "../daos/models/cart.model.js";
import { checkUserAuthenticated, checkRoles } from "../middlewares/auth.js";
import { logger } from "../utils/logger.js";
import { resetPassword } from "../controllers/sessions.controller.js";

const router = Router();

const productsService = new ProductsMongo(ProductsModel);
const cartsService = new CartsMongo(CartModel);

//rutas de las vistas
router.get("/", async(req,res)=>{
    try {
        const products = await productsService.getProducts();
        
        res.render("home", {products: products});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }   
});


router.get("/login", (req,res)=>{
    res.render("login");
});

router.get("/signup", (req,res)=>{
    res.render("signup");
});

router.get("/profile", checkUserAuthenticated, (req,res)=>{
    // console.log(req.user);
    res.render("profile",{user:req.user});
});

router.get("/current", checkUserAuthenticated,(req,res)=>{
    console.log(req.user);
    res.render("profile",{user:req.user});
});

// router.get("/chat", checkUserAuthenticated, checkRoles(["user"]), async(req, res)=>{
//     try {
//         res.render("chat");
        
//     } catch (error) {
//         res.status(500).json({status: "error", message: error.message});
//     }
// });

router.get("/products", (req, res)=>{
    console.log(req.user);
    res.render("products", {email: req.user.email});
});

// router.get("/products",async(req,res)=>{
//     try {
//         const {limit=3,page=1,sort="asc",category,stock} = req.query;
//         if(!["asc","desc"].includes(sort)){
//            return res.status(400).json({status: "error", message: "solo puede ser asc o desc"});
//         };
//         const sortValue = sort === "asc" ? 1 : -1;
//         const stockValue = stock === 0 ? undefined : parseInt(stock);
//         // console.log("limit: ", limit, "page: ", page, "sortValue: ", sortValue, "category: ", category, "stock: ", stock);
//         let query = {};
//         if(category && stockValue){
//             query = {category: category, stock:stockValue}
//         } else {
//             if(category || stockValue){
//                 if(category){
//                     query={category:category}
//                 } else {
//                     query={stock:stockValue}
//                 }
//             }
//         }
//         // console.log("query: ", query)
//         const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
//         console.log("baseUrl", baseUrl);
//         //baseUrl: http://localhost:8080/api/products
//         const result = await productsService.getPaginate(query, {
//             page,
//             limit,
//             sort:{price:sortValue},
//             lean:true
//         });
//         // console.log("result: ", result);
//         const response = {
//             status:"success",
//             payload:result.docs,
//             totalPages:result.totalPages,
//             totalDocs:result.totalDocs,
//             prevPage: result.prevPage,
//             nextPage: result.nextPage,
//             page:result.page,
//             hasPrevPage:result.hasPrevPage,
//             hasNextPage:result.hasNextPage,
//             prevLink: result.hasPrevPage ? `${baseUrl.replace( `page=${result.page}` , `page=${result.prevPage}` )}` : null,
//             nextLink: result.hasNextPage ? `${baseUrl.replace( `page=${result.page}` , `page=${result.nextPage}` )}` : null,
//         }
//         console.log("response: ", response);
//         res.render("products",response);
//     } catch (error) {
//          res.status(500).json({status: "error", message: error.message});
//     }
//     res.render("products");
// });

router.get("/cart",async(req,res)=>{
    try {
        return res.render("cart");
    } catch (error) {
        // console.log(error.message);
        res.send(`<div>Hubo un error al cargar esta vista</div>`);
    }
});
router.get("/cart/:cid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        const result = JSON.parse(JSON.stringify(cart));
        res.render("cart", result);
        // console.log(result);
        logger.http(result);
    } catch (error) {
        // console.log(error.message);
        res.send(`<div>Hubo un error al cargar esta vista</div>`);
    }
});
// nuevo 
router.get("/cart/:cid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        // const cart = await  cartsService.getCartById(cartId);
        const cart = await cartsService.getCarts(cartId);
        console.log(cart)
        res.render("cart");
    } catch (error) {
        // console.log(error.message);
        res.send(`<div>Hubo un error al cargar esta vista</div>`);
    }
});

router.get("/forgot-password", (req, res)=>{
    res.render("forgotPassword");
});

router.get("/reset-password", (req, res)=>{
    const token = req.query.token;
    res.render("resetPass", {token});
});

router.get("/loggerTest", (req, res)=>{
    res.send("testeando logger")
    logger.debug("mensaje debug");
    logger.http("mensaje de tipo http");
    logger.info("mensaje informativo");
    logger.warning("mensaje de advertencia");
    logger.error("mensaje de error");
    logger.fatal("mensaje de error crítico o fatal");

});
export {router as viewsRouter}