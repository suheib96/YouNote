import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notebook } from '../classes/notebook';
import { ApiService } from '../service/api.service';

const baseUrl = 'http://localhost:8080/notebooks'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
  }

  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      notebooksFromBackend => {
        this.notebooks = notebooksFromBackend;

      },
      err => {
        alert("An errer has occurred");

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
}
