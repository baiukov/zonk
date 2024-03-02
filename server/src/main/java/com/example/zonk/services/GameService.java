package com.example.zonk.services;

import com.example.zonk.entities.Game;
import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.enums.PlayerStatuses;
import com.example.zonk.exeptions.GameException;
import com.example.zonk.exeptions.RoomDoesntExist;

import java.util.*;

public class GameService {

    private static final List<Game> games = new ArrayList<>();

    private static final Map<Game, Thread> threads = new HashMap<>();

    public void create(String roomName, int points) throws GameException {
        RoomService roomService = new RoomService();
        Room room = roomService.getRoom(roomName);
        if (room == null) {
            throw new GameException("RoomDoesntExist");
        }
        Game game = new Game(room, points);
        Thread gameThread = new Thread(game);
        gameThread.start();
        games.add(game);
        threads.put(game, gameThread);
    }

    public Game getGameByPlayerID(String playerID) {
        Optional<Game> game = games
                .stream()
                .filter(
                        currentGame -> currentGame.getPlayers()
                                .stream()
                                .anyMatch(player -> player
                                        .getSessionId()
                                        .equals(playerID)
                                )
                )
                .findFirst();
        return game.orElse(null);
    }

    public Game getGameByRoomName(String roomName) {
        Optional<Game> game = games
                .stream()
                .filter(
                        currentGame -> currentGame
                                .getRoom()
                                .getName()
                                .equals(roomName)
                )
                .findFirst();
        return game.orElse(null);
    }

    public void closeGame(Game game) throws GameException {
        if (game == null) {
            throw new GameException("GameDoesntExist");
        }
        if (!game.isHasFinished()) {
            throw new GameException("GameHasntBeenFinished");
        }
        Thread thread = threads.get(game);
        thread.interrupt();
        for (Player player : game.getPlayers()) {
            player.setStatus(PlayerStatuses.INLOBBY);
        };
        game.setPlayers(null);
        games.remove(game);
    }
}
