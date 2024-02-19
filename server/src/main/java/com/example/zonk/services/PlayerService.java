package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.enums.PlayerStatuses;
import com.example.zonk.exeptions.PlayerLoginException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PlayerService {

    private final List<Player> players = new ArrayList<>();

    public Player addPlayer(String name) throws PlayerLoginException {
        Optional<Player> player = this.getPlayer(name);
        if (player.isPresent()) {
            throw new PlayerLoginException("playerAlreadyExists");
        };
        Player newPlayer = new Player(name);
        players.add(newPlayer);
        return newPlayer;
    }

    public String checkPlayer(String name, String room) {
        Optional<Player> playerOptional = this.getPlayer(name);
        if (playerOptional.isEmpty()) {
            return PlayerStatuses.UNAUTHORISED;
        }
        RoomService roomService = new RoomService();
        Optional<Room> roomOptional = roomService.getRoom(room);
        if (roomOptional.isPresent()) {
            return PlayerStatuses.INLOBBY;
        }
        return PlayerStatuses.UNKNOWN;
    }

    public Optional<Player> getPlayer(String name) {
        return players
                .stream()
                .filter(currentPlayer -> currentPlayer.getName().equals(name))
                .findFirst();
    }

    public Optional<Player> getPlayerByID(String id) {
        return players
                .stream()
                .filter(currentPlayer -> currentPlayer.getSessionId().equals(id))
                .findFirst();
    }

}
