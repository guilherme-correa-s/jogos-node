const repository = require("../repositories/jogos-repository");
const ValidationContract = require("../validators/validator");
const mongoose = require("../repositories/bd");
exports.get = async (req, res) => {
    const contract = new ValidationContract();

    let data = await repository.get();

    contract.hasMinLen(data, 1, "Jogo não encontrado.");

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha  ao processar sua requisição",
            erro: e,
        });
    }
};

exports.post = async (req, res) => {
    const contract = new ValidationContract();
    contract.hasMinLen(
        req.body.jogo,
        3,
        "O nome do jogo deve ter pelo menos 3 caracteres"
    );
    contract.hasMinLen(
        req.body.link,
        6,
        "O link deve ter no mínimo 6 caractere"
    );

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: "Jogo cadastrado com sucesso!",
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao cadastrar Jogo",
            erro: e,
        });
    }
};

exports.put = async (req, res, next) => {
    const contract = new ValidationContract();

    contract.hasMinLen(
        req.body.jogo,
        3,
        "O nome do jogo deve ter pelo menos 3 caracteres"
    );

    contract.hasMinLen(
        req.body.link,
        6,
        "O link deve ter no mínimo 6 caractere"
    );

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: "Jogo atualizado com sucesso!",
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha  ao processar sua requisição",
            erro: e,
        });
    }
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send({ error: "Id inválido" });
        return;
    }
    try {
        await repository.delete(id);
        res.status(200).send({
            message: "Jogo deletado com sucesso!",
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha  ao processar sua requisição",
        });
    }
};
