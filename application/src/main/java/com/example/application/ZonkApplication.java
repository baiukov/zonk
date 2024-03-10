package com.example.application;

import com.example.application.bridge.Bridge;
import javafx.application.Application;
import javafx.scene.web.*;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ZonkApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        WebView webView = new WebView();
        webView.getEngine().getLoadWorker().exceptionProperty().addListener((obs, oldExc, newExc) -> {
            if (newExc != null) {
                newExc.printStackTrace();
            }
        });
        webView.getEngine().load("https://baiukov.github.io/zonk/client/");

        webView.getEngine().setOnError(event -> {
            System.out.println("WebView Error: " + event.getMessage());
        });

        webView.getEngine().setOnAlert(event -> {
            System.out.println("WebView Alert: " + event.getData());
        });

        stage.setScene(new Scene(webView, 1280, 896));

        stage.show();

        Bridge bridge = new Bridge(webView.getEngine());
        try {
            bridge.sendDataToWebPage("Hello, world!");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void main(String[] args) {
        System.setProperty("com.sun.javafx.web.enableRemoteDebugging", "true");
        launch();
    }


}