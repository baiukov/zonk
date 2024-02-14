package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.exeptions.PlayerAlreadyExistsException;
import org.json.JSONObject;

public class AppService {

    GameService gameService = new GameService();
    PlayerService playerService = new PlayerService();
    RoomService roomService = new RoomService();


    public void authorisePlayer(String dataStr) throws PlayerAlreadyExistsException {
        JSONObject data = new JSONObject(dataStr);
        String name = data.getString("name");
        String roomName = data.getString("room");
        Player player = playerService.addPlayer(name);
        Room room = roomService.addRoomIfAbsent(roomName);
        room.addPlayer(player);
    }
}
