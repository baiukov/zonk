package com.example.zonk.services;

import com.example.zonk.entities.Game;
import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.enums.PlayerStatuses;
import com.example.zonk.exeptions.GameException;
import com.example.zonk.exeptions.PlayerLoginException;
import com.example.zonk.exeptions.RoomDoesntExist;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class AppService {

    GameService gameService = new GameService();
    PlayerService playerService = new PlayerService();
    RoomService roomService = new RoomService();


    public String authorisePlayer(String dataStr) throws PlayerLoginException {
        JSONObject data = new JSONObject(dataStr);
        String name = data.getString("name");
        String roomName = data.getString("room").replaceAll("\"", "");
        Room room = roomService.addRoomIfAbsent(roomName);
        if (room.getPlayers().size() >= 4) {
            String reason = "roomIsFull";
            log.warn("Player " + name + " hasn't been authorised to room " + roomName + " successfully. " +
                    "Caused by: " + reason);
            throw new PlayerLoginException(reason);
        }
        Player player = this.playerService.authorisePlayer(name, room);
        room.addPlayer(player);
        return player.getSessionId();
    }

    public JSONObject getPlayersByRoom(String dataStr) throws RoomDoesntExist {
        JSONObject data = new JSONObject(dataStr);
        String roomName = data.getString("room").replaceAll("\"", "");
        Game game = this.gameService.getGameByRoomName(roomName);
        List<Player> playerList =  this.roomService.getPlayersByRoom(roomName);
        JSONObject json = new JSONObject();
        json.put("players", playerList);
        json.put("isInGame", game != null);
        return json;
    }

    public String getRoomByPlayerID(String dataStr) {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        return this.roomService.getRoomByPlayerID(id);
    }

    public void createGame(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String playerID = data.getString("id").replaceAll("\"", "");
        int points = data.getInt("points");
        String room = this.roomService.getRoomByPlayerID(playerID);
        Game game = this.gameService.getGameByPlayerID(playerID);
        game = game != null ? game : this.gameService.getGameByRoomName(room);
        if (game != null) {
            String reason = "GameDoesAlreadyExist";
            log.warn("Game hasn't been created successfully. Caused by: " + reason);
            throw new GameException(reason);
        }
        if (room == null) {
            String reason = "RoomDoesntExist";
            log.warn("Game hasn't been created successfully. Caused by: " + reason);
            throw new GameException(reason);
        }
        this.gameService.create(room, points);
    }

    public JSONObject getState(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String playerID = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(playerID);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        return game.getPlayerState(playerID);
    }

    public void roll(String dataStr) throws GameException, InterruptedException {
        JSONObject data = new JSONObject(dataStr);
        String playerID = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(playerID);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        game.roll();
    }

    public String check(String dataStr) {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Player player = this.playerService.getPlayerByID(id);
        if (player == null) {
            log.warn("Cannot properly get player status. Caused by: playerDoesn'tExist");
            return PlayerStatuses.UNKNOWN;
        }
        return player.getStatus();
    }

    public void submitRoll(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(id);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        game.submitRoll();
    }

    public void reroll(String dataStr) throws GameException, InterruptedException {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Map<Integer, Integer> dices = this.getDicesMapped(data);
        Game game = this.gameService.getGameByPlayerID(id);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        game.reroll(dices);
    }

    public JSONObject checkCombination(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(id);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        Player player = this.playerService.getPlayerByID(id);
        boolean result = game.isACombination(this.getDicesMapped(data), player);
        JSONObject json = new JSONObject();
        json.put("result", result);
        return json;
    }

    public Map<Integer, Integer> getDicesMapped(JSONObject data) throws GameException {
        JSONObject dicesMap = data.getJSONObject("chosenDices");
        Map<String, Object> dicesStr = dicesMap.toMap();
        Map<Integer, Integer> dices = new HashMap<>();
        try {
            for (String key : dicesStr.keySet()) {
                Integer diceID = Integer.parseInt(key);
                Integer diceValue = (Integer) dicesStr.get(key);
                dices.put(diceID, diceValue);
            }
        } catch (Exception e) {
            throw new GameException(e.getMessage());
        }
        return dices;
    }

    public void closeGame(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(id);
        this.gameService.closeGame(game);
    }

    public void addPlayer(String dataStr) throws GameException, PlayerLoginException {
        JSONObject data = new JSONObject(dataStr);
        String roomName = data.getString("room");
        String id = data.getString("id");
        Game game = this.gameService.getGameByRoomName(roomName);
        Player player = this.playerService.getPlayerByID(id);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        if (player == null) {
            String reason = "PlayerDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new PlayerLoginException(reason);
        }
        game.addPlayer(player);
        log.info("Player " + player.getName() + " has been added to room " + roomName);
    }
}
