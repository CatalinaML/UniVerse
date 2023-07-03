const express = require("express");
const multipart = require("connect-multiparty");
const authController = require("../controllers/Auth");

const md_upload = multipart({ uploadDir: "./uploads/avatar"});

const api = express.Router();

api.post("/auth/register", [md_upload], authController.register);
api.post("/auth/login", authController.login);
//se usa en el reLogin
api.post("/auth/refresh_access_token", authController.refreshAccessToken);

module.exports = api;