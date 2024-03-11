package com.example.application.bridge;

import javafx.application.Platform;
import javafx.scene.web.WebEngine;

public class Bridge implements IBridge {
    private final WebEngine webEngine;

    public Bridge(WebEngine webEngine) {
        this.webEngine = webEngine;
    }

    @Override
    public void sendDataToWebPage(Object data) {
        webEngine.executeScript("window.receiveDataFromJava(" + convertToJSObject(data) + ")");
    }

    @Override
    public void receiveDataFromWebPage(Object data) {
        System.out.println("Received data from web page: " + data);
    }

    private String convertToJSObject(Object data) {
        return "{\"data\": \"" + data.toString() + "\"}";
    }

    public void exit() {
        Platform.exit();
    }

    public void log(String text) {
        System.out.println(text);
    }
}

