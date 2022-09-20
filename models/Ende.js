//importando o Sequelize
const Sequelize = require('sequelize') 
//importa o dataType objeto que da acesso a todos tipos de dados do banco se é uma string se é um inteiro
const { DataTypes } = require('sequelize') 
//chamar a conexao com banco pois vou ter uma operação aqui
const db = require('../db/conex')
//chamndo o modulo de user
const User = require('./User')

const Ende = db.define('Ende',{
 
    rua:{
        type: DataTypes.STRING,
       required: true,
    },
    bairro:{
        type: DataTypes.STRING,
       required: true,
    },
    numero:{
        type: DataTypes.STRING,
       required: true,
    },
    cep:{
        type: DataTypes.STRING,
       required: true,
    },
    
});

User.hasMany(Ende)
Ende.belongsTo(User);     //estou dizendo que um endereço pertence a um usuario com metodo belongsTo

module.exports = Ende;