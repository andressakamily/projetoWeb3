const UsuarioModel = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");

class UsuarioController{
    static async cadastrar(req, res){
        
        if(req.body._id == ""){//cadastrar
            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(req.body.senha,salt);
            const usuario=  await UsuarioModel.findOne({email: req.body.email});
        if (usuario == null){
    const novoUsuario = new UsuarioModel({
        nome: req.body.nome,
        email: req.body.email,
        senha: hash
      });
       
      await novoUsuario.save();
        res.redirect("/usuarios?s=1");
            }else{
                res.redirect(`/usuarios/cadastrar?s=1&nome=${req.body.nome}&email=${req.body.email}`);
            }
        }else{//atualizar
            const usuarioAtual = await UsuarioModel.findOne({_id : req.body._id});
            const usuarioNovo = await UsuarioModel.findOne({email : req.body.email});
            if(usuarioNovo == null || usuarioAtual.email == req.body.email){
                await UsuarioModel.findOneAndUpdate({_id: req.body._id},
                {

                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                });
            res.redirect("/usuarios?s=3");
        }else{
        res.redirect(`/usuarios/cadastrar?s=1&nome=${req.body.nome}&email=${req.body.email}`);
        }
    }
} 
    static  loginGet(req, res){
        const status = req.query.s;
        res.render("usuario/login", {status});
} 

static  logout(req, res){
    req.session.usuario = null;
    res.redirect("/usuarios/login");
} 

    static async loginPost(req, res){
        const usuario = await UsuarioModel.findOne({email: req.body.email});
    if(usuario != null){
        if(bcryptjs.compareSync(req.body.senha, usuario.senha)){//email e senha validas
            req.session.usuario = usuario.email;
            res.redirect("/");
    }else{//senha invalida
        res.redirect("/usuarios/login?s=1");
    }
}else{//email invalido
    res.redirect("/usuarios/login?s=1");
}
    
}

    static async cadastrarGet(req, res){
        const id = req.params.id;
        const status = req.query.s;
        const nome = req.query.nome;
        const email = req.query.email;
        let usuario = {
            nome: req.query.nome,
            email: req.query.email
        };
        if(id != undefined){//att
            usuario = await UsuarioModel.findOne({_id: id});
        }
         res.render("usuario/cadastrar", {usuario, status});
    }

    static async listar(req, res){
        const status = req.query.s;
        const vetorUsuarios = await UsuarioModel.find();
        res.render("usuario/relatorio", {vetorUsuarios, status});
    }

    static async detalhar(req, res){
        const usuario = await UsuarioModel.findOne({_id: req.params.id});
        res.render("usuario/detalhar", {usuario});
    }

    static async remover(req, res){
        await UsuarioModel.findOneAndDelete({_id: req.params.id});
        res.redirect("/usuarios?s=2");
    }
}

module.exports = UsuarioController;