package com.example.zonk.entities;

import com.example.zonk.enums.PlayerStatuses;

import java.util.UUID;

public class Player {

    private String playerName;

    private final String sessionId = UUID.randomUUID().toString();

    private String playerStatus = PlayerStatuses.INLOBBY;

    private int points = 0;

    public Player(String name) {
        this.playerName = name;
    }

    public String getName() { return this.playerName; }

    public String getSessionId() { return sessionId; }

    public int getPoints() { return this.points; }

    public String getPlayerStatus() { return this.playerStatus; }

    public void setName(String name) {this.playerName = name; }

    public void setPlayerStatus(String status) { this.playerStatus = status; }

    public void setPoints(int pts) { this.points = pts; }

    public void addPoints(int points) {
        this.points += points;
    }

    public void withdrawPoints(int points) {
        this.points -= points;
    }

}
