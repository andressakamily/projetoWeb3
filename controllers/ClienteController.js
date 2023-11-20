const ClienteModel = require("../models/ClienteModel");

class ClienteController{
    static async cadastrar(req, res){
        if(req.body._id == ""){//cadastrar
    const novoCliente = new ClienteModel({
        id: req.body.id,
        nome: req.body.nome,
        idade: req.body.idade
      });
      await novoCliente.save();
        res.redirect("/clientes?s=1");
        }else{//att
            await ClienteModel.findOneAndUpdate({_id: req.body._id},
                {
                    nome: req.body.nome,
                    idade: req.body.idade
                });
            res.redirect("/clientes?s=3");
        }
    }

    static async cadastrarGet(req, res){
        const id = req.params.id;
        let cliente = {};
        if(id != undefined){//att
            cliente = await ClienteModel.findOne({id});
        }
         res.render("cliente/cadastrar", {cliente});
    }

    static async listar(req, res){
        const status = req.query.s;
        const vetorClientes = await ClienteModel.find();
        res.render("cliente/relatorio", {vetorClientes, status});
    }

    static async detalhar(req, res){
        const cliente = await ClienteModel.findOne({id: req.params.id});
        res.render("cliente/detalhar", {cliente});
    }

    static async remover(req, res){
        await ClienteModel.findOneAndDelete({id: req.params.id});
        res.redirect("/clientes?s=2");
    }
}

module.exports = ClienteController;