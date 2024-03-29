package com.example.zonk.controllers.rest;

import com.example.zonk.services.AppService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@RestController()
@RequestMapping("/api")
@CrossOrigin
@Slf4j
public class Gateway {

    private final AppService appService = new AppService();

    @GetMapping("/test")
    public String test() {
        return "Test";
    }

    @PostMapping("/getState")
    public ResponseEntity<String> getState(@RequestBody String dataStr) {
        try {
            String result = this.appService.getState(dataStr).toString();
            log.info("End point getState has been resolved. Input: " + dataStr + ". Output: " + result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }

    }

    @PostMapping("/roll")
    public ResponseEntity<String> roll(@RequestBody String dataStr) {
        try {
            this.appService.roll(dataStr);
            log.info("End point roll has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/submitRoll")
    public ResponseEntity<String> submitRoll(@RequestBody String dataStr) {
        try {
            this.appService.submitRoll(dataStr);
            log.info("End point submitRoll has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/reroll")
    public ResponseEntity<String> reroll(@RequestBody String dataStr) {
        try {
            this.appService.reroll(dataStr);
            log.info("End point reroll has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch ( Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/checkCombination")
    public ResponseEntity<String> checkCombination(@RequestBody String dataStr) {
        try {
            String result = this.appService.checkCombination(dataStr).toString();
            log.info("End point checkCombination has been resolved. Input: " + dataStr + ". Output: " + result);
            return ResponseEntity.ok(result);
        } catch(Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/closeGame")
    public ResponseEntity<String> closeGame(@RequestBody String dataStr) {
        try {
            this.appService.closeGame(dataStr);
            log.info("End point closeGame has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/getRoom")
    public ResponseEntity<String> getRoom(@RequestBody String data) {
        try {
            String result = this.appService.getRoomByPlayerID(data);
            log.info("End point getRoom has been resolved. Input: " + data + ". Output: " + result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/getPlayers")
    public ResponseEntity<String> getPlayers(@RequestBody String dataStr) {
        try {
            String result = this.appService.getPlayersByRoom(dataStr).toString();
            log.info("End point getPlayers has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/createGame")
    public ResponseEntity<String> createGame(@RequestBody String dataStr) {
        try {
            this.appService.createGame(dataStr);
            log.info("End point createGame has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody String dataStr) {
        try {
            String id = this.appService.authorisePlayer(dataStr);
            log.info("End point login has been resolved. Input: " + dataStr + ". Output: " + id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/check")
    public ResponseEntity<String> check(@RequestBody String dataStr) {
        try {
            String status = this.appService.check(dataStr);
            log.info("End point check has been resolved. Input: " + dataStr + ". Output: " + status);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
