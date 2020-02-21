import { Component, OnInit } from '@angular/core';
import { Notebook } from '../classes/notebook';
import { Note } from '../classes/note';
import { ApiService } from '../service/api.service';

const baseUrl = 'http://localhost:8080/notebooks'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  
  selectedNotebook: Notebook;
  searchText: string =null;
  constructor(private apiService: ApiService) { }
  
  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();

  }
  
  public getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      notesFromBackend => {
        this.notes = notesFromBackend;
      },
      err => {
        alert("An error has occurred")
      }
    )
  };

  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      notebooksFromBackend => {
        this.notebooks = notebooksFromBackend;
       

      },
      err => {
        alert("An error has occurred");

      }
    )
  }

  createNotebook(){
    let newNotebook: Notebook = {
      name: ' New Notebook',
      id:null
    }

    this.apiService.postNotebook(newNotebook).subscribe(
      newAddedNotebook => {
        newNotebook.id = newAddedNotebook.id;
        this.notebooks.push(newNotebook);
      },
      err => {alert("An error has occurred while saving the notebook");}
    );

  }
  changeNotebookName(id:number, name:string){
     let newNotebook: Notebook = {
       id: id,
    name: name
    }
    this.apiService.updateNotebook(id, newNotebook).subscribe(()=> {this.getAllNotebooks;
       },
      
      err => {alert("An error has occurred while saving the notebook");}
    );
}
deleteNotebook(notebook:Notebook){
  if(confirm("Are you sure you want to delete the notebook with all notes?")){
    this.apiService.deleteNotebook(notebook.id).subscribe(()=> {
      this.selectAllNotes();
      let indexOfNotebook = this.notebooks.indexOf(notebook);
      this.notebooks.splice(indexOfNotebook, 1);
    },
    err => {alert("An error has occurred while deleting the notebook. ");}
    );

  }
}
deleteNote(note: Note){
if(confirm("Are you sure you want to delete the note?")){
this.apiService.deleteNote(note.id).subscribe(()=>{
  let indexOfNote = this.notes.indexOf(note);
  this.notes.splice(indexOfNote, 1)
},
err => {alert("An error has occured while deleting the note");}
);
}
}
createNote(){
  let newNote: Note = {
id:null,
title: "New Title",
text:"Write some text in here",
lastModifiedOn: new Date,

notebook:{
  id: this.selectedNotebook.id
  
}

}
  this.apiService.postNote(newNote).subscribe(
    newAddedNote => {
      newNote.id = newAddedNote.id;
      this.notes.push(newNote);
    },
    err =>{alert("An error has occurred while saving the note")}
  )
}

public selectNotebook(notebook){
  this.selectedNotebook = notebook;
  this.apiService.getAllNotesByNotebook(this.selectedNotebook.id).subscribe(
    notesFromBackend => {
      this.notes = notesFromBackend;
    },
    err => {alert("An error has occurred while downloading the notes")}
  )
}
public updateNote(note: Note){
  let newNote: Note = {
    id: note.id,
    title: note.title,
    text: note.text,
    notebook:{
      id: this.selectedNotebook.id
    }
    
    
    
  }
  this.apiService.updateNote(note.id, newNote).subscribe(()=> {this.getAllNotes;
  },
  err => {alert("An error has occurred while saving the note");}
  );
}
public selectAllNotes(){
  this.selectedNotebook= null;
  this.getAllNotes();
}


}
