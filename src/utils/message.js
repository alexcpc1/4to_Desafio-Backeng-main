import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//Función que genera el token para el enlace
export const generateEmailToken = (email, expireTime)=>{
    const token = jwt.sign({email}, config.server.secretToken, {expiresIn: expireTime});
    return token;
};

//Transporte de nodemailer correo con gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.gmail.adminEmail,
        pass: config.gmail.adminPass
    },
    secure: false,
    tls:{
        rejectUnauthorized: false
    }
});

//Función para enviar corre de recuperación de contraseña
export const sendRecoveryEmail = async(userEmail, token)=>{
    //generar link con el token y el tiempo de expiración
    const link = `http://localhost:8080/reset-password?token=${token}`;

    //enviar correo
    await transporter.sendMail({
        from: "Ecommerce Aljorna",
        to: userEmail,
        subject: "Restablecer contraseña",
        html:`
                <div>
                    <h2>Hola, aquí puedes restablecer tu contraseña</h2>
                    <p>hacer clic acá para restablecer tu contraseña</p>
                    <a href="${link}">
                        <button>Restablecer Contraseña</button>
                    </a>
                </div>
        `
    })
}