const Cliente = require("../Cliente");
const vetorClientes = [];

class ClienteController{
    static cadastrar(req, res){
        const cliente = req.body;
        vetorClientes.push(new Cliente(cliente.id, cliente.nome, cliente.idade));
        res.redirect("/clientes?s=1");
    }

    static cadastrarGet(req, res){
        res.render("cliente/cadastrar");
    }

    static listar(req, res){
        const salvo = req.query.s;
        res.render("cliente/relatorio", {vetorClientes, salvo});
    }

    static detalhar(req, res){
        const id = req.params.id;
        let encontrou = false;
        for (const cliente of vetorClientes) {
           if (id == cliente.id){
             encontrou = true;
            res.render("cliente/detalhar", {cliente});
            break;
           }
         }  
         if(encontrou == false){
           res.send("Cliente não encontrado");
         } 
    }
}

module.exports = ClienteController;