package com.example.zonk.exeptions;

/**
 *  Vyjímká, která se může nastat ověření hráčů v lobby
 */
public class RoomDoesntExist extends Exception {

    /**
     * Konstruktor třídy specifikující zprávu vyjímky
     */
    public RoomDoesntExist(String message) {
        super(message);
    }
}
