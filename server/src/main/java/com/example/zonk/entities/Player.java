package com.example.zonk.entities;

public class Player {

    private String playerName;

    private String roomName;

    public Player(String name, String room) {
        this.playerName = name;
        this.roomName = room;
    }

    public String getName() { return this.playerName; }
    public String getRoom() { return this.roomName; }

    public void setName(String name) {this.playerName = name; }
    public void setRoom(String room) {this.roomName = room; }

}
