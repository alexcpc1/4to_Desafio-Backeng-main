import express from "express";
import { engine } from 'express-handlebars';
import { options } from "./config/options.js";
import{__dirname} from "./utils.js";
import path from "path";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { realtimeRouter } from "./routes/realtime.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { connectDB } from "./config/dbConnection.js";
import {Server} from "socket.io";
import { ChatMongo } from "./daos/managers/chat.mongo.js";
import { ChatModel} from "./daos/models/chat.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initPassport } from "./config/passport.config.js";

//service
const chatService = new ChatMongo(ChatModel);
// Ejecucion del servidor
export const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

httpServer.on('error', error => console.log(`Error in server ${error}`));

// configuracion session
app.use(session({
    store: MongoStore.create({
        mongoUrl:options.mongo.url
    }),
    secret:"claveSecreta",
    resave:true,
    saveUninitialized:true
}));

// configuracion de passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());

//configuracion motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//conexion a la base de datos
connectDB();

const socketServer = new Server (httpServer);

//routes
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/realtimeproducts", realtimeRouter);
app.use("/api/sessions", sessionsRouter);

// configuración socket servidor
socketServer.on("connection",async(socketConnected)=>{
    console.log(`Nuevo cliente conectado ${socketConnected.id}`);
    const messages = await chatService.getMessages();
    socketServer.emit("msgHistory", messages);
    //capturamos un evento del socket del cliente
    socketConnected.on("message",async(data)=>{
        //recibimos el msg del cliente y lo guardamos en el servidor con el id del socket.
        await chatService.addMessage(data);
        const messages = await chatService.getMessages();
        // messages.push({socketId: socketConnected.id, message: data});
        //Enviamos todos los mensajes a todos los clientes
        socketServer.emit("msgHistory", messages);
    });
});