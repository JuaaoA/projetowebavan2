const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    conteudo: {type: String, required: true},
    local: {type: String, required: true},
    modelo : {type: String, required: true},
})

module.exports = mongoose.model('Tasks', schema)