package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.exeptions.PlayerAlreadyExistsException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PlayerService {

    private final List<Player> players = new ArrayList<>();

    public Player addPlayer(String name) throws PlayerAlreadyExistsException {
        Optional<Player> player = players
                .stream()
                .filter(currentPlayer -> currentPlayer.getName().equals(name))
                .findFirst();
        if (player.isPresent()) {
            throw new PlayerAlreadyExistsException("playerAlreadyExists");
        };
        Player newPlayer = new Player(name);
        players.add(newPlayer);
        return newPlayer;
    }

}
