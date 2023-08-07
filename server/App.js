const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./utils/constants");

//import archivos con las rutas
const authRoutes = require("./router/Auth");
const userRoutes = require("./router/User");
const postRoutes = require("./router/Post");
const commentRoutes = require("./router/Comment");

const app = express();

//CONFIGURES
//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Static folder
app.use(express.static("uploads"));

//Header HTTP - CORS
app.use(cors());

//configuracion de las rutas para express
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
app.use(`/api/${API_VERSION}`, commentRoutes);

module.exports = app;
