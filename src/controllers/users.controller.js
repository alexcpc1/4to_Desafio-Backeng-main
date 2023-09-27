import { UserMongo } from "../daos/managers/user.Mongo.js";
import { logger } from "../utils/logger.js";
import { UsersDto } from "../daos/dto/users.dto.js";
import { deleteInactivityEmail } from "../utils/message.js";

const userManager = new UserMongo();


export const modifyRole = async(req, res)=>{
    try {
        const userId = req.params.uid;
        const user = await userManager.getUserById(userId);
        const userRole = user.role;
        const userStatus = user.status
        if (userRole === "user") {
            if (userStatus !== "completo") {
                return res.send("no has subido toda la documentación para convertirte en usuario premium");
            } else if (userStatus === "completo") {
                user.role = "premium";
            }
          
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

export const uploadDocumentsControl = async(req, res)=>{
    try {
        
        const userId = req.params.uid;
        const user = await userManager.getUserById(userId);

        if (!user) {
            return res.json({status: "error", message: "El usuario no existe"});
        }
        logger.debug(req.files);
        const identificacion = req.files["identificacion"][0] || null;
        const domicilio = req.files["domicilio"][0] || null;
        const estadoDeCuenta = req.files["estadoDeCuenta"][0] || null;
        const docs = [];
        if (identificacion) {
            docs.push({name:"identificación", reference: identificacion.filename});
        }
        if (domicilio) {
            docs.push({name:"domicilio", reference: domicilio.filename});
        }
        if (estadoDeCuenta) {
            docs.push({name:"estadoDeCuenta", reference: estadoDeCuenta.filename});
        }
        logger.debug(docs);
        user.documents = docs;

        if (user.documents.length === 3) {
            user.status = "completo"
        } else {
            user.status = "incompleto"
        }
        await userManager.updateUser(user._id, user);
        res.json({status: "success", message: "solicitud procesada"});
       

    } catch (error) {
        res.send(error.message); 
    }
};

export const getAllUsersController = async(req, res)=>{
    try {
        const getUsers = await userManager.getAllUsers();
        const getDtoUsers = getUsers.map(userDB=> new UsersDto(userDB));
        res.json({status: "success", data: getDtoUsers});
    } catch (error) {
        res.json({status: "error", message: error.message});
    }
};


export const deleteInactiveUsersControl = async(req, res)=>{
    try {
        const getUsers = await userManager.getAllUsers();
        const getDtoUsers = getUsers.map(userDB=> new UsersDto(userDB));
        const inactiveUsers = getDtoUsers.filter((element)=>element.ult_conex_en_hrs > 48);
        inactiveUsers.forEach(element => {
            deleteInactivityEmail(element.email);
            console.log(JSON.parse(JSON.stringify(element.id)));
            userManager.deleteUser(JSON.parse(JSON.stringify(element.id)));
        });
        
        res.json({status: "success", data: inactiveUsers});
    } catch (error) {
        res.json({status: "error", message: error.message});
    }
};

export const removeUserControl = async(req,res)=>{
    try {
        const userId = req.params.uid;
        const response = await userManager.deleteUser(userId);
        res.json({status: "success", message: "usuario eliminado"});
    } catch (error) {
        res.status(400).json({status:"error", error:error.message});
        logger.error("mensaje de error");
    }
};


export const getUserByIdControl = async(req, res)=>{
    try {
        const userId = req.params.uid;
        const user = await userManager.getUserById(userId);
        if (user) {
            res.json({status: "success", user: user});
            logger.http(user);
        } else{
                  res.status(400).json({status: "error", message: "this user does not exist"});
        }
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
        logger.error("mensaje de error");
    }

};