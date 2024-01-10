const  validaCampos  = require('../middlewares/validar-campos');
const  validaRoles = require('../middlewares/validar-roles');
const  validaJWT  = require('../middlewares/validar-jwt');
const validarArchivoSubir = require('../middlewares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivoSubir,
}