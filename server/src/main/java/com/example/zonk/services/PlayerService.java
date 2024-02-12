package com.example.zonk.services;

import com.example.zonk.entities.Player;

import java.util.ArrayList;
import java.util.List;

public class PlayerService {

    private final List<Player> players = new ArrayList<>();

    public boolean addPlayer(String name, String room) {

        for (Player player : players) {
            if (player.getName().equals(name)) {
                return false;
            }
        }
        Player newPlayer = new Player(name, room);
        players.add(newPlayer);
        return true;
    }

}
