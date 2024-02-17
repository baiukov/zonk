package com.example.zonk.exeptions;

public class AuthorizationException extends Exception{

    public AuthorizationException(String message) {
        super(message);
    }
}
