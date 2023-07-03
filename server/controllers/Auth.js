const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const User = require("../models/User");
const fs = require("fs").promises;

async function register(req, res){
    const {username, email, password} = req.body;

    if(!email) res.status(400).send({msg: "Email obligatorio"});
    if(!password) res.status(400).send({msg : "Contraseña obligatoria"});
    
    //encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User({
        username,
        email,
        password: hashPassword,
        role: "user",
        active: true,
    });

        //controlo la imagen
        if(req.files.avatar){
            let imagePath = "";
    
            if(req.files.avatar && req.files.avatar.size > 0){
                const filePath = req.files.avatar.path;
                const fileSplit = filePath.split("\\");
            
                imagePath = `${fileSplit[1]}/${fileSplit[2]}`;
            }
    
            if(imagePath){
                user.avatar = imagePath;
            }else{
                user.avatar = null;
                await fs.unlink(req.files.avatar.path); //Se me estaba guardando un archivo vacío igual, acá no prevengo que no se guarde, pero por lo menos lo borro
            }
            
        }

    try {
        await user.save();
        res.status(200).send({msg: "Usuario registrado"});
    } catch (error) {
        res.status(400).send({msg: "Error en el registro"});
    }
}

async function login(req, res){
    const {email, password} = req.body;

    if(!email) res.status(400).send({msg : "Email obligatorio"});
    if(!password) res.status(400).send({msg : "Contraseña obligatoria"});

    try {
        //función de mongoose
        const response = await User.findOne({email: email});

        //comparar contraseñas encriptadas

        bcrypt.compare(password, response.password, (bcryptError, check) => {

            //comparar
            if(bcryptError){
                res.status(500).send({msg: "Error del servidor"});
            }else if(!check){
                //las contraseñas no son iguales
                res.status(400).send({msg: "Contraseña incorrecta"});
            }else if(!response.active){
                res.status(401).send({msg: "Usuario no autorizado"});
            }else{
                //como la contraseña es correcta envío los tokens
                res.status(200).send({
                    access: jwt.createAccesToken(response),
                    refresh: jwt.createRefreshToken(response)
                })
            }
        })
    } catch (error) {
        res.status(500).send({msg: "Error del servidor"});
    }
}

//esto todavía no lo entiendo
async function refreshAccessToken(req, res){
    const {token} = req.body;

    if(!token) res.status(400).send({msg : "Token requerido"});

    const {user_id} = jwt.decoded(token);

    try{
        const response = await User.findOne({_id: user_id});
        res.status(200).send({
            access: jwt.createAccesToken(response),
        });
    }catch(err){
        res.status(500).send({msg : "Error del servidor"})
    }
}

module.exports = {
    register, login, refreshAccessToken
}