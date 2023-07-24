import { cartsDao } from "../daos/factory.js";

export class CartsService{
    static async createCart(){
        return cartsDao.createCart();
    };

    static async getCartById(id){
        return cartsDao.getCartById(id);
    };

    static async addProduct(cid, pid){
        return cartsDao.addProduct(cid, pid);
    };

    static async purchase(cid){
        return cartsDao.purchase(cid);
    };
    
};