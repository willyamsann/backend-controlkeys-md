const express = require('express');
const app = require('../app');
const router = express.Router();
const login = require('../middleware/login');
const mysql = require('../mysql').pool;

//ROTA APARTAMENTO GERAL
router.get('/', login, (req,res,next) =>{
    mysql.getConnection((error,conn)=>{
        conn.query('select * from estoquegeral;',
        (error,results,filds)=>{
            if(error){
                return res.status(500).send({
                    error: error})}
                    
            const response = {
                quantidade: results.length,
                apartamentos: results.map(prod =>{
                    return {
                        id: prod.id,
                        apartamento: prod.APTO,
                        empreendimento: prod.EMPREENDIMENTO,
                        torre: prod.TORRE,
                        tipo: prod.TIPO,
                        status:prod.STATUS,
                        ultima_manutecao: prod.ultima_manutecao,
                        proxima_manutecao: prod.proxima_manutecao,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retornou todas os apartamentos',
                            url: 'http://localhost:3000/apartamento/' + prod.id
                        }
                    }
                })
            }
            return res.status(200).send(response)
            }
        )
        });
  
});

//ROTA INSERIR UM APARTAMENTO
router.post('/',login,(req,res,next) =>{

    const chaves = {
      
    }
    mysql.getConnection((error,conn)=>{
        conn.query(
            'INSERT INTO estoquegeral  (FILIAL,EMPREENDIMENTO,TORRE,TIPOLOGIA,APTO,TIPO,STATUS)  VALUES(?,?,?,?,?,?,?)',
            [req.body.filial,req.body.empreendimento,req.body.torre,req.body.tipologia,req.body.apto,
            req.body.tipo,req.body.status],
            (error,results,field) =>{
                conn.release();
                if(error) { return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Apartamento Incluido',
                    apartamentoCriado: {
                        id: results.id,
                        apartamento: req.body.apto,
                        request:{
                            tipo: 'SET',
                            descricao: 'Inserio novo apartamento',
                            url: 'http://localhost:3000/apartamento'
                        }
                    }
                }
                res.status(201).send(response)
            }
        )
    })
});
//ROTA ID ESPECIFICO APARTAMENTO
router.get('/:id_apt',login, (req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        conn.query('select * from estoquegeral WHERE id = ?;',
        [req.params.id_apt],
        (error,results,filds)=>{
            conn.release();

            if(error) { return res.status(500).send({error: error})}
            if(results.length == 0){
                return res.status(404).send({
                    mensagem: "Não encontrado apartamento"
                })
            }
                const response = {
                    mensagem: 'Get Id Apartamento',
                    apartamento: {
                        id: results[0].id,
                        apartamento: results[0].APTO,
                        torre: results[0].TORRE,
                        tipo: results[0].TIPO,
                        status:results[0].STATUS,
                        ultima_manutecao: results[0].ultima_manutecao,
                        proxima_manutecao: results[0].proxima_manutecao,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retorna todos os apartamentos',
                            url: 'http://localhost:3000/apartamento'
                        }
                    }
                }
                res.status(201).send(response)

        })
    })
})

router.patch('/',login,(req,res,next) =>{
    mysql.getConnection((error,conn)=>{
        conn.query(
            `UPDATE estoquegeral
                SET STATUS            = ?,
                    DATA_VENDA        = ?,
                    ultima_manutecao  = ?,
                    proxima_manutecao = ?
                WHERE id = ?`,
            [req.body.status,
             req.body.data,
             req.body.manuntecao,
             req.body.proxima,
             req.body.id_apt],
            (error,results,field) =>{
                conn.release();

                if(error) { return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Apartamento Modificado',
                    apartamentoModificado: {
                        id: req.body.id_apt,
                        status: req.body.status,
                        request:{
                            tipo: 'PATCH',
                            descricao: 'Retorna apartamento',
                            url: 'http://localhost:3000/apartamento/' + req.body.id_apt
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
})
//EXCLUIR APARTAMENTO - ADM
router.delete('/',login,(req,res,next) =>{
    mysql.getConnection((error,conn)=>{
        conn.query(
            `DELETE FROM estoquegeral WHERE id = ?`,
            [req.body.id_apt],
            (error,results,field) =>{
                conn.release();

                if(error){
                    res.status(500).json({
                        error:error,
                        response:null
                    })
                }else{
                    res.status(202).json({
                        mensagem: 'Apartmento Deletado',
                        id: results.insertID
                    });

                }
            }
        )
    })    
})


module.exports = router;