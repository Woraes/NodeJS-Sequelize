
const express = require('express');
const exphbs = require('express-handlebars');
const { where } = require('sequelize');
const conex = require('./db/conex');

//Aqui estamos importando o model User model
const User = require('./models/User');

const Ende = require('./models/Ende');


const app = express();


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());



app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'))

//form create user
app.get('/users/create', (req, res) => {
    res.render('adduser')
})



//endereço metodo post
app.post('/address/create', async (req, res) =>{

    console.log('teste')
    const UserId = req.body.UserId
    const rua = req.body.rua
    const bairro = req.body.bairro
    const numero = req.body.numero
    const cep = req.body.cep
    

    const ende = {
        UserId: UserId,
        rua: rua,
        bairro: bairro,
        numero: numero,
        cep: cep,
        
    }

     await Ende.create(ende)
     console.log(ende)

     res.redirect(`/users/edit/${UserId}`)

})

// rota post para pegar dados do submit
app.post('/users/create',async (req, res) => { //defino a fun como assincrona com async
    const nome = req.body.nome
    const email = req.body.email
    const cpf = req.body.cpf
    const ocupacao = req.body.ocupacao
    let status = req.body.status  //coloco let pois o valor pode ser alterado

    console.log(status)
    //condição do status que já esta on
    if(status === 'on'){
        status = true
    }else{
        status = false

    }

    console.log(req.body)

    //usando a parte do sequelize para criar user
   await User.create({  //coloco o await para espera a criação do user para poder redirecionar
        nome: nome,
        email: email,
        cpf: cpf,
        ocupacao: ocupacao,
        status: status,
    })

    res.redirect('/')

});



//user individual detalhes
app.get('/users/:id', async (req, res) => {

    const id = req.params.id
    const user = await User.findOne({raw: true, where: {id:id}}) //raw true para vim o array sem muitos dados desnecesarios

    res.render('viewuser', {user})
})


//List
app.get('/list', async (req, res) => {

    const users = await User.findAll({raw: true});

    console.log(users)



    res.render('list', {users: users})
})


//deletar user
app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id
    await User.destroy({where: {id: id}})

    res.redirect('/list')
})

//Editar o usuario
app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id

    try {

    const user = await User.findOne({include: Ende, where: {id: id}})

    res.render('edituser', {user: user.get({palin: true})})

    } catch (error) {
        console.log(error)
    }
})

//Editando user botao editar
app.post('/users/update', async (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const email = req.body.email
    const cpf = req.body.cpf
    const ocupacao = req.body.ocupacao
    let status = req.body.status
    if(status === 'on'){
        status = true
    }else{
        status = false

    }

    const userData = {
        id: id,
        nome: nome,
        email: email,
        cpf: cpf,
        ocupacao: ocupacao,
        status: status,
    }

   await User.update(userData, {where: {id: id}})

   res.redirect('/list')
})

//home
app.get('/', (req, res) => {

    res.render('home')
})




//vamos condicionar a conexão com banco sync(usado mais no desenvolvimento) faz com que as tabelas sejam criadas sempre que não existir
conex
//.sync({force: true})   //recria as tabelas apagando tudo existente
.sync()
.then(() => {
    app.listen(3000);
}).catch((err) => console.log(err))
