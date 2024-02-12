package com.example.zonk.controllers;

import com.example.zonk.services.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

@RestController()
@RequestMapping("/api")
public class LoginController {

    @GetMapping("/test")
    public String test() {
        return "Test";
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody JSONObject data) {

        try {
            String name = data.getString("name");
            String room = data.getString("room");

            PlayerService playerService = new PlayerService();
            playerService.addPlayer(name, room);

            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

}
