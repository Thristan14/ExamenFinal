const express = require('express');
const router = express.Router();

const Juegos = require('../controllers/juegos.controller.js');

// Rutas para el controlador de Juego

router.post('/api/juego/create', Juegos.create);
router.get('/api/juego/all', Juegos.findAll);
router.get('/api/juego/onebyid/:id', Juegos.findById);
router.put('/api/juego/update/:id', Juegos.update);
router.delete('/api/juego/delete/:id', Juegos.delete);


module.exports = router;
