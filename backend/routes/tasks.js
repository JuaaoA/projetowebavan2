var express = require('express')
var router = express.Router();

const Task = require('../models/tasks')

router.post('/', async function (req, res, next) {

    console.log(req.body);

    const taskObj = new Task({
        conteudo: req.body.nome,
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

router.patch('/delete', async function (req, res, next) {
    try {
        // Pegar o ID da tarefa
        const id_task = req.body.id;
        console.log(id_task);

        // Prosseguir com a exclusão
        await Task.deleteOne({ _id: id_task });

        // Caso tudo der certo
        return res.status(200).json({
            success: "Server-side: Tarefa excluída com sucesso"
        })
    }
    catch (err)
    {
        return res.status(500).json({
            errorTitle: "Server-side: Erro ao apagar a tarefa",
            error: err
        })
    }
})

router.patch('/', async function (req, res, next) {
    try {
        // Pegar os valores da requisição
        const taskEditada = {
            _id: req.body.id,
            local: req.body.local
        }

        // Aplicar no banco de dados
        await Task.findByIdAndUpdate(taskEditada._id, {local: taskEditada.local})

        // Indicar que tudo deu certo
        return res.status(200).json({
            sucess: "Server-side: Tarefa editada com sucesso"
        })
    }
    catch (err)
    {
        // Indicar que ocorreu um erro
        return res.status(200).json({
            errorTitle: "Server-side: Erro ao editar tarefa",
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