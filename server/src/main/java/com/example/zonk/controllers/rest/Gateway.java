package com.example.zonk.controllers.rest;

import com.example.zonk.services.AppService;
import com.example.zonk.services.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@RestController()
@RequestMapping("/api")
@CrossOrigin
public class Gateway {

    private final AppService appService = new AppService();

    @GetMapping("/test")
    public String test() {
        return "Test";
    }

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

    @PostMapping("/closeGame")
    public ResponseEntity<String> closeGame(@RequestBody String dataStr) {
        try {
            this.appService.closeGame(dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

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
    public ResponseEntity<String> getPlayers(@RequestBody String dataStr) {
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

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody String dataStr) {
        try {
            String id = this.appService.authorisePlayer(dataStr);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/check")
    public ResponseEntity<String> check(@RequestBody String dataStr) {
        try {
            String status = this.appService.check(dataStr);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
