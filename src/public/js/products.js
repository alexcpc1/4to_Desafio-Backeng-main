// import { response } from "express";

console.log("javascript products")

const addToCart = async (productId) => {
    console.log("el producto a agregar será el", productId);
    // fetch("http://localhost:8080/api/cart/6483ee4eefeb449154f3d71d",
    fetch("http://localhost:8080/", { 
    })
};
    //router.post(":cid/product/: pid",
const addToCarts = async (cartId, productId) => {    
    try {
        const response = await fetch (`http://localhost:8080/${cartId}/product/${productId}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({cartId, productId})
        });

        if (response) {
            console.log("Producto agregado", productId);
        } else {
            console.log("Error al agregar el producto al carrito");
        }
        } catch (error) {
        console.log("El producto no se agrego debido al error:", error.message);
    }
};