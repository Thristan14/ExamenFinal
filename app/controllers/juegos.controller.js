const db = require('../config/db.config.js');
const Juegos = db.Juegos;

// Crear un nuevo juego
exports.create = (req, res) => {
    let juego = {};

    try {
        juego.nombre_juego = req.body.nombre_juego;
        juego.genero = req.body.genero;
        juego.plataforma = req.body.plataforma;
        juego.fecha_lanzamiento = req.body.fecha_lanzamiento;
        juego.precio_alquiler = req.body.precio_alquiler;
        juego.disponibilidad = req.body.disponibilidad;
        juego.fecha_alquiler = req.body.fecha_alquiler;
        juego.fecha_devolucion = req.body.fecha_devolucion;
        juego.nombre_cliente = req.body.nombre_cliente;
        juego.comentario = req.body.comentario;

        Juegos.create(juego).then(result => {
            res.status(200).json({
                message: "Juego creado exitosamente con id = " + result.id_juego,
                juego: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear juego!",
            error: error.message
        });
    }
};

// Recuperar todos los juegos
exports.findAll = (req, res) => {
    Juegos.findAll()
        .then(juegos => {
            res.status(200).json({
                message: "Juegos recuperados exitosamente!",
                juegos: juegos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al recuperar los juegos!",
                error: error
            });
        });
};

// Encontrar un juego por Id
exports.findById = (req, res) => {
    Juegos.findByPk(req.params.id)
        .then(juego => {
            if (juego) {
                res.status(200).json({
                    message: "Juego recuperado exitosamente con id = " + req.params.id,
                    juego: juego
                });
            } else {
                res.status(404).json({
                    message: "Juego no encontrado con id = " + req.params.id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al recuperar el juego!",
                error: error
            });
        });
};

// Actualizar un juego por Id
exports.update = (req, res) => {
    let id = req.params.id;
    Juegos.update(req.body, { where: { id_juego: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Juego actualizado exitosamente con id = " + id
                });
            } else {
                res.status(404).json({
                    message: "No se pudo actualizar el juego con id = " + id + ". Tal vez no fue encontrado o el cuerpo de la solicitud está vacío."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al actualizar el juego con id = " + id,
                error: error.message
            });
        });
};

// Eliminar un juego por Id
exports.delete = (req, res) => {
    let id = req.params.id;
    Juegos.destroy({ where: { id_juego: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Juego eliminado exitosamente con id = " + id
                });
            } else {
                res.status(404).json({
                    message: "No se pudo eliminar el juego con id = " + id + ". Tal vez no fue encontrado."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al eliminar el juego con id = " + id,
                error: error.message
            });
        });
};
