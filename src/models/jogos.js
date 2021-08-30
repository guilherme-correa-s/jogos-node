const mongoose = require("../repositories/bd");

const JogoSchema = new mongoose.Schema({
    jogo: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
});

const Jogo = mongoose.model("Jogo", JogoSchema);

module.exports = Jogo;