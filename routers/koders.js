
const express = require('express')
const fs = require('fs')
const router = express.Router()

function getKodersFile(){
    const content = fs.readFileSync('koders.json', 'utf8')
    return JSON.parse(content)
}

router.get('/',async (request,response) => {
    const genderFilter = request.query.gender
    const countFilter = parseInt(request.query.count || 0)
    const nameFilter = request.query.name

    const jsonParsed = getKodersFile()

    let kodersData = null

    if (genderFilter){
        kodersData = jsonParsed.koders.filter(koder => koder.gender === genderFilter)
    }

    if (nameFilter) {
        const dataToFilter = kodersData || jsonParsed.koders
        kodersData = dataToFilter.filter(koder => koder.name === nameFilter)
    }

    if (countFilter) {
        const dataToFilter = kodersData || jsonParsed.koders
        kodersData = dataToFilter.splice(0, countFilter)
    }

    jsonParsed.koders = kodersData || jsonParsed.koders

    response.json(jsonParsed.koders)
})

router.post('/', (request,response) =>{
    const name = request.body.name
    const gender = request.body.gender

    const newKoder = { name, gender }

    const jsonParsed = getKodersFile()

    json.koders.push(newKoder)

    fs.writeFileSync('koders.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        success: true
    })
})


router.patch('/:id',(request,response) =>{
    request.params
    //console.log(request.params);
    const id = parseInt(request.params.id)
    const name = request.body.name

    const jsonParsed = getKodersFile()

    const newKoders = json.koders.reduce((koders,koderActual) => {
        if (id === koderActual.id){
            koderActual.name = name
        }
        return[
            ...koders,
            koderActual
        ]
    },[])

    json.koders = newKoders

    fs.writeFileSync('koders.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        success: true
    })
})


router.delete('/:id',(request,response) =>{
    const id = request.params.id
    const json = getKodersFile()

    const newKoders = json.koders.filter(koder => koder.id != id)

    json.koders = newKoders

    fs.writeFileSync('koders.json', JSON.stringify(json, null,2), 'utf8')

    response.json({
        success: true
    })
})

module.exports = router
