package com.example.zonk.controllers.socket.commands;

import com.example.zonk.enums.TaskStatuses;

public interface ICommand {
    String name = null;
    String taskID = null;
    String status = TaskStatuses.UNEXECUTED;
    String getStatus();
    String getTaskID();
    void setStatus(String status);
    String execute(String dataStr);
    boolean isThat(String command);
    void setTaskID(String taskID);
}
