//importando o Sequelize
const Sequelize = require('sequelize') 
//importa o dataType objeto que da acesso a todos tipos de dados do banco se é uma string se é um inteiro
const { DataTypes } = require('sequelize') 
//chamar a conexao com banco pois vou ter uma operação aqui
const db = require('../db/conex')


//agora vamos definir o model
const User = db.define('User', {
    id: {   
        type: Sequelize.INTEGER, //declaro o tipo
        autoIncrement: true,    // declaro que é auto incremento
        allowNull: false,       // declaro que não pode ser null
        primaryKey: true,       // defino como chave primaria
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: { 
        type: Sequelize.STRING, 
        allowNull: false,
    },
    cpf: { type: 
        Sequelize.STRING,
        allowNull: false,
    },
    ocupacao:{
        type: Sequelize.STRING,
        required: true ,       //que o campo seja prenchido 
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
    
})

module.exports = User;