import { Router } from "express";
import { generate100Products } from "../faker.js";

const router = Router();

router.get("/", (req, res)=>{
    const products = generate100Products();
    res.json({status: "success", data: products});
});


export {router as mockRouter}