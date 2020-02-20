import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../classes/note';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
   @Input() note: Note;
   @Output() noteUpdated : EventEmitter<Note> = new EventEmitter<Note>();
   @Output() noteDeleted : EventEmitter<Note> = new EventEmitter<Note>();
  constructor() { }

  ngOnInit() {
  }

  updateNote(){
    this.noteUpdated.emit(this.note);

  }
  deleteNote(){
    this.noteDeleted.emit(this.note);

  }
}
