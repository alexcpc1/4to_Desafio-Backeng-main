import { ProductsModel } from "../models/product.model.js";

class ProductsMongo{
    constructor(model){
        this.model = ProductsModel;
    }

    async getProducts(){
        try {
            const data = await this.model.find();
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(`Error get all ${error}`);
        }
    };

    async getProductById(id){
        try {
            const data = await this.model.findById(id);
            if(!data){
                throw new Error("el producto no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al obtener producto ${error.message}`);
        }
    };
    async createProduct(product){
        try {
            const data = await this.model.create(product);
            return data;
        } catch (error) {
            throw new Error(`Error al crear el producto ${error.message}`);
        }
    };

    async updateProduct(id,product){
        try {
            const data = await this.model.findByIdAndUpdate(id,product,{new:true});
            if(!data){
                throw new Error("el producto no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al actualizar el producto ${error.message}`);
        }
    };

    async deleteProduct(id){
        try {
            await this.model.findByIdAndDelete(id);
            return {message: "producto eliminado"};
        } catch (error) {
            throw new Error(`Error al eliminar el producto ${error.message}`);
        }
    };

    async getPaginate(query={},options={}){
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener productos ${error.message}`);
        }
    };
}

export {ProductsMongo};