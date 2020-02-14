import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notebook } from '../classes/notebook';
import { Feedback } from '../classes/feedback';
import { Observable } from 'rxjs';
const baseUrl = "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


public getAllNotebooks() : Observable<Notebook[]>{
return this.http.get<Notebook[]>(baseUrl + 'notebooks');
}

public postFeedback(feedback: Feedback): Observable<any>{
  return this.http.post(baseUrl + 'feedback', feedback);
}

public postNotebook(notebook: Notebook): Observable<Notebook>{
  return this.http.post<Notebook>(baseUrl + 'notebooks', notebook);
}}
