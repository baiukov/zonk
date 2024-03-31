package com.example.zonk.exeptions;

/**
 *  Vyjímká, která se může nastat během hry
 */
public class GameException extends Exception{

    /**
     * Konstruktor třídy specifikující zprávu vyjímky
     */
    public GameException(String message) {
        super(message);
    }
}
