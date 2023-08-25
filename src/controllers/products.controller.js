import { ProductsMongo } from "../daos/managers/products.mongo.js";
// se importa el modelo de productos
import { ProductsModel } from "../daos/models/product.model.js"; 
import { CustomError } from "../services/errors/customError.service.js";
import { generateProductErrorParams } from "../services/errors/productErrorParams.service.js";
import { EError } from "../enums/Eerror.js";
import { logger } from "../utils/logger.js";

//services
const productsService = new ProductsMongo(ProductsModel);

export const getProductsControl = async (req,res)=>{
    try {
        const {limit=10,page=1,sort,category,stock} = req.query;
        if(sort) {
        if(!["asc","desc"].includes(sort)){
            res.json({status:"error", message:"ordenamiento no valido, solo puede ser asc o desc"})
            }
        };

        const sortValue = sort === "asc" ? 1 : -1;
        const stockValue = stock === 0 ? undefined : parseInt(stock);
        // console.log("limit: ", limit, "page: ", page, "sortValue: ", sortValue, "category: ", category, "stock: ", stock);
        let query = {};
        if(category && stockValue){
            query = {category: category, stock:stockValue}
        } else {
            if(category || stockValue){
                if(category){
                    query={category:category}
                } else {
                    query={stock:stockValue}
                }
            }
        }
        // console.log("query: ", query)
        const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        // baseUrl: http://localhost:8080/api/products
        const result = await productsService.getPaginate(query, {
            page,
            limit,
            sort:{price:sortValue},
            lean:true
        });
        // console.log("result: ", result);
        const response = {
            status:"success",
            payload:result.docs,
            totalPages:result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page:result.page,
            hasPrevPage:result.hasPrevPage,
            hasNextPage:result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null,
        }
        // console.log("response: ", response);
        res.json(response);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
};

export const createProductControl = async(req,res)=>{
    try {
        const {title, description, code, price, status, stock, category} = req.body;
        if (!title || !description || !code || !price || !status || !stock || !category ) {
            CustomError.createError({
                name: "error al crear el producto",
                cause: generateProductErrorParams(),
                message: "error en la creación del producto",
                errorCode: EError.INVALID_JSON
            });
            // return res.status(400).json({status: "error", message: "every key should be filled"})
        }

        const newProduct = req.body;
        const products = await productsService.getProducts();
        const matchCode = products.some(element=>element.code === code);
        if (matchCode) {
            return res.status(400).json({status: "error", message: "there is another product using this code"});
        } else {

        const productAdded = await productsService.addProduct(newProduct);
        res.json({status: "success", product: productAdded});
        // console.log(productAdded);
        logger.http(productAdded);
        }
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
        logger.error("mensaje de error");
    }
};

export const getProductByIdControl = async(req,res)=>{
    try {
        const {pid} = req.params;
        const product = await productsService.getProductById(pid);
        const {title, description, code, price, status, stock, category} = req.body;
        if (!title || !description || !code || !price || !status || !stock || !category )
        // console.log("product: ", product);
        res.status(200).json({status:"success", result:product});
        logger.http(product);
    } catch (error) {
        res.status(400).json({message:error.message});
        logger.error("mensaje de error");
    }
};

export const deleteProductControl = async(req,res)=>{
    try {
        const productId = req.params.pid;
        //luego eliminamos el producto
        const productdeleted = await productsService.deleteProduct(productId);
        res.json({status:"success", result:productdeleted.message});
        logger.http(productdeleted);
    } catch (error) {
        res.status(400).json({message:error});
        logger.error("mensaje de error");
    }
};