const express= require('express');
const app=express();
const bobyParser=require('body-parser')


app.use(bobyParser.urlencoded({extended: false}))
app.use(bobyParser.json())

var DB={
    agenda:[
        {
            id:1,
            titulo:'academia',
            descricao:'treinar uma vez por dia',
            data:'10/03/20',
        },
        {
            id:2,
            titulo:'estudar',
            descricao:'estudar um vez por dia',
            data:'10/03/20',
        }
    ]
}
//listando tudo
app.get("/agenda", (req, res)=>{
    res.statusCode=200;
    res.json(DB.agenda)
})

//listando apenas um
app.get("/agenda/:id", (req, res)=>{
    //validando
    if(isNaN(req.params.id)){
        res.send("não é um número")
        res.sendStatus(400)
    }else{
        var id=parseInt(req.params.id);
            var dados=  DB.agenda.find(a=>a.id==id)
            if(dados != undefined){
                res.statusCode=200;
                res.json(dados)
            }else{
                res.sendStatus(404)
            }
    }
})
//post
app.post('/agenda', (req, res)=>{
var {titulo, descricao, data}=req.body

//validando
DB.agenda.push({
    id:3,
    titulo,
    descricao,
    data
})
res.sendStatus(200)
})

//delete
app.delete("/agenda/:id",(req, res)=>{
    if(isNaN(req.params.id)){
        res.send("não é um número")
        res.sendStatus(400)
    }else{
        var id=parseInt(req.params.id);
            var dados=  DB.agenda.find(a=>a.id==id)
            if(dados != undefined){
                res.statusCode=200;
                res.json(dados)
            }else{
                res.sendStatus(404)
            }
    }
})
//edição
app.put("/agenda/:id",(req, res)=>{
    if(isNaN(req.params.id)){
      //  res.send("não é um número")
        res.sendStatus(400)
    }else{
        var id=parseInt(req.params.id);
            var dados=  DB.agenda.find(a=>a.id==id)
            if(dados != undefined){
                res.statusCode=200;
               
                var {titulo, descricao, data}=req.body

                    if(titulo !=undefined){
                        dados.titulo=titulo
                    } 

                    if(descricao !=undefined){
                        dados.descricao=descricao
                    } 

                    if(data !=undefined){
                        dados.data=data
                    }
                    res.sendStatus(200)
            }else{
                res.sendStatus(404)
            }
    }
})

app.listen(2000,()=>{
    console.log("api node rodando")
})