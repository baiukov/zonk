package com.example.zonk.controllers.socket.commands;


import com.example.zonk.enums.TaskStatuses;
import com.example.zonk.services.AppService;
import org.json.JSONObject;

import java.util.Optional;

public class GetPlayers implements ICommand {
    private final AppService appService;
    private String name = "api/getPlayers";
    private String taskID;
    private String status = TaskStatuses.UNEXECUTED;

    public GetPlayers(AppService appService) {
        this.appService = appService;
    }

    public String getName() {
        return name;
    }
    public String getStatus() { return this.status; }
    public String getTaskID() { return this.taskID; }

    public void setName(String name) {
        this.name = name;
    }
    public void setStatus(String status) { this.status = status;}
    public boolean isThat(String command) {
        return this.name.equals(command);
    }

    public void setTaskID(String taskID) { this.taskID = taskID; }

    @Override
    public String execute(String dataStr) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("taskID", this.taskID);
        try {
            this.status = TaskStatuses.SUCCESS;
            jsonObject.put("status", TaskStatuses.SUCCESS);
            jsonObject.put("data", this.appService.getPlayersByRoom(dataStr));
            System.out.println("JSON" + jsonObject);
            return jsonObject.toString();
        } catch (Exception e) {
            this.status = TaskStatuses.ERROR;
            jsonObject.put("status", TaskStatuses.ERROR);
            jsonObject.put("data", e.getMessage());
            return jsonObject.toString();
        }
    }
}
