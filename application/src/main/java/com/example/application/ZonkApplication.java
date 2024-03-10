package com.example.application;

import javafx.application.Application;
import javafx.scene.web.*;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

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

        stage.setScene(new Scene(webView, 1280, 896));
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }


}