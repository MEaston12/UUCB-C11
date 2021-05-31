//This module is intended to handle all internal I/O between the server and the db
const fs = require('fs').promises;
const uniqid = require('uniqid');

const dbPath = './db/db.json';
let notesData = [];

function saveNotes(){
    return fs.writeFile(dbPath,JSON.stringify(notesData)).catch(console.error);
}

module.exports = {
    init(){ //if db.json exists, load it, otherwise create it
        try {
            notesData = require(dbPath);
        } catch {
            saveNotes();
        }
    },
    notes: {
        get(){
            return notesData;
        },
        add(title, text){
            const note = {title, text, id:uniqid()};
            notesData.push(note);
            saveNotes();
            return note;
        },
        delete(id){
            const noteIndex = notesData.findIndex(note => note.id === id);
            if(noteIndex < 0) return false; //Exit early if title not found
            notesData.splice(noteIndex, 1);
            saveNotes();
            return true;
        }
    }
}