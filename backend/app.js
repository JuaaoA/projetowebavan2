const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');

var appRoutes = require('./routes/app');
const tasksRoutes = require('./routes/tasks')
//const userRoutes = require('./routes/user')

const mongoose = require("mongoose");

const app = express();

// Conectar com o banco
mongoose.connect('mongodb://127.0.0.1:27017/tasks')
  .then(() => {
    console.log("deu certo a conexao com o banco")
  })
  .catch((error) => {
    console.log("deu erro a conexão com o banco:" + error)
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/tasks', tasksRoutes)
//app.use('/user', userRoutes)
app.use('/', appRoutes);

// catch 404 and forward to error handler 
app.use(function (req, res, next) {
  return res.render('index');
});

module.exports = app;
