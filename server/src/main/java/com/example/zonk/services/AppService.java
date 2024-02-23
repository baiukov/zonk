package com.example.zonk.services;

import com.example.zonk.entities.Game;
import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.exeptions.GameException;
import com.example.zonk.exeptions.PlayerLoginException;
import com.example.zonk.exeptions.RoomDoesntExist;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class AppService {

    GameService gameService = new GameService();
    PlayerService playerService = new PlayerService();
    RoomService roomService = new RoomService();


    public String authorisePlayer(String dataStr) throws PlayerLoginException {
        JSONObject data = new JSONObject(dataStr);
        String name = data.getString("name");
        String roomName = data.getString("room");
        Room room = roomService.addRoomIfAbsent(roomName);
        if (room.getPlayers().size() >= 4) {
            throw new PlayerLoginException("roomIsFull");
        }
        Player player = playerService.addPlayer(name);
        room.addPlayer(player);
        return player.getSessionId();
    }

    public String getPlayersByRoom(String dataStr) throws RoomDoesntExist {
        JSONObject data = new JSONObject(dataStr);
        String roomName = data.getString("room");
        Game game = this.gameService.getGameByRoomName(roomName);
        List<Player> playerList =  this.roomService.getPlayersByRoom(roomName);
        JSONObject json = new JSONObject();
        json.put("players", playerList);
        json.put("isInGame", game != null);
        return json.toString();
    }

    public String checkPlayer(String dataStr) {
        JSONObject data = new JSONObject(dataStr);
        String name = data.getString("name");
        String room = data.getString("room");
        return this.playerService.checkPlayer(name, room);
    }

    public String getRoomByPlayerID(String dataStr) {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id");
        return this.roomService.getRoomByPlayerID(id);
    }

    public void createGame(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String playerID = data.getString("id");
        int points = data.getInt("points");
        String room = this.roomService.getRoomByPlayerID(playerID);
        Game game = this.gameService.getGameByPlayerID(playerID);
        game = game != null ? game : this.gameService.getGameByRoomName(room);
        if (game != null) { return; }
        if (room == null) {
            throw new GameException("RoomDoesntExist");
        }
        System.out.println("created");
        this.gameService.create(room, points);
    }

    public String getState(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String playerID = data.getString("id");
        Game game = this.gameService.getGameByPlayerID(playerID);
        if (game == null) {
            throw new GameException("GameDoesntExist");
        }
        JSONObject state = game.getPlayerState(playerID);
        return state.toString();
    }

    public void roll(String dataStr) throws GameException, InterruptedException {
        JSONObject data = new JSONObject(dataStr);
        String playerID = data.getString("id");
        Game game = this.gameService.getGameByPlayerID(playerID);
        if (game == null) {
            throw new GameException("GameDoesntExist");
        }
        game.roll();
    }

    public void addPlayer(String dataStr) throws GameException, PlayerLoginException {
        JSONObject data = new JSONObject(dataStr);
        String roomName = data.getString("room");
        String id = data.getString("id");
        Game game = this.gameService.getGameByRoomName(roomName);
        Player player = this.playerService.getPlayerByID(id);
        if (game == null) {
            throw new GameException("GameDoesntExist");
        }
        if (player == null) {
            throw new PlayerLoginException("PlayerDoesntExist");
        }
        game.addPlayer(player);
    }
}
