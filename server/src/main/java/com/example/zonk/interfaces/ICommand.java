package com.example.zonk.interfaces;

public interface ICommand {
    String name = null;
    String execute(String dataStr);
    boolean isThat(String command);
}
