import { ProductsModel } from "../daos/models/product.model.js";
import mongoose from "mongoose";
import { config } from "../config/config.js";


await mongoose.connect(config.mongo.url);

//Función para actualizar todos los productos de nuestra base de datos
const updateProducts = async ()=>{
    try {
        // const products = await ProductsModel.find();
        // console.log("products", products);
        const adminId = "648edc89dd31dfb0a67f82d0"; //ID administrador
        const result = await ProductsModel.updateMany({},{$set:{owner: adminId}});
        console.log("result", result);
    } catch (error) {
        console.log(error.message);
    }
};

updateProducts();