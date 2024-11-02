var express = require('express')
var router = express.Router();

const Task = require('../models/tasks')

router.post('/', async function (req, res, next) {
    const taskObj = new Task({
        conteudo: req.body.conteudo,
        local: req.body.local,
        modelo : req.body.modelo
    })

    try {
        const taskSave = await taskObj.save()
        console.log(taskSave)

        res.status(201).json({
            success: "tarefa salva com sucesso",
            messageSave: taskSave
        })
    } catch (err) {
        return res.status(500).json({
            errorTitle: "Server-side: Erro ao salvar a tarefa" ,
            error: err
        })
    }
})

router.get('/', async function (req, res, next) {
    try {
        // Pegar todas as tarefas do bd
        const taskFindTodos = await Task.find({});

        console.log(taskFindTodos);

        res.status(200).json({
            msgSucesso: "Recuperou pae, vlw",
            objTask: taskFindTodos
        });
    } catch (err) {
        // Retornar um erro em json
        return res.status(500).json({
            myErrorTitle: "Serve-side: Um erro aconteceu ao buscar as tarefas",
            myError: err
        })
    }
})

module.exports = router