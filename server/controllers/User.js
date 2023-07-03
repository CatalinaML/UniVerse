const bcrypt = require("bcryptjs");

const User = require("../models/User");

//PROMISES
const fs = require("fs").promises;

//requieren autenticacion
//UPDATE

async function updateUser(req, res){
    const {id} = req.params;
    const userData = req.body;

    //actualizacion de contraseña
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        userData.password = bcrypt.hashSync(userData.password, salt);
    }else{
        delete userData.password;
    }
    
    //avatar
    if(req.files.avatar){
        let imagePath = "";
    
        if(req.files.avatar && req.files.avatar.size > 0){
            const filePath = req.files.avatar.path;
            const fileSplit = filePath.split("\\");
        
            imagePath = `${fileSplit[1]}/${fileSplit[2]}`;
        }

        if(imagePath){
            userData.avatar = imagePath;
        }else{
            userData.avatar = null;
            await fs.unlink(req.files.avatar.path); //Se me estaba guardando un archivo vacío igual, acá no prevengo que no se guarde, pero por lo menos lo borro
        }
    }

    try {
        const response = await User.findByIdAndUpdate(id, userData, {new: true});
        res.status(200).send({msg: "Actualización correcta"});
    } catch (error) {
        res.status(400).send({msg: "Error del servidor"});
    }
}
//GETME
async function getMe (req,res){
    const {user_id} = req.user;

    const response = await User.findById(user_id);
    if(response){
        res.status(200).send(response);
    }else{
        res.status(400).send({msg: "Usuario no encontrado"});
    }
}

async function deleteUser(req, res){
    const {id} = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).send({msg: "Usuario eliminado"});
    } catch (error) {
        res.status(400).send({msg: "Error en la eliminación"});
    }
}

//funcion auxiliar
async function getCurrentUser(req, res){
    const {user_id} = req.user;

    return await User.findById(user_id);
}

module.exports = {
    updateUser,  getMe, deleteUser, getCurrentUser
}
