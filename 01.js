const express  = require('express');

const server = express();
server.use(express.json());

const users = ['claudio','derek','pedro','juca'];

server.use((req,res,next) =>{
    console.time('request');
    console.log(`metodo:${req.method} || URL: ${req.url}`);

    next();
    console.timeEnd('request');
})

function checkUserExist(req,res,next){
  if(!req.body.nome){
    return res.status(400).json({error:"Name is required"});
  }
  return next();
}

function checkIdExist(req,res,next){
  const user = users[req.params.id]
  if(!users){
    return res.status(400).json({error:"User does not exists!"});
  }
    req.user = user;
    return next();
}
server.get('/user',(req,res) => {
  const nome = req.query.nome;
  return res.json({"message":`${nome}`});
})

server.get('/users', (req,res)=>{
  return res.json(users);
})

server.get('/users/:id',checkIdExist,(req, res)=>{
  return res.json(req.user);
})

server.post('/users',checkUserExist,(req,res) =>{
  const {nome} = req.body;
  users.push(nome);
  
  return res.json(users);
})

server.put('/users/:id',checkUserExist,checkIdExist,(req , res)=>{
  const{id} = req.params;
  const {nome}= req.body;
  users[id] = nome;
  return res.json(users)
})

server.delete('/users/:id',checkIdExist,(req,res)=>{
  const{id}= req.params;
  users.splice(id,1);
  return res.send();
})

server.listen(3000);