package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.enums.PlayerStatuses;
import com.example.zonk.exeptions.PlayerLoginException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PlayerService {

    private static final List<Player> players = new ArrayList<>();

    public Player authorisePlayer(String name, Room room) throws PlayerLoginException {
        Optional<Player> optionalPlayer = room.getPlayers().stream()
                .filter(currentPlayer -> currentPlayer.getName().equals(name))
                .findFirst();
        if (optionalPlayer.isPresent()) {
            throw new PlayerLoginException("playerAlreadyExists");
        }
        Player newPlayer = new Player(name);
        players.add(newPlayer);
        newPlayer.setStatus(PlayerStatuses.INLOBBY);
        return newPlayer;
    }

    public Player getPlayer(String name) {
        Optional<Player> player =  players
                .stream()
                .filter(currentPlayer -> currentPlayer.getName().equals(name))
                .findFirst();
        return player.orElse(null);
    }

    public Player getPlayerByID(String id) {
        Optional<Player> player = players
                .stream()
                .filter(currentPlayer -> currentPlayer.getSessionId().equals(id))
                .findFirst();
        return player.orElse(null);
    }

}
