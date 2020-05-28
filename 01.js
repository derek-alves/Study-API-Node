const express  = require('express');

const server = express();
server.use(express.json());

const users = ['claudio','derek','pedro','juca'];

server.get('/user',(req,res) => {
  const nome = req.query.nome;
  return res.json({"message":`${nome}`});
})

server.get('/users', (req,res)=>{
  return res.json(users);
})

server.get('/users/:id',(req, res)=>{
  const { id } = req.params;
  return res.json({'message': users[id]})
})

server.post('/users',(req,res) =>{
  const {nome} = req.body;
  users.push(nome);
  return res.json(users);
})

server.put('/users/:id',(req , res)=>{
  const{id} = req.params;
  const {nome}= req.body;
  users[id] = nome;
  return res.json(users)
})

server.delete('/users/:id',(req,res)=>{
  const{id}= req.params;
  users.splice(id,1);
  return res.send();
})

server.listen(3000);