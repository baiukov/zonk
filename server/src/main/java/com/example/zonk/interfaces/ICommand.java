package com.example.zonk.interfaces;

import com.example.zonk.enums.TaskStatuses;

public interface ICommand {
    String name = null;
    String status = TaskStatuses.UNEXECUTED;
    String getStatus();
    void setStatus(String status);
    String execute(String dataStr);
    boolean isThat(String command);
}
