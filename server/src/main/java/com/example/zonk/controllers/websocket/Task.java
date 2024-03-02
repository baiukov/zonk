package com.example.zonk.controllers.websocket;

import com.example.zonk.interfaces.ICommand;

public class Task {

    private final String id;

    private final ICommand command;

    private boolean isSucceed;

    private String result;

    public Task(String id, ICommand command) {
        this.id = id;
        this.command = command;
    }

    public String getID() { return this.id; }
    public ICommand command() { return this.command; }
    public String getResult() { return this.result; }
    public boolean getIsSucceed() { return this.isSucceed; }
    public void setResult(String result) { this.result = result; }
    public void setIsSucceed(boolean isSucceed) { this.isSucceed = isSucceed;}
}
