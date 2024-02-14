package com.example.zonk.entities;

public class Player {

    private String playerName;


    public Player(String name) {
        this.playerName = name;
    }

    public String getName() { return this.playerName; }

    public void setName(String name) {this.playerName = name; }

}
