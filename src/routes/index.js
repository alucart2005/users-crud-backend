const express = require('express');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', require('./user.router'));


module.exports = router;