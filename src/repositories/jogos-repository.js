const Jogo = require('../models/jogos');

exports.get = async () => {
    const res = await Jogo.find({});
    return res;
};

exports.create = async (data) => {
    const jogo = new Jogo(data);
    console.log(jogo);
    await jogo.save();
};

exports.update = async (id, data) => {
    await Jogo.findByIdAndUpdate(id, {
        $set: {
            jogo: data.jogo,
            link: data.link,
        },
    });
};

exports.delete = async (id) => {
    await Jogo.findByIdAndRemove(id);
};
