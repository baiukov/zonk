package com.example.zonk.entities;

import java.util.ArrayList;
import java.util.List;

public class Room {

    private String name;

    private final List<Player> players = new ArrayList<>();

    public String getName() { return this.name; }

    public List<Player> getPlayers() { return this.players; }

    public void setName(String name) { this.name = name; }

    public Room(String name) {
        this.name = name;
    }

    public void addPlayer(Player player) { players.add(player); }

    public void removePlayer(Player player) {
        players.remove(player);
    }

    @Override
    public String toString() {
        return this.name;
    }
}
