import chai from "chai";
import supertest from "supertest";
import { app } from "../src/app.js";
import { CartModel } from "../daos/models/cart.model.js";
import { userModel } from "../daos/models/user.model.js";


const expect = chai.expect;

const requester = supertest(app);


describe("testing para autenticación", ()=>{

    before(async function () {
        this.userMock = {
            first_name: "alexander",
            last_name: "aljorna",
            email: "aljornacpc1@gmail.com",
            age: 33,
            password: "15255993"
        };
        this.cookie;
        await userModel.deleteMany({});
    });

    it("el endpoint post api/sessions/signup debe permitir registrar un usuario", async function () {
        const response = await requester.post("/api/sessions/signup").send(this.userMock);
        expect(response.statusCode).to.be.equal(200);
    });

    it("el endpoint post api/sessions/login permite loguear un usuario", async function () {
        const response = await requester.post("/api/sessions/login").send({email:this.userMock.email, password:this.userMock.password});
        expect(response.statusCode).to.be.equal(200);
        expect(response.text).to.be.equal("login exitoso");

    });

});

describe ("testing para carritos", ()=>{

    before(async function () {
        await CartModel.deleteMany({});
    });

    it("el endpoint post api/carts/ debe poder agregar un carrito", async function () {
        const response = await requester.post("/api/carts");
        console.log(response._body.cart._id);
        const cartId = JSON.parse(JSON.stringify(response._body.cart._id));
        expect(response.statusCode).to.be.equal(200);
    });

    it("el endpoint get api/carts/:cid debe mostrar el carrito proporcionando su id", async function () {
        const response = await requester.post("/api/carts");
        console.log(response._body.cart._id);
        const cartId = JSON.parse(JSON.stringify(response._body.cart._id));
        const result = await requester.get(`/api/carts/${cartId}`);
        console.log(result._body);
        expect(result._body.cart).to.have.property("products");
        expect(Array.isArray(result._body.cart.products)).to.be.equal(true);
    });

});


describe("testing para productos", ()=>{


    it("el endpoint get api/products debe mostrar todos los productos", async function () {
        const response = await requester.get("/api/products?sort=asc");
        expect(response.statusCode).to.be.equal(200);
    });

    it("el endpoint get api/products/:pid debe mostrar el producto proporcionando su id", async function () {
        const response = await requester.get("/api/products?sort=asc");
        console.log(response._body.payload[0]._id);
        const productId = JSON.parse(JSON.stringify(response._body.payload[0]._id));
        const result = await requester.get(`/api/products/${productId}`);
        expect(result.statusCode).to.be.equal(200);
        expect(result._body.product).to.have.property("code");
    });
});