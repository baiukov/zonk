package com.example.zonk.controllers;

import com.example.zonk.services.AppService;
import com.example.zonk.services.GameService;
import com.example.zonk.services.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@RestController()
@RequestMapping("/api")
@CrossOrigin
public class GameController {

    private final AppService appService = new AppService();

    private final GameService gameService = new GameService();

    @PostMapping("/getState")
    public ResponseEntity<String> getState(@RequestBody String dataStr) {

        try {
            String result = this.appService.getState(dataStr);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }

    }

    @PostMapping("/roll")
    public ResponseEntity<String> roll(@RequestBody String dataStr) {
        try {
            this.appService.roll(dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/addPlayer")
    public ResponseEntity<String> addPlayer(@RequestBody String dataStr) {
        try {
            this.appService.addPlayer(dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/submitRoll")
    public ResponseEntity<String> submitRoll(@RequestBody String dataStr) {
        try {
            this.appService.submitRoll(dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/reroll")
    public ResponseEntity<String> reroll(@RequestBody String dataStr) {
        try {
            this.appService.reroll(dataStr);
            return ResponseEntity.ok(null);
        } catch ( Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/checkCombination")
    public ResponseEntity<String> checkCombination(@RequestBody String dataStr) {
        try {
            String result = this.appService.checkCombination(dataStr);
            return ResponseEntity.ok(result);
        } catch(Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
