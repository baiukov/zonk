package com.example.zonk.controllers;

import com.example.zonk.entities.Game;
import com.example.zonk.services.AppService;
import com.example.zonk.services.RoomService;
import org.json.JSONString;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api")
@CrossOrigin
public class LobbyController {

    private final AppService appService = new AppService();

    @PostMapping("/getRoom")
    public ResponseEntity<String> getRoom(@RequestBody String data) {
        try {
            String result = this.appService.getRoomByPlayerID(data);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/getPlayers")
    public ResponseEntity<String> login(@RequestBody String dataStr) {
        try {
            String result = this.appService.getPlayersByRoom(dataStr);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/createGame")
    public ResponseEntity<String> createGame(@RequestBody String dataStr) {
        try {
            this.appService.createGame(dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
