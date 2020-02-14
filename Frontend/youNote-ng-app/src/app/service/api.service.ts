import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notebook } from '../classes/notebook';
import { Feedback } from '../classes/feedback';
import { Note } from '../classes/note';
import { Observable } from 'rxjs';


const baseUrl = "http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private http: HttpClient) { }

  public getAllNotes() : Observable<Note[]>{
    return this.http.get<Note[]>(baseUrl + 'notes');
    }
    public getAllNotesByNotebook(notebookId: number) : Observable<Note[]>{
      return this.http.get<Note[]>(baseUrl + 'notes' + '?notebookId=' + notebookId);
      }
      public postNote(note: Note): Observable<Note>{
        return this.http.post<Note>(baseUrl + 'notes', note);
      }
      public updateNote(noteId: number ,note: Note): Observable<Note>{
        return this.http.put<Note>(baseUrl + 'notes' +'/' +noteId, note);
      }
public getAllNotebooks() : Observable<Notebook[]>{
return this.http.get<Notebook[]>(baseUrl + 'notebooks');
}
public postNotebook(notebook: Notebook): Observable<Notebook>{
  return this.http.post<Notebook>(baseUrl + 'notebooks', notebook);
}
public updateNotebook(notebookId: number ,notebook: Notebook): Observable<Notebook>{
  return this.http.put<Notebook>(baseUrl + 'notebooks' +'/' +notebookId, notebook);
}
public deleteNotebook(id: number): Observable<any>{
  return this.http.delete<void>(baseUrl + 'notebooks' +'/'+id)
  
}
    public postFeedback(feedback: Feedback): Observable<any>{
      return this.http.post(baseUrl + 'feedback', feedback);
    }
}
