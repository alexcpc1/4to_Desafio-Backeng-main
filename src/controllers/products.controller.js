import { ProductsMongo } from "../daos/managers/products.mongo.js";
// se importa el modelo de productos
import { ProductsModel } from "../daos/models/product.model.js";

//services
const productsService = new ProductsMongo(ProductsModel);

export const getProducts = async (req,res)=>{
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
        console.log("response: ", response);
        res.json(response);
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
};

export const createProduct = async(req,res)=>{
    try {
        const productCreated = await productsService.createProduct(req.body);
        res.json({status:"success", data:productCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
};

export const getProductById = async(req,res)=>{
    try {
        const {pid} = req.params;
        const product = await productsService.getProductById(pid);
        const {title, description, code, price, status, stock, category} = req.body;
        if (!title || !description || !code || !price || !status || !stock || !category )
        // console.log("product: ", product);
        res.status(200).json({status:"success", result:product});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const deleteProduct = async(req,res)=>{
    try {
        const productId = req.params.pid;
        //luego eliminamos el producto
        const productdeleted = await productsService.deleteProduct(productId);
        res.json({status:"success", result:productdeleted.message});
    } catch (error) {
        res.status(400).json({message:error});
    }
};



