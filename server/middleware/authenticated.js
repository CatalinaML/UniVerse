//supongo que esto se fija si hay un token , si no hay no pasas

const jwt = require("../utils/jwt");

function asureAuth(req, res, next /*next es lo que decide si se sigue con el pproceso o no*/){

    if(!req.headers.authorization){
        return res.status(403).send({msg: "La peticion no tiene la cabecera de autenticación"});
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    try {
        const payload = jwt.decoded(token);

        const {exp} = payload;
        const currentData = new Date().getTime();

        if(exp <= currentData){
            return res.status(400).send({msg: "Token expirado"});
        }

        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send({msg: "Token invalido"});
    }
}

module.exports = {
    asureAuth,
}