const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');



const rotaChaves = require('./routes/chaves');

const rotaApartamentos = require('./routes/apartamento');

const rotaUsuarios = require('./routes/usuarios');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/chaves', rotaChaves);
app.use('/apartamento', rotaApartamentos);
app.use('/usuarios', rotaUsuarios);

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization');

     if(req.method === 'OPTIONS'){
         res.header('Access-Control-Allows-Methods', 'PUT,POST,PATCH,DELETE,GET');
         return res.status(200).send({});

         
     }

     next();
})
app.use((req,res,next)=>{
    const erro = new Error("Não encontrado");
    erro.status =404;
    next(erro);
});

app.use((error,req,res,next) =>{    
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
});

module.exports = app;