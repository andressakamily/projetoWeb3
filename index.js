const express = require('express');
const res = require('express/lib/response');
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static ("public"));
const session = require("express-session");
require('dotenv/config');

app.use(session({
   secret:'ifpe',
   saveUninitialized: false,
   resave: false
}));


const clienteRoutes = require("./routes/ClienteRoutes");
app.use(clienteRoutes);

const usuarioRoutes = require("./routes/UsuarioRoutes");
app.use(usuarioRoutes);


const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const ClienteModel = require("./models/ClienteModel");


app.get("/", function(req, res){
   if(req.session.usuario != null){//logado
   res.render("index");
   }else{
      res.redirect("/usuarios/login");
   }
    
});

app.use(function(req, res) {
   res.status(404).render("404");
});

app.listen(process.env.PORT, function(){
   console.log("Servidor iniciando");  
});