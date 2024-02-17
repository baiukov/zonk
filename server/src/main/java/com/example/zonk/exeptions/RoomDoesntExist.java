package com.example.zonk.exeptions;

public class RoomDoesntExist extends Exception {

    public RoomDoesntExist(String message) {
        super(message);
    }
}
