package com.example.zonk.entities;

import com.example.zonk.enums.PlayerStatuses;

import java.util.UUID;

public class Player {

    private String playerName;

    private final String sessionId = UUID.randomUUID().toString();

    private int totalPoints = 0;
    private int currentPoints = 0;

    private String status = PlayerStatuses.UNAUTHORIZED;

    private int[] bannedDices = new int[6];

    private int stableCurrentPoints = 0;

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

    public int[] getBannedDices() {
        return bannedDices;
    }

    public void setBannedDices(int[] bannedDices) {
        this.bannedDices = bannedDices;
    }

    public int getStableCurrentPoints() {
        return stableCurrentPoints;
    }

    public void setStableCurrentPoints(int stableCurrentPoints) {
        this.stableCurrentPoints = stableCurrentPoints;
    }

    public void addStableCurrentPoints(int stableCurrentPoints) {
        this.stableCurrentPoints += stableCurrentPoints;
    }

    public void withdrawStableCurrentPoints(int stableCurrentPoints) {
        this.stableCurrentPoints -= stableCurrentPoints;
    }
}
