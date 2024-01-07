const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const { existeCategoriaPorId, existeProdcutoPorId } = require('../helpers/db-validators');

const { 
    obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto 
} = require('../controllers/productos');

const router = Router();

// {{url}}/api/categorias


// Obtener todas las categorias - publico
router.get('/', obtenerProductos);

// Obtener todas las categorias por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(  existeProdcutoPorId ),
    validarCampos,
    
], obtenerProducto);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto );

// Crear categoria - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT, // Agregado el middleware de autenticación
    check('categoria','No es un id de mongo').not().isMongoId(),
    check('id').custom(  existeProdcutoPorId ),
    validarCampos
], actualizarProducto );

// Actualizar - privado - Cualquier con un token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(  existeProdcutoPorId ),
    validarCampos
], borrarProducto);



module.exports = router;