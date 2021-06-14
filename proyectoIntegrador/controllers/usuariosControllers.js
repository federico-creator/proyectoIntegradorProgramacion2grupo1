const db = require("../database/models")
const op = db.Sequelize.Op;

let usuariosControllers = {
    index: (req, res) => {
        db.Usuario.findByPk(`${req.params.id}`)
        .then(resultados => {
            return res.render("usuarios", {resultados})
        })
        .catch(err => console.log(err))
    }
};

module.exports = usuariosControllers;