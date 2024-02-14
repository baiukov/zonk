package com.example.zonk.controllers;

import com.example.zonk.services.AppService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api")
@CrossOrigin
public class LoginController {

    private final AppService appService = new AppService();

    @GetMapping("/test")
    public String test() {
        return "Test";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody String dataStr) {
        try {
            this.appService.authorisePlayer(dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
