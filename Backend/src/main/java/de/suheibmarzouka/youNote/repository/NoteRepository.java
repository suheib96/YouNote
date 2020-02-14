package de.suheibmarzouka.youNote.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.suheibmarzouka.youNote.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long>{
	
	List<Note> findByNotebookId(Long notebookId); 

}
