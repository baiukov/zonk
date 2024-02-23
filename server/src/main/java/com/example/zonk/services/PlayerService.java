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

    public Player addPlayer(String name) throws PlayerLoginException {
        Player player = this.getPlayer(name);
        if (player != null) {
            throw new PlayerLoginException("playerAlreadyExists");
        };
        Player newPlayer = new Player(name);
        players.add(newPlayer);
        return newPlayer;
    }

    public String checkPlayer(String name, String roomName) {
        Player player = this.getPlayer(name);
        if (player == null) {
            return PlayerStatuses.UNAUTHORISED;
        }
        RoomService roomService = new RoomService();
        Room room = roomService.getRoom(roomName);
        if (room != null) {
            return PlayerStatuses.INLOBBY;
        }
        return PlayerStatuses.UNKNOWN;
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
