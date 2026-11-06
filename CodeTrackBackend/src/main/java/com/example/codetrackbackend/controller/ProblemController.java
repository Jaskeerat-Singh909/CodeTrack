package com.example.codetrackbackend.controller;

import com.example.codetrackbackend.model.EasyProblem;
import com.example.codetrackbackend.model.HardProblem;
import com.example.codetrackbackend.model.MediumProblem;
import com.example.codetrackbackend.model.Problem;
import com.example.codetrackbackend.service.ProblemManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin(origins = "http://localhost:5173")
public class ProblemController {

    private ProblemManager manager = new ProblemManager();

    @GetMapping
    public List<Problem> getProblems() {
        return manager.getProblems();
    }

    @PostMapping
    public String addProblem(
            @RequestParam int id,
            @RequestParam String title,
            @RequestParam String topic,
            @RequestParam String difficulty,
            @RequestParam String link) {

        System.out.println("ADD PROBLEM REQUEST RECEIVED");

        Problem problem;

        if (difficulty.equalsIgnoreCase("Easy")) {
            problem = new EasyProblem(id, title, topic, link);
        } else if (difficulty.equalsIgnoreCase("Medium")) {
            problem = new MediumProblem(id, title, topic, link);
        } else {
            problem = new HardProblem(id, title, topic, link);
        }

        manager.addProblem(problem);

        return "Problem added successfully";
    }

    @PutMapping("/{id}/solve")
    public void markSolved(@PathVariable int id) {
        manager.markSolved(id);
    }

    @PutMapping("/{id}/unsolve")
    public void markUnsolved(@PathVariable int id) {
        manager.markUnsolved(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProblem(@PathVariable int id) {
        manager.deleteProblem(id);
    }

    @GetMapping("/progress")
    public Map<String, Integer> getProgress() {
        return manager.calculateProgress();
    }
}