import { Router } from "express";
import { ProductsFiles } from "../daos/managers/products.files.js";

const productsService = new ProductsFiles('products.json');

const router = Router();

// router.get("/",async (req,res)=>{
//     const Products = await productManager.getProducts();
//     res.render("realtimeproducts", {
//         Products: Products
//     });
// });

// // http//:localhost:8080/api/products/?limit=2
// router.get("/", async(req,res)=>{
//     try {
//         const products = await productManager.getProducts();
//         const limit = req.query.limit;
//         if(limit){
//             let productsLimit = [];  
//             for (let i = 0; i < limit; i++){
//                 productsLimit.push(products[i]);  
//             }
//             res.json({status:"success", data: productsLimit});
//         }else{
//             res.json({status:"success", data: products});
//         }
//     } catch (error) {
//         res.status(400).json({status:"error", message:error.message});
//     }
// });

// // http:localhost:8080/api/products/id=3
// router.get("/:pid",async(req,res)=>{
//     try {
//         const id = req.params.pid;
//         const product = await productManager.getProductById(id);
//         if(product){
//             res.json({status:"success", data:product});
//             } else {
//             res.status(400).json({status:"error", message:"El producto no existe"});
//             }
//     } catch(error){
//         res.status(400).json({status:"error", message:error.message});
//     }
//     });

// // para agregar el producto
// router.post("/",async(req,res)=>{
//     try {
//         const {title, description, code, price, thumbnail, status, stock, category} = req.body;
//         if(!title || !description || !code || !price || !thumbnail || !status || !stock || !category){
//         return res.status(400).json({status:"error", message:"Los campos no son validos"})
//         }
//         const newProduct = req.body;
//         const productSaved = await productManager.addProduct(newProduct);
//         res.json({status:"success", data:productSaved});
//     } catch (error) {
//         res.status(400).json({status:"error", message:error.message});
//     }
// });

// router.put("/:pid", async(req,res)=>{
//     try {
//         const id = req.params.pid;
//         const updateProduct = req.body;
//         const productIndex = await productManager.updateProduct(id, updateProduct);
//             return (productIndex);
//     } catch(error){
//         res.status(400).json({status:"error", message:"No se puede actualizar el producto"}); 
//     }
// });

// router.delete("/:pid",async(req,res)=>{
//     try {
//         const id = req.params.pid;
//         const productDelete = await productManager.deleteProduct(id);
//             return (productDelete);
//     } catch(error){
//         res.status(400).send({status:"error", message:"No se puedo eliminar el producto"});
//     }
// });

export {router as realtimeRouter};