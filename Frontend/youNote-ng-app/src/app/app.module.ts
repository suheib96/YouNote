import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotesComponent } from './notes/notes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { NoteComponent } from './note/note.component';
import { NoteTextFilterPipe } from './classes/note-text-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotesComponent,
    NotFoundComponent,
    FeedbackComponent,
    NoteComponent,
    NoteTextFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
