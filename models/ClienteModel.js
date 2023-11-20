    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;
    const clienteSchema = Schema({

        id: Number,
        nome: String,
        idade: Number
    
     });

module.exports = mongoose.model("Cliente", clienteSchema);