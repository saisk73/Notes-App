const fs =require('fs')
const chalk = require('chalk')
const getNotes = function() {
    return 'notes...'
}

const addNote = function(title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.greenBright('note added succesfully'))
    }
    else{
        console.log(chalk.gray('note title is already taken'))
    }
}

const removeNote = function(title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter( function (notes){
        return notes.title !== title
    })
    if( notes.length > notesToKeep.length){
        console.log(chalk.inverse('note removed!'))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('note not found...'))
    }
}

const saveNotes = function (notes){

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const loadNotes = function() {

    try{
        const data = fs.readFileSync('notes.json')
        const datastring = data.toString()
        return JSON.parse(datastring)
    }
    catch(e)
    {
        return []
    }
}

module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote
}