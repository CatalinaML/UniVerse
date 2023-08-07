const Post = require("../models/Post");
const Comment = require("../models/Comment");
const fs = require("fs").promises;
const User = require("../models/User");

//necesitan autenticacion
async function createPost(req, res) {
  const { user_id } = req.user;
  const { title, content } = req.body;
  const today = new Date();

  const user = await User.findById(user_id);

  const post = new Post({
    title,
    content,
    create_date: today,
    author: user.username,
    id_author: user_id,
    avatar_author: user.avatar,
    likes: [],
  });

  //imagen del post
  if (req.files.miniature) {
    let imagePath = "";

    if (req.files.miniature && req.files.miniature.size > 0) {
      const filePath = req.files.miniature.path;
      const fileSplit = filePath.split("\\");

      imagePath = `${fileSplit[1]}/${fileSplit[2]}`;
    }

    if (imagePath) {
      post.miniature = imagePath;
    } else {
      post.miniature = null;
      await fs.unlink(req.files.avatar.path); //Se me estaba guardando un archivo vacío igual, acá no prevengo que no se guarde, pero por lo menos lo borro
    }
  }

  try {
    await post.save();
    res.status(200).send({ msg: "Post creado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al crear post" });
  }
}

async function updatePost(req, res) {
  const { id } = req.params;
  const postData = req.body;

  //manejo de imagen
  if (req.files.miniature) {
    let imagePath = "";

    if (req.files.miniature && req.files.miniature.size > 0) {
      const filePath = req.files.miniature.path;
      const fileSplit = filePath.split("\\");

      imagePath = `${fileSplit[1]}/${fileSplit[2]}`;
    }

    if (imagePath) {
      postData.miniature = imagePath;
    } else {
      postData.miniature = null;
      await fs.unlink(req.files.avatar.path); //Se me estaba guardando un archivo vacío igual, acá no prevengo que no se guarde, pero por lo menos lo borro
    }
  }

  try {
    const response = await Post.findByIdAndUpdate(id, postData, { new: true });
    res.status(200).send({ response });
  } catch (error) {
    res.status(400).send({ msg: "Error de actualizacion" });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);
    res.status(200).send({ msg: "Post eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar" });
  }
}

async function getMyPosts(req, res) {
  const { username } = req.params;
  const { page = 1, limit = 6 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { create_date: "desc" },
  };

  try {
    const myPosts = await Post.paginate({ author: username }, options);
    res.status(200).send(myPosts);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener posts" });
  }
}

async function getFollowPost(req, res) {
  const { page = 1, limit = 6 } = req.query;
  const { user_id } = req.user;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { create_date: "desc" },
  };

  try {
    const user = await User.findById(user_id);
    let mergedPosts = [];

    if (user.follow.length > 0) {
      for (const follower of user.follow) {
        const posts = await Post.paginate({ id_author: follower }, options);
        mergedPosts.push(posts);
      }
      res.status(200).send(mergedPosts);
    } else {
      res.status(409).send({ msg: "No sigues a nadie todavía" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}
//no necesitan autenticacion
//BUSCAR
async function searchPost(req, res) {
  const { page = 1, limit = 6 } = req.query;
  const { search } = req.body;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const regex = new RegExp(search, "i");
  /*La condición $regex permite realizar una búsqueda basada en una expresión regular.
        Una expresión regular es una secuencia de caracteres que define un patrón de búsqueda.
        En el caso de la búsqueda por título o autor,utilizamos la expresión regular para 
        buscar coincidencias parciales en el campo correspondiente.
        */

  try {
    const response = await Post.paginate(
      { $or: [{ title: regex }, { author: regex }] },
      options
    );

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ msg: "Post no encontrado" });
  }
}

//OBTENER
async function getPosts(req, res) {
  const { page = 1, limit = 6 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { create_date: "desc" },
  };

  try {
    const response = await Post.paginate({}, options);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los posts" });
  }
}

async function getPost(req, res) {
  const { id } = req.params;

  try {
    const response = await Post.findOne({ _id: id });

    if (!response) {
      res.status(400).send({ msg: "No se pudo encontrar el post" });
    } else {
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function getUserPost(req, res) {
  const { page = 1, limit = 6 } = req.query;
  const { id } = req.params;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { create_date: "desc" },
  };

  try {
    const response = await Post.paginate({ id_author: id }, options);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

//ORDENAR
async function sortByPopularity(req, res) {
  const { page = 1, limit = 6 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { likeCount: -1 },
  };
  try {
    const posts = await Post.paginate({}, options);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los posts" });
  }
}

//INTERACTUAR
async function likePost(req, res) {
  const { id } = req.params; // ID del post al que se le dará o quitará like
  const { user_id } = req.user; // ID del usuario que está dando o quitando el like

  try {
    // Buscar el post en la base de datos por su ID
    const post = await Post.findById(id);

    if (!post) {
      // Si el post no existe, retornar un error 404 (No encontrado)
      return res.status(404).send({ msg: "Post no encontrado" });
    }

    // Comprobar si el usuario ya ha dado like al post
    const userLikedPost = post.likes.includes(user_id);

    if (userLikedPost) {
      // Si el usuario ya ha dado like al post, quitar su ID del arreglo de likes
      await Post.updateOne({ _id: post._id }, { $pull: { likes: user_id } });

      // Actualizar el contador likeCount
      post.likeCount = post.likes.length - 1;
      await post.save();

      return res.status(200).send({ msg: "Like eliminado correctamente" });
    } else {
      // Si el usuario no ha dado like previamente, agregar su ID al arreglo de likes
      post.likes.push(user_id);

      // Actualizar el contador likeCount
      post.likeCount = post.likes.length;
      await post.save();

      return res.status(200).send({ msg: "Like agregado correctamente" });
    }
  } catch (error) {
    // Si ocurre un error en el proceso, retornar un error 500 (Error interno del servidor)
    res.status(500).send({ msg: "Error al dar like al post" });
  }
}

module.exports = {
  getMyPosts,
  sortByPopularity,
  createPost,
  updatePost,
  deletePost,
  searchPost,
  getPosts,
  likePost,
  getPost,
  getUserPost,
  getFollowPost,
};
