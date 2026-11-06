package com.example.codetrackbackend.model;

public class MediumProblem extends Problem {

    public MediumProblem(int id, String title, String topic, String link) {
        super(id, title, topic, link);
    }

    @Override
    public String getDifficulty() {
        return "Medium";
    }
}