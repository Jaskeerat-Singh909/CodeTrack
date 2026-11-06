package com.example.codetrackbackend.service;

import com.example.codetrackbackend.model.Problem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProblemManager implements Trackable {

    private List<Problem> problems;
    private ProgressCalculator progressCalculator;

    public ProblemManager() {
        problems = new ArrayList<>();
        progressCalculator = new ProgressCalculator();
    }

    public void addProblem(Problem problem) {
        problems.add(problem);
    }

    public void deleteProblem(int id) {
        problems.removeIf(problem -> problem.getId() == id);
    }

    public void markSolved(int id) {
        for (Problem problem : problems) {
            if (problem.getId() == id) {
                problem.setSolved(true);
                return;
            }
        }
    }

    public void markUnsolved(int id) {
        for (Problem problem : problems) {
            if (problem.getId() == id) {
                problem.setSolved(false);
                return;
            }
        }
    }

    public List<Problem> getProblems() {
        return problems;
    }

    public List<Problem> searchProblems(String keyword) {
        List<Problem> result = new ArrayList<>();

        for (Problem problem : problems) {
            if (problem.getTitle().toLowerCase()
                    .contains(keyword.toLowerCase())) {
                result.add(problem);
            }
        }

        return result;
    }

    public Map<String, Integer> calculateProgress() {

        Map<String, Integer> progress = new HashMap<>();

        int total = problems.size();

        int solved = progressCalculator.getSolvedCount(problems);

        int remaining = total - solved;

        int percentage = progressCalculator.getProgress(problems);

        int easySolved =
                progressCalculator.getSolvedByDifficulty(
                        problems, "Easy");

        int mediumSolved =
                progressCalculator.getSolvedByDifficulty(
                        problems, "Medium");

        int hardSolved =
                progressCalculator.getSolvedByDifficulty(
                        problems, "Hard");

        int easyTotal =
                progressCalculator.getTotalByDifficulty(
                        problems, "Easy");

        int mediumTotal =
                progressCalculator.getTotalByDifficulty(
                        problems, "Medium");

        int hardTotal =
                progressCalculator.getTotalByDifficulty(
                        problems, "Hard");

        progress.put("total", total);
        progress.put("solved", solved);
        progress.put("remaining", remaining);
        progress.put("percentage", percentage);

        progress.put("easySolved", easySolved);
        progress.put("easyTotal", easyTotal);

        progress.put("mediumSolved", mediumSolved);
        progress.put("mediumTotal", mediumTotal);

        progress.put("hardSolved", hardSolved);
        progress.put("hardTotal", hardTotal);

        return progress;
    }

    @Override
    public void trackActivity(String message) {
        System.out.println("Activity: " + message);
    }
}