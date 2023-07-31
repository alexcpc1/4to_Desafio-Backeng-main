import { EError } from "../enums/Eerror.js";

export const errorHandler = (error, req, res, next)=>{
    switch (error.code) {
        case EError.ROUTING_ERROR:
            res.json({status:"error", message: error.message});
            break;
        case EError.INVALID_JSON:
            res.json({status:"error", message: error.cause});
            break;
        case EError.DATABASE_ERROR:
                res.json({status:"error", message: error.cause});
            break;
        case EError.AUTH_ERROR:
            res.json({status:"error", message: error.cause});
            break;
        case EError.INVALID_PARAMS:
            res.json({status:"error", message: error.cause});
            break;
        default:
            break;
    }
}