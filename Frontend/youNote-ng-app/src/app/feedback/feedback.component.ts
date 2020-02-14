import { Component, OnInit } from '@angular/core';
import { Feedback } from '../classes/feedback';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';

const baseUrl = 'http://localhost:8080/feedback'
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
model: Feedback = {
name:'',
email:'',
feedback:''

};

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  sendFeedback(): void{
    this.apiService.postFeedback(this.model).subscribe(
      newFeedback => {
        location.reload();
        alert("Your feedback has sent!")
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    )
  }

}
