// Practica fs + express
/*
  // GET /Koders -> reegresa un json con una lista de koders
  La lista de koders viene de un archivo
*/
const express = require ('express')

const kodersRouter = require('./routers/koders')
const mentorsRouter = require('./routers/mentors')

const server = express()

// middleware
server.use(express.json())
server.use('/koders', kodersRouter)
server.use('/mentors', mentorsRouter)

server.get('/', (request,response)=>{
    response.json({
        success: true,
        message: '11G apiV1'
    })
})

server.listen(8080, () => {
    console.log('Server listening in port 8080');
})