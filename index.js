// Practica fs + express
/*
  // GET /Koders -> reegresa un json con una lista de koders
  La lista de koders viene de un archivo
*/
const fs = require('fs');

const express = require ('express')
const server = express()

// middleware
server.use(express.json())


server.get('/koders', (request, response) => {
    fs.readFile('koders.json', 'utf-8', (error, data) => {
        if (error) {
            console.error('Algo salio mal: ', error);
        }
        response.json(JSON.parse(data))
    })
})

server.listen(8080, () => {
    console.log('Server listening in port 8080');
})