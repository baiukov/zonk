package com.example.zonk.controllers.websocket.commands;


import com.example.zonk.interfaces.ICommand;
import com.example.zonk.services.AppService;
import org.springframework.http.ResponseEntity;

public class Login implements ICommand {
    private final AppService appService;
    private String name = "api/login";

    public Login(AppService appService) {
        this.appService = appService;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isThat(String command) {
        return this.name.equals(command);
    }

    @Override
    public String execute(String dataStr) {
        try {
            String id = this.appService.authorisePlayer(dataStr);
            return id;
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
