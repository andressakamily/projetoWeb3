const express = require("express");
const routes = express.Router();
const UsuarioController = require("../controllers/UsuarioController");
const auth = require("../middlewares/usuarioAuth");

routes.post("/usuarios", UsuarioController.cadastrar);

routes.get("/usuarios/cadastrar/:id?", UsuarioController.cadastrarGet);

routes.post("/usuarios/login", UsuarioController.loginPost);

routes.get("/usuarios/login", UsuarioController.loginGet);

routes.get("/usuarios/logout", UsuarioController.logout);

routes.get("/usuarios/", auth, UsuarioController.listar);

routes.get("/usuarios/remover/:id", auth, UsuarioController.remover);

routes.get("/usuarios/:id?", auth, UsuarioController.detalhar);


module.exports = routes;