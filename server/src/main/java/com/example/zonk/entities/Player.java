package com.example.zonk.entities;

import com.example.zonk.enums.PlayerStatuses;

import java.util.UUID;

public class Player {

    private String playerName;

    private final String sessionId = UUID.randomUUID().toString();

    private int totalPoints = 0;
    private int currentPoints = 0;

    private String status = PlayerStatuses.UNAUTHORIZED;

    public Player(String name) {
        this.playerName = name;
    }

    public String getName() { return this.playerName; }

    public String getSessionId() { return sessionId; }

    public int getTotalPoints() { return this.totalPoints; }
    public int getCurrentPoints() { return this.currentPoints; }

    public String getStatus() { return this.status; }

    public void setName(String name) {this.playerName = name; }

    public void setTotalPoints(int pts) { this.totalPoints = pts; }
    public void setCurrentPoints(int pts) { this.currentPoints = pts; }

    public void setStatus(String status) {this.status = status;}

    public void addTotalPoints(int points) {
        this.totalPoints += points;
    }
    public void addCurrentPoints(int points) { this.currentPoints += points; }

    public void withdrawTotalPoints(int points) {
        this.totalPoints -= points;
    }
    public void withdrawCurrentPoints(int points) { this.currentPoints -= points; }

}
