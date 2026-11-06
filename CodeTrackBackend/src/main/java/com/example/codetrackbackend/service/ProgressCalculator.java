package com.example.codetrackbackend.service;

import com.example.codetrackbackend.model.Problem;

import java.util.List;

public class ProgressCalculator {

    public int getSolvedCount(List<Problem> problems) {
        int count = 0;

        for (Problem problem : problems) {
            if (problem.isSolved()) {
                count++;
            }
        }

        return count;
    }

    public int getProgress(List<Problem> problems) {
        if (problems.isEmpty()) {
            return 0;
        }

        int solved = getSolvedCount(problems);

        return Math.round((solved * 100.0f) / problems.size());
    }

    public int getSolvedByDifficulty(
            List<Problem> problems,
            String difficulty) {

        int count = 0;

        for (Problem problem : problems) {
            if (problem.isSolved()
                    && problem.getDifficulty().equals(difficulty)) {
                count++;
            }
        }

        return count;
    }

    public int getTotalByDifficulty(
            List<Problem> problems,
            String difficulty) {

        int count = 0;

        for (Problem problem : problems) {
            if (problem.getDifficulty().equals(difficulty)) {
                count++;
            }
        }

        return count;
    }
}