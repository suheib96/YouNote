package de.suheibmarzouka.youNote.entity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Note {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Size(min=1)
	private String title;
	
	@NotNull
	private String text;
	
	private Date lastModifiedOn;
	
	
	
	@ManyToOne
	@JoinColumn(name = "notebook_id" ,nullable = false)
	private Notebook notebook;

}
