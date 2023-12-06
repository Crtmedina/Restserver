const express = require('express');
const cors = require('cors')


class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.usuariosPath = '/api/usuarios';

        // Middelwares
        this.middelwares();


        // Rutas de mi aplicacion

        this.routes();
    }

    middelwares() {

        // CORS 
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo', this.port)
        });
    }
}

module.exports = Server;