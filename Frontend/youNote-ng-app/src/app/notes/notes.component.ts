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
  note: Note;
  selectedNotebook: Notebook;
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
  if(confirm("Are you sure you want to delete the notebook?")){
    this.apiService.deleteNotebook(notebook.id).subscribe(()=> {location.reload();
    },
    err => {alert("An error has occurred while deleting the notebook");}
    );

  }
}
deleteNote(id:number){

}
createNote(){
  let newNote: Note = {
id:null,
title: "New Title",
text:"Write some text in here",

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
