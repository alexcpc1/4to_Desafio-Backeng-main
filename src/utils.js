import path from "path";
import bcrypt from "bcrypt";
import {fileURLToPath} from 'url';
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export {__dirname}

export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (password, user)=>{
    return bcrypt.compareSync(password, user.password);
};
export const verifyEmailToken = (token)=>{
    try {
        const info = jwt.verify(token, config.server.secretToken);
        return info.email;
    } catch (error) {
        return null;
    }
};