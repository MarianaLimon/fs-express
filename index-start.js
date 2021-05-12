
const express = require ('express')

const server = express()

// middleware
server.use(express.json())

server.get('/hola', (request, response) => {
    response.write('GET /hola')
    response.end()
})    

server.post('/hola', (request, response) => {
    response.write('Este es un post a  /hola')
    response.end()
})    

server.listen(8080, () => {
    console.log('Server listening in port 8080');
})

// GET /koders -> Aqui estan todos los koders
// POST /koders -> Aqui pudes crear koders
// PUT /koders -> Aui puedes sustituir un koder

/* server.get('/koders', (request, response) => {
    response.write('Aquí están todos los Koders')
    response.end()
})

server.post('/koders', (request,response) => {
    response.write('Aquí puedes crear koders')
    response.end()
})

  server.put('/koders',(request,response) => {
    response.write('Aquí puedes sustituir un koder')
    response.end()
})

server.listen(8080, () => {
    console.log('Server listening in port 8080')
}) */


server.get('/koders', (request,response) => {
    
    /* response.setHead(200, { 'Content-Type': 'application/json'})

    const json = { message:'Aqui la lista de koders' }
    const jsonString = JSON.stringify(json)

    response.write(jsonString)
    response.end() */

    response.status(401)
    response.json({message:'Aqui la lista de koders'})
})

server.post('/koders', (request,response) => {
    console.log('body: ', request.body.name)
    response.json({
        message: "ok"
    })
})


// 
 