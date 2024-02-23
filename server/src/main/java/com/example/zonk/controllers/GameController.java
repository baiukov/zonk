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
            System.out.println(result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }

    }

}
