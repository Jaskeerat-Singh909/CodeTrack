package com.example.codetrackbackend.model;

public class HardProblem extends Problem {

    public HardProblem(int id, String title, String topic, String link) {
        super(id, title, topic, link);
    }

    @Override
    public String getDifficulty() {
        return "Hard";
    }
}