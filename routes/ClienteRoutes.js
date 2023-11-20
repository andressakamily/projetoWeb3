const express = require("express");
const routes = express.Router();
const ClienteController = require("../controllers/ClienteController");
const auth = require("../middlewares/usuarioAuth");

routes.post("/clientes", auth, ClienteController.cadastrar);

routes.get("/clientes/cadastrar/:id?", auth, ClienteController.cadastrarGet);

routes.get("/clientes/", auth, ClienteController.listar);

routes.get("/clientes/remover/:id", auth, ClienteController.remover);

routes.get("/clientes/:id?", auth, ClienteController.detalhar);


module.exports = routes;