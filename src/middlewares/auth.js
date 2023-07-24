const checkUserAuthenticated = (req, res, next)=>{
    if (req.user) {
        next();
    }else{
        res.send(`<div> debes estar autenticado, <a href= "/login">iniciar sesión</a></div>`);
    }
};

const checkRoles = (urlRoles)=>{
    return (req, res, next)=>{
        if(!urlRoles.includes(req.user.role)){
            return res.send(`<div> no tienes permisos, <a href= "/">Ir al home</a></div>`);
        }else{
            next();
        }
    }
};

export {checkUserAuthenticated, checkRoles}