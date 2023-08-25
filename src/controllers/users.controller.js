import { UserMongo } from "../daos/managers/user.Mongo.js";


const userManager = new UserMongo();


export const modifyRole = async(req, res)=>{
    try {
        const userId = req.params.uid;
        const user = await userManager.getUserById(userId);
        const userRole = user.role;
        if (userRole === "user") {
            user.role = "premium";
        } else if(userRole === "premium"){
            user.role = "user";
        } else {
            res.send("No es posible cambiar el rol del usuario")
        };
        const result = await userManager.updateUser(userId, user);
        res.send("Rol del usuario ha sido modificado");
    } catch (error) {
        res.send(error.message);
    }
};