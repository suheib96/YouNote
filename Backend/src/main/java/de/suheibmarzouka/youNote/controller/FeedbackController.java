package de.suheibmarzouka.youNote.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import de.suheibmarzouka.youNote.entity.Feedback;
import de.suheibmarzouka.youNote.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {
	
	private final FeedbackRepository feedbackRepository;

	
	@GetMapping
	public List<Feedback> showFeedbacks(){
		return feedbackRepository.findAll();
	}
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Feedback create(@RequestBody Feedback feedback) {
		feedback.setId(null);
		return feedbackRepository.save(feedback);
	}
}
