const fs =require('fs');
const { parse } = require('path');
const chalk = require('chalk');

const getNotes = ()=>{
        return "empty"
}

const addNote = (title,body) => {
    const note = loadNote();
    const duplicateNote = note.find((element)=> element.title === title)

    if(!duplicateNote){
        note.push({
            title:title,
            body:body
        })
        saveNote(note);
        console.log(chalk.green.inverse('New Note Added!'));
    }else{
        console.log(chalk.red.inverse('Note Title Exists!'));
    }
   
}

const saveNote =(note) => {
    const dataJSON = JSON.stringify(note);
    fs.writeFileSync('note.json',dataJSON);
}

const loadNote = () => {
    try{
        const dataBuffer = fs.readFileSync('note.json');
        const dataJSON= dataBuffer.toString();
        return JSON.parse(dataJSON);

    }catch(e){
        
        return []
    }
}


const delNote = (title) => {
    const note = loadNote();
    const notesToKeep = note.filter((obj)=>obj.title !== title)

    if(note.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed'));
        saveNote(notesToKeep);
    }
    else{
        console.log(chalk.red.inverse('No Such Note Exists!'));
    }
   
}

const listNotes = ()=>{
    const note = loadNote();
    console.log(chalk.inverse('Your Notes:'));
    note.forEach(element => {
        console.log(element.title);
    });

}
const readNote = (title)=>{
    const note = loadNote()
    const notes = note.find((element)=> element.title === title) 

    if(notes){
        console.log(chalk.inverse(element.title))
        console.log(element.body)
    }else{
        console.log(chalk.red.inverse('Note not Found!'))
    }
}

module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    delNote:delNote,
    listNotes:listNotes
} 
