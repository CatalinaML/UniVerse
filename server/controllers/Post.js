const Post = require("../models/Post");
const fs = require("fs").promises;
const User = require("../models/User");

//necesitan autenticacion
async function createPost(req, res){
    const {user_id} = req.user;
    const {title, content} = req.body;
    const today = new Date();

    const user = await User.findById(user_id);

    const post = new Post({
        title,
        content,
        create_date: today,
        author: user.username,
        avatar_author: user.avatar,
        likes: [],
    })

    //imagen del post
    if(req.files.miniature){
        let imagePath = "";

        if(req.files.miniature && req.files.miniature.size > 0){
            const filePath = req.files.miniature.path;
            const fileSplit = filePath.split("\\");
        
            imagePath = `${fileSplit[1]}/${fileSplit[2]}`;
        }

        if(imagePath){
            post.miniature = imagePath;
        }else{
            post.miniature = null;
            await fs.unlink(req.files.avatar.path); //Se me estaba guardando un archivo vacío igual, acá no prevengo que no se guarde, pero por lo menos lo borro
        }
    }

    try {
        const response = await post.save();
        res.status(200).send({msg: "Post creado"});
    } catch (error) {
        res.status(400).send({msg: "Error al crear post"});
    }
}

async function updatePost(req, res){
    const {id} = req.params;
    const postData = req.body;

    //manejo de imagen
    if(req.files.miniature){
        let imagePath = "";

        if(req.files.miniature && req.files.miniature.size > 0){
            const filePath = req.files.miniature.path;
            const fileSplit = filePath.split("\\");
        
            imagePath = `${fileSplit[1]}/${fileSplit[2]}`;
        }

        if(imagePath){
            postData.miniature = imagePath;
        }else{
            postData.miniature = null;
            await fs.unlink(req.files.avatar.path); //Se me estaba guardando un archivo vacío igual, acá no prevengo que no se guarde, pero por lo menos lo borro
        }
    }

    try {
        const response = await Post.findByIdAndUpdate(id, postData, {new:true});
        res.status(200).send({response});
    } catch (error) {
        res.status(400).send({msg: "Error de actualizacion"});
    }
}

async function deletePost(req, res){
    const {id} = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.status(200).send({msg: "Post eliminado"});
    } catch (error) {
        res.status(400).send({msg: "Error al eliminar"});
    }
}


//no necesitan autenticacion
async function searchPost(req, res){
    const {page = 1, limit = 6} = req.query;
    const {search} = req.body;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }

    const regex = new RegExp(search, "i");
    /*La condición $regex permite realizar una búsqueda basada en una expresión regular.
        Una expresión regular es una secuencia de caracteres que define un patrón de búsqueda.
        En el caso de la búsqueda por título o autor,utilizamos la expresión regular para 
        buscar coincidencias parciales en el campo correspondiente.
        */


    try {
        

        const response = await Post.paginate(
            { $or: [{ title: regex }, { author: regex }] }, options
        );

        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({msg: "Post no encontrado"});
    }
}

async function getPosts(req, res){
    const {page = 1, limit = 6} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {create_date: 'desc'}
    }

    try {
        const response = await Post.paginate({}, options);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({msg: "Error al obtener los posts"});
    }
}

async function getPost(req, res){
    const {id} = req.params;

    try {
        const response = await Post.findOne({_id: id});

        if(!response){
            res.status(400).send({msg: "No se pudo encontrar el post"});
        }else{
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(500).send({msg: "Error del servidor"});
    }
}

/**
 * async function sortByCreationDate(req, res){
    console.log("???");
    const {page = 1, limit = 9} = req.query;


    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        //sort: {create_date: "desc"}
    }

    try {
        const posts = await Post.paginate({}, options);
        res.status(200).send(posts);
      } catch (error) {
        res.status(400).send({ msg: "Error al obtener los posts" });
      }
}
 * 
 */

async function sortByPopularity(req, res){
    const {page = 1, limit = 6} = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {likes: -1}
    }
    try {
        const posts = await Post.paginate({}, options);
        res.status(200).send(posts);
      } catch (error) {
        res.status(400).send({ msg: "Error al obtener los posts" });
      }
}

async function likePost(req, res) {
    const { id } = req.params;
    const { user_id } = req.user;
  
    try {
      const post = await Post.findById(id);
  
      // Crear un nuevo arreglo con el user_id agregado al final del arreglo de likes
      const updatedLikes = [...post.likes, user_id];

      if(post.likes.includes(user_id)){
        //Busco el post y elimino el id (saca el like)
        await Post.updateOne(
            { _id: post._id },
            { $pull: { likes: user_id } }
          );

          res.status(200).send({mas: "Like eliminado correctamente"});
      }else{
        // Actualizar el campo likes del post con el nuevo arreglo
        post.likes = updatedLikes;
        await post.save();
          
        res.status(200).send({ msg: "Like agregado correctamente" });
      }

    } catch (error) {
      res.status(500).send({ msg: "Error al dar like al post" });
    }
}

async function getMyPosts(req, res){
    const {username} = req.params;
    const {page = 1, limit = 6} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {create_date: 'desc'}
    }

    try {
        const myPosts = await Post.paginate({author: username}, options);
        res.status(200).send(myPosts);
    } catch (error) {
        res.status(400).send({msg: "Error al obtener posts"});
    }
}

module.exports = {
     getMyPosts ,sortByPopularity ,createPost, updatePost, deletePost, searchPost, getPosts, likePost, getPost
}