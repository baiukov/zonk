package com.example.zonk.entities;

public class Game implements Runnable {

    private final Room room;

    private int goal;

    public Game(Room room, int goal) {
        this.room = room;
        this.goal = goal;
    }

    public Room getRoom() { return this.room; }

    public int getGoal() { return this.goal; }

    public void setGoal(int goal) { this.goal = goal; }

    @Override
    public void run() { }
}
