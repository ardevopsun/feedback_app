package com.example.feedback.service;

import com.example.feedback.model.Feedback;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackService {
    private final List<Feedback> feedbackList = new ArrayList<>();

    public void saveFeedback(Feedback feedback) {
        feedbackList.add(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackList;
    }
}
