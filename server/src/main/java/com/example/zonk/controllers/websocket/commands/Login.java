package com.example.zonk.controllers.websocket.commands;


import com.example.zonk.enums.TaskStatuses;
import com.example.zonk.interfaces.ICommand;
import com.example.zonk.services.AppService;
import org.springframework.http.ResponseEntity;

public class Login implements ICommand {
    private final AppService appService;
    private String name = "api/login";

    private String status = TaskStatuses.UNEXECUTED;

    public Login(AppService appService) {
        this.appService = appService;
    }

    public String getName() {
        return name;
    }
    public String getStatus() { return this.status; }

    public void setName(String name) {
        this.name = name;
    }
    public void setStatus(String status) { this.status = status;}
    public boolean isThat(String command) {
        return this.name.equals(command);
    }

    @Override
    public String execute(String dataStr) {
        try {
            this.status = TaskStatuses.SUCCESS;
            return this.appService.authorisePlayer(dataStr);
        } catch (Exception e) {
            this.status = TaskStatuses.ERROR;
            return e.getMessage();
        }
    }
}
