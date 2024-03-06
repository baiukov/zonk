package com.example.zonk.controllers.websocket.commands;


import com.example.zonk.enums.TaskStatuses;
import com.example.zonk.interfaces.ICommand;
import com.example.zonk.services.AppService;

public class Check implements ICommand {
    private final AppService appService;
    private String name = "api/check";

    private String status = TaskStatuses.UNEXECUTED;

    public Check(AppService appService) {
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
            return this.appService.check(dataStr);
        } catch (Exception e) {
            this.status = TaskStatuses.ERROR;
            return e.getMessage();
        }
    }
}