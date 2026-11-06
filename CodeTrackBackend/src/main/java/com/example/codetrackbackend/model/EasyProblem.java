package com.example.codetrackbackend.model;

public class EasyProblem extends Problem {

    public EasyProblem(int id, String title, String topic, String link) {
        super(id, title, topic, link);
    }

    @Override
    public String getDifficulty() {
        return "Easy";
    }
}