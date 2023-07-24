import { config } from "../config/config.js";

let productsDao;
let cartsDao;
let usersDao;


const PERSISTENCE=config.server.persistence;

switch (PERSISTENCE) {
    case "mongo":
        //conexion a base de datos
        const {connectDB} = await import("../config/dbConnection.js");
        connectDB();
        const {CartsMongo} = await import ("./managers/carts.mongo.js");
        const {ProductsMongo} = await import ("./managers/products.mongo.js")
        const {UserMongo} = await import ("./managers/user.Mongo.js");
        cartsDao = new CartsMongo();
        productsDao = new ProductsMongo();
        usersDao = new UserMongo ();
        break;

    case "fileSystem":
        const {CartFiles} = await import ("./managers/carts.Files.js")
        const {ProductsFiles} = await import ("./managers/products.files.js");
        cartsDao = new CartFiles();
        productsDao = new ProductsFiles();
        break;

};

export {productsDao, cartsDao, usersDao};