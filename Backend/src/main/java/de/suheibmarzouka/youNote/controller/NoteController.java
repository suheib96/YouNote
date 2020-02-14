package de.suheibmarzouka.youNote.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import de.suheibmarzouka.youNote.entity.Note;
import de.suheibmarzouka.youNote.repository.NoteRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {
	
	private final NoteRepository noteRepository;
	
	@GetMapping
	public List<Note> showNotes(@RequestParam (required = false) Long notebookId){
		
		if (notebookId != null) {
			return noteRepository.findByNotebookId(notebookId);
		}
		return noteRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> showOneNote(@PathVariable Long id) {
		
		return ResponseEntity.of(noteRepository.findById(id));
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Note create(@RequestBody Note note) {
		note.setId(null);
		return noteRepository.save(note);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update (@PathVariable Long id,@RequestBody Note note){
		note.setId(id);
		if (!noteRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		noteRepository.save(note);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		if (!noteRepository.existsById(id)) {
			return new ResponseEntity<>("Das Buch exisitert nicht", HttpStatus.NOT_FOUND);
		}
		noteRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
