package com.example.zonk.services;

import com.example.zonk.entities.Game;
import com.example.zonk.entities.Room;
import com.example.zonk.exeptions.GameException;
import com.example.zonk.exeptions.RoomDoesntExist;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class GameService {

    private final List<Game> games = new ArrayList<>();

    public void create(String roomName, int points) throws GameException {
        RoomService roomService = new RoomService();
        Optional<Room> room = roomService.getRoom(roomName);
        if (room.isEmpty()) {
            throw new GameException("RoomDoesntExist");
        }
        Game game = new Game(room.get(), points);
        new Thread(game);
        games.add(game);
    }

}
