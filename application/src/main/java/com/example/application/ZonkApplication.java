package com.example.application;

import com.example.application.bridge.Bridge;
import javafx.application.Application;
import javafx.scene.web.*;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class ZonkApplication extends Application {

    public static SocketClient socketClient;
    @Override
    public void start(Stage stage) throws IOException, InterruptedException {

        socketClient = new SocketClient();
        socketClient.start();

        WebView webView = new WebView();
        webView.getEngine().getLoadWorker().exceptionProperty().addListener((obs, oldExc, newExc) -> {
            if (newExc != null) {
                newExc.printStackTrace();
            }
        });
        webView.getEngine().load("https://baiukov.github.io/zonk/client/");

        stage.setScene(new Scene(webView, 1280, 896));

        stage.show();

        Bridge bridge = new Bridge(webView.getEngine());

    }

    public static void main(String[] args) {
        System.setProperty("com.sun.javafx.web.enableRemoteDebugging", "true");
        launch();
    }


}