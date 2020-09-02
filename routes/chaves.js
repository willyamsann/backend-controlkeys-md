const express = require('express');
const app = require('../app');
const router = express.Router();

const login = require('../middleware/login');
const mysql = require('../mysql').pool;

//GET CHAVES GERAL
router.get('/', login,(req,res,next) =>{
    mysql.getConnection((error,conn)=>{
        conn.query('select * from chaves;',(error,results,filds)=>{
            conn.release();

            if(error){
                return res.status(500).send({
                    error: error})}
                    
            const response = {
                quantidade: results.length,
                Chaves: results.map(prod =>{
                    return {
                        id: prod.id,
                        cpf: prod.CPF,
                        nome: prod.nome,
                        telefone: prod.telefone,
                        empresa: prod.empresa,
                        empreendimento:prod.empreendimento,
                        apartamento: prod.apartamento,
                        data: prod.data,
                        data_vistoria: prod.data_vistoria,
                        p1:prod.p1,
                        p2:prod.p2,
                        p3:prod.p3,
                        p4:prod.p4,
                        p5:prod.p5,
                        p6:prod.p6,
                        p7:prod.p7,
                        p8:prod.p8,
                        p9:prod.p9,
                        responsavel_chave: prod.responsavel_chave,
                        local: prod.local,
                        status:prod.status,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retornou todas as Chaves liberadas',
                            url: 'http://localhost:3000/chaves/' + prod.id
                        }
                    }
                })
            }
            return res.status(200).send(response)
            

        })
    })
  
});
//ROTA POST CHAVES - criar chave para o corretor
router.post('/',login,(req,res,next) =>{
    mysql.getConnection((error,conn)=>{
    conn.query(
        'INSERT INTO chaves  (CPF,nome,telefone,empresa,empreendimento,apartamento,data)  VALUES(?,?,?,?,?,?,?)',
        [req.body.cpf,req.body.nome,req.body.telefone,req.body.empresa,req.body.empreendimento,
        req.body.apartamento,req.body.data],
        (error,results,field) =>{
            conn.release();
            if(error) { return res.status(500).send({error: error})}
            const response = {
                mensagem: 'Chave Liberada',
                chaveCriada: {
                    id: results.id,
                    nome:req.body.nome,
                    apartamento: req.body.apartamento,
                    request:{
                        tipo: 'SET',
                        descricao: 'Inserio novo apartamento',
                        url: 'http://localhost:3000/chave'
                    }
                }
            }
            res.status(201).send(response)
        }
    )
    });
});

//GET UNICA CHAVE
router.get('/:id_corretor', (req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        conn.query('select * from chaves WHERE id = ?;',
        [req.params.id_corretor],
        (error,results,filds)=>{
            conn.release();

            if(error) { return res.status(500).send({error: error})}
            if(results.length == 0){
                return res.status(404).send({
                    mensagem: "Não encontrado Não encontrado chave"
                })
            }
                const response = {
                    mensagem: 'Get Id Chave',
                    chave: {
                        id: results[0].id,
                        cpf: results[0].CPF,
                        nome: results[0].nome,
                        telefone: results[0].telefone,
                        empresa: results[0].empresa,
                        empreendimento:results[0].empreendimento,
                        apartamento: results[0].apartamento,
                        data: results[0].data,
                        data_vistoria: results[0].data_vistoria,
                        p1:results[0].p1,
                        p2:results[0].p2,
                        p3:results[0].p3,
                        p4:results[0].p4,
                        p5:results[0].p5,
                        p6:results[0].p6,
                        p7:results[0].p7,
                        p8:results[0].p8,
                        p9:results[0].p9,
                        responsavel_chave: results[0].responsavel_chave,
                        local: results[0].local,
                        status:results[0].status,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retorna todas as chaves',
                            url: 'http://localhost:3000/chaves'
                        }
                    }
                }
                res.status(201).send(response)

        })
    })

})
//get chaves especifa corretor
router.get('/chaves_corretor/:id_cpf', login,(req,res,next) =>{
    mysql.getConnection((error,conn)=>{
        conn.query('select * from chaves WHERE CPF = ?;',[req.params.cpf],(error,results,filds)=>{
            conn.release();

            if(error){
                return res.status(500).send({
                    error: error})}
                    
            const response = {
                quantidade: results.length,
                Chaves: results.map(prod =>{
                    return {
                        id: prod.id,
                        cpf: prod.CPF,
                        nome: prod.nome,
                        telefone: prod.telefone,
                        empresa: prod.empresa,
                        empreendimento:prod.empreendimento,
                        apartamento: prod.apartamento,
                        data: prod.data,
                        data_vistoria: prod.data_vistoria,
                        p1:prod.p1,
                        p2:prod.p2,
                        p3:prod.p3,
                        p4:prod.p4,
                        p5:prod.p5,
                        p6:prod.p6,
                        p7:prod.p7,
                        p8:prod.p8,
                        p9:prod.p9,
                        responsavel_chave: prod.responsavel_chave,
                        local: prod.local,
                        status:prod.status,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retornou todas as Chaves liberadas',
                            url: 'http://localhost:3000/chaves/' + prod.id
                        }
                    }
                })
            }
            return res.status(200).send(response)
            

        })
    })
  
});
//REALIZAR VISTORIA

router.patch('/',login,(req,res,next) =>{
    mysql.getConnection((error,conn)=>{
        conn.query(
            `UPDATE chaves
                SET p1 = ?,
                    p2 = ?,
                    p3 = ?,
                    p4 = ?,
                    p5 = ?,
                    p6 = ?,
                    p7 = ?,
                    p8 = ?,
                    p9 = ?,
                    data_vistoria = Now(),
                    responsavel_chave = ?,
                    local = ?,
                WHERE id = ?
                 and CPF = ?`,
            [req.body.p1,
             req.body.p2,
             req.body.p3,
             req.body.p4,
             req.body.p5,
             req.body.p6,
             req.body.p7,
             req.body.p8,
             req.body.p9,
             req.body.data_vistoria,
             req.body.responsavel_chave,
             req.body.local,
             req.body.id,
             req.body.cpf],
            (error,results,field) =>{
                conn.release();

                if(error) { return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Vistoria Realizada',
                    apartamentoModificado: {
                        id: req.body.id,
                        cpf: req.body.cpf,
                        request:{
                            tipo: 'PATCH',
                            descricao: 'Retorma chaves',
                            url: 'http://localhost:3000/chaves/chaves_corretor/' + req.body.cpf
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
})
//mudar status cheva entregue

router.patch('/',login,(req,res,next) =>{
    mysql.getConnection((error,conn)=>{
        conn.query(
            `UPDATE estoquegeral
                SET STATUS            = ?,
                WHERE id = ?`,
            [req.body.status,
             req.body.id_apt],
            (error,results,field) =>{
              
                if(error) { return res.status(500).send({error: error})}
                if(results.length < 1){
                    res.status(409).send({mensagem: 'Apartamento não encontrado'})
                }else{

                    mysql.getConnection((error,conn)=>{
                        conn.query(
                            `UPDATE chaves
                                SET status = ?,
                                WHERE id = ?
                                 and CPF = ?`,
                            [
                             req.body.status,
                             req.body.id,
                             req.body.cpf],
                            (error,results,field) =>{
                                conn.release();
                
                                if(error) { return res.status(500).send({error: error})}
                                const response = {
                                    mensagem: 'Vistoria Realizada',
                                    apartamentoModificado: {
                                        id: req.body.id,
                                        cpf: req.body.cpf,
                                        request:{
                                            tipo: 'PATCH',
                                            descricao: 'Retorma chaves',
                                            url: 'http://localhost:3000/chaves/'
                                        }
                                    }
                                }
                                res.status(202).send(response)
                            }
                        )
                    })
                }
                
            }
        )
    });
})

//deleta chave
router.delete('/',login,(req,res,next) =>{
    mysql.getConnection((error,conn)=>{
        conn.query(
            `DELETE FROM chaves WHERE id = ?`,
            [req.body.id],
            (error,results,field) =>{
                conn.release();

                if(error){
                    res.status(500).json({
                        error:error,
                        response:null
                    })
                }else{
                    res.status(202).json({
                        mensagem: 'Chave Deletada',
                        id: results.insertID
                    });

                }
            }
        )
    })    
})


module.exports = router;