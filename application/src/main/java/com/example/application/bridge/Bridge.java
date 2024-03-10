package com.example.application.bridge;

import javafx.scene.web.WebEngine;
import netscape.javascript.JSObject;
public class Bridge implements IBridge {
    private final WebEngine webEngine;

    public Bridge(WebEngine webEngine) {
        this.webEngine = webEngine;
        initializeJavaScriptBridge();
    }

    private void initializeJavaScriptBridge() {
        JSObject window = (JSObject) webEngine.executeScript("window");
        window.setMember("java", this);
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
}
