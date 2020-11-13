const chalk = require('chalk');
const yargs = require('yargs');
const note = require('./notes.js');


const add = function(){
    yargs.command({
        command: 'add',
        describe: 'To Add A Note',
        builder :{
            title:{
                describe: 'Note heading',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe:'Note body',
                demandOption:true,
                type:"string"
            }
        },
        handler(argv){
           note.addNote(argv.title,argv.body);
        }
    }).parse();   
}

const remove = function(){
    yargs.command({
        command:'remove',
        describe:'To Delete A Note',
        builder :{
        title:{
            describe: 'Note heading',
            demandOption: true,
            type: 'string'
        }
    },
        handler(argv){
            note.delNote(argv.title);
        }
    }).parse();
};

const list = () => {yargs.command({
    command:'list',
    describe:'To List A Note',
    handler(){
        note.listNotes();
    }
}).parse();
};

const read= () => {
    yargs.command({
    command:'read',
    describe:'To Read A Note',
    builder: {
        describe:'Read Note',
        demandOption:true,
        type:'string'

    },
    handler(argv){
         note.readNote(argv.title);
     }
 }).parse();
};
const executeAll = () => {
    add();
    read();
    remove();
    list();
}
 module.exports = {executeAll};

