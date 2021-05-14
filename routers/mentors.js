
const express = require('express')
const fs = require('fs')
const router = express.Router()

function getKodersFile(){
    const content = fs.readFileSync('koders.json', 'utf8')
    return JSON.parse(content)
}

router.get('/',async (request,response) => {
    const moduleFilter = request.query.module
    const countFilter = parseInt(request.query.count || 0)
    const nameFilter = request.query.name

    const jsonParsed = getKodersFile()

    let mentorsData = null

    if (moduleFilter){
        mentorsData = jsonParsed.mentors.filter(mentor => mentor.module === moduleFilter)
    }

    if (nameFilter) {
        const dataToFilter = mentorsData || jsonParsed.mentors
        mentorsData = dataToFilter.filter(mentor => mentor.name === nameFilter)
    }

    if (countFilter) {
        const dataToFilter = mentorsData || jsonParsed.mentors
        mentorsData = dataToFilter.splice(0, countFilter)
    }

    jsonParsed.mentors = mentorsData || jsonParsed.mentors

    response.json(jsonParsed.mentors)
})

router.post('/', (request,response) =>{
    const name = request.body.name
    const module = request.body.module

    const newMentor = { name, module }

    const jsonParsed = getKodersFile()

    json.mentors.push(newMentor)

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

    const newMentors = json.mentors.reduce((mentors,mentorActual) => {
        if (id === mentorActual.id){
            mentorActual.name = name
        }
        return[
            ...mentors,
            mentorActual
        ]
    },[])

    json.mentors = newMentors

    fs.writeFileSync('koders.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        success: true
    })
})


router.delete('/:id',(request,response) =>{
    const id = request.params.id
    const json = getKodersFile()

    const newMentors = json.mentors.filter(mentor => mentor.id != id)

    json.mentors = newMentors

    fs.writeFileSync('koders.json', JSON.stringify(json, null,2), 'utf8')

    response.json({
        success: true
    })
})

module.exports = router
