package com.example.codetrackbackend.model;

public abstract class Problem {
    private int id;
    private String title;
    private String topic;
    private boolean solved;
    private String link;

    public Problem(int id, String title, String topic, String link) {
        this.id = id;
        this.title = title;
        this.topic = topic;
        this.solved = false;
        this.link = link;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getTopic() {
        return topic;
    }

    public boolean isSolved() {
        return solved;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }

    public String getLink() {
        return link;
    }

    public abstract String getDifficulty();
}
