package de.suheibmarzouka.youNote.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.suheibmarzouka.youNote.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long>{

}
