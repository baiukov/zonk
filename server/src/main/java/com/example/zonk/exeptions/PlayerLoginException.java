package com.example.zonk.exeptions;

/**
 *  Vyjímká, která se může nastat během příhlášení hráče
 */
public class PlayerLoginException extends Exception {

    /**
     * Konstruktor třídy specifikující zprávu vyjímky
     */
    public PlayerLoginException(String message) {
        super(message);
    }

}
