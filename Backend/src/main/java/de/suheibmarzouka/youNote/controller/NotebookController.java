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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import de.suheibmarzouka.youNote.entity.Notebook;
import de.suheibmarzouka.youNote.repository.NotebookRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notebooks")
@RequiredArgsConstructor
public class NotebookController {


	private final NotebookRepository notebookRepository;
	
	@GetMapping
	public List<Notebook> showNotes(){
		return notebookRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> showOneNotebook(@PathVariable Long id) {
		
		return ResponseEntity.of(notebookRepository.findById(id));
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Notebook create(@RequestBody Notebook notebook) {
		notebook.setId(null);
		return notebookRepository.save(notebook);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update (@PathVariable Long id,@RequestBody Notebook notebook){
		notebook.setId(id);
		if (!notebookRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		notebookRepository.save(notebook);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		if (!notebookRepository.existsById(id)) {
			return new ResponseEntity<>("Das Buch exisitert nicht", HttpStatus.NOT_FOUND);
		}
		notebookRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}


