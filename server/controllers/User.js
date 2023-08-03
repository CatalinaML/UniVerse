const bcrypt = require("bcryptjs");

const User = require("../models/User");

//PROMISES
const fs = require("fs").promises;

//requieren autenticacion
//UPDATE

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  //actualizacion de contraseña
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);
  } else {
    delete userData.password;
  }

  //avatar
  if (req.files.avatar) {
    let imagePath = "";

    if (req.files.avatar && req.files.avatar.size > 0) {
      const filePath = req.files.avatar.path;
      const fileSplit = filePath.split("\\");

      imagePath = `${fileSplit[1]}/${fileSplit[2]}`;
    }

    if (imagePath) {
      userData.avatar = imagePath;
    } else {
      userData.avatar = null;
      await fs.unlink(req.files.avatar.path); //Se me estaba guardando un archivo vacío igual, acá no prevengo que no se guarde, pero por lo menos lo borro
    }
  }

  try {
    // Verificar si el username o el email ya están en uso antes de realizar la actualización
    const existingUser = await User.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
      _id: { $ne: id }, // Excluir el usuario actual de la búsqueda
    });

    if (existingUser) {
      // Enviar una respuesta con un mensaje indicando que el username o el email ya están en uso
      return res.status(409).send({ msg: "Username inhabilitado" });
    }

    const response = await User.findByIdAndUpdate(id, userData, { new: true });
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ msg: "Error del servidor" });
  }
}
//GETME
async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);
  if (response) {
    res.status(200).send(response);
  } else {
    res.status(400).send({ msg: "Usuario no encontrado" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).send({ msg: "Usuario eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error en la eliminación" });
  }
}

//funcion auxiliar
async function getCurrentUser(req, res) {
  const { user_id } = req.user;

  return await User.findById(user_id);
}

/**SEGUIR / DEJAR DE SEGUIR */

async function followUnfollow(req, res) {
  const { id } = req.params; //id de quien quiero seguir
  const { user_id } = req.user; //id del usuario en sesión

  try {
    const user = await User.findById(id);
    const currentUser = await User.findById(user_id);

    const updateFollowers = [...user.followers, user_id];
    const updateFollow = [...currentUser.follow, id];

    if (user.followers.includes(user_id)) {
      await User.updateOne(
        { _id: user._id },
        { $pull: { followers: user_id } }
      );

      await User.updateOne(
        { _id: currentUser._id },
        { $pull: { follow: user._id } }
      );

      res.status(200).send({ msg: "Unfollow" });
    } else {
      user.followers = updateFollowers;
      currentUser.follow = updateFollow;

      await user.save();
      await currentUser.save();

      res.status(200).send({ msg: "Follow" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  try {
    const response = await User.findById(id);

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

module.exports = {
  updateUser,
  getMe,
  deleteUser,
  getCurrentUser,
  followUnfollow,
  getUser,
};
