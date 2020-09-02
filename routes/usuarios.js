const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('../mysql').pool;
const jwt = require('jsonwebtoken');

//ROTA CADASTRO POST

router.post('/cadastro',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error) { return res.status(500).send({error:error})}
        conn.query('SELECT * FROM tab_user WHERE CPF = ?', [req.body.cpf], 
        (error,results) =>{
            if(error){ return res.status(500).send({ error: error})}
            if(results.length > 0){
                res.status(409).send({mensagem: 'Usuario Ja cadastrado'})
            }else{
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) =>{
                    if(errBcrypt){
                        return res.status(500).send({
                            error: errBcrypt
                        })
        
                    }
                    conn.query('INSERT INTO tab_user (CPF,nome,empresa,telefone,email,senha,tipo_usuario,status) VALUES(?,?,?,?,?,?,?,?)',
                    [req.body.cpf,req.body.nome,req.body.empresa,req.body.telefone,req.body.email,hash,req.body.tipo_usuario,req.body.status],
                    (error, results) =>{
                        conn.release();
                         if(error){ return res.status(500).send({ error: error})}
                         response = {
                            mensagem: 'Usuario Criado com Sucesso',
                            usuarioCriado:{
                                id_usuario: results.insertId,
                                email: req.body.email,
                                nome: req.body.nome,
                            }
                         }
                         return res.status(201).send(response);
                    })
                })
                
            }
        })
    })    
})

//ROTA DE LOGIN
router.post('/login', (req,res, next) =>{
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({error:error})}
        const query = 'SELECT * FROM tab_user WHERE CPF = ?';
        conn.query(query,[req.body.cpf],(error,results,fields)=>{
            conn.release();
            if(error) {return res.status(500).send({error: error})}
            if(results.length < 1){
                return res.status(401).send({mensagem: 'Falha não Autenticacao 1'})
            }
            bcrypt.compare(req.body.senha,results[0].senha,(err, results) =>{
                if(err){return res.status(401).send({mensagem: 'Falha não Autenticacao 2'})}
               
                if(results){
                    const token = jwt.sign({
                        cpf: results[0].CPF,
                        nome: results[0].nome,
                         },
                     process.env.JWT_KEY,
                     {
                         expiresIn: "1h"
                     });
                    return res.status(200).send({
                     
                        mensagem: 'Autenticado com Sucesso',
                        token: token, 
                    });
                }
                return res.status(401).send({mensagem: 'Falha não Autenticacao 3'})

            } )
        })
    })
})

module.exports = router;