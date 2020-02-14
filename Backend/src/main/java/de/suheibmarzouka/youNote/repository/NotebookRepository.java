package de.suheibmarzouka.youNote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.JpaRepositoryConfigExtension;

import de.suheibmarzouka.youNote.entity.Notebook;

public interface NotebookRepository extends JpaRepository<Notebook, Long>{
	

}
