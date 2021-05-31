//This module is intended to handle all internal I/O between the server and the db
const fs = require('fs').promises;

const dbPath = './db/db.json';
let notesData = [];

function saveNotes(){
    return fs.writeFile(dbPath,JSON.stringify(notesData)).catch(console.error);
}

module.exports = {
    init(){
        try {
            notesData = require(dbPath);
        } catch {
            return saveNotes();
        }
    },
    notes: {
        get(){
            return notesData;
        },
        add(note){
            notesData.push(note);
            return saveNotes();
        },
        delete(id){
            const noteIndex = notesData.findIndex(note => note.id === id);
            if(noteIndex < 0) return; //Exit early if title not found
            notesData.splice(noteIndex, 1);
            return saveNotes();
        }
    }
}