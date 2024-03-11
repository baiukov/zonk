package com.example.application;

import com.example.application.bridge.Bridge;
import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.Worker;
import javafx.scene.web.*;
import javafx.scene.Scene;
import javafx.stage.Stage;
import netscape.javascript.JSObject;

import java.io.IOException;
import java.nio.file.Paths;

public class ZonkApplication extends Application {

    public static SocketClient socketClient;
    @Override
    public void start(Stage stage) throws IOException, InterruptedException {

        socketClient = new SocketClient();
        socketClient.start();

        WebView webView = new WebView();
        WebEngine webEngine = webView.getEngine();


        //webView.getEngine().load("https://baiukov.github.io/zonk/client/");

        stage.setScene(new Scene(webView, 800, 600));
        stage.show();

        webEngine.getLoadWorker().stateProperty().addListener((observable, oldValue, newValue) -> {
            JSObject window = (JSObject) webEngine.executeScript("window");
            window.setMember("java", new Bridge(webEngine));
            webEngine.executeScript("console.log = function(message) { java.log(message); }"); // Now where ever console.log is called in your html you will get a log in Java console
        });

        new Bridge(webView.getEngine());


        String htmlFilePath = "file://" + Paths.get("src", "main", "resources", "html", "index.html").toAbsolutePath();
        webEngine.load(htmlFilePath);

    }

    public static void main(String[] args) {
        System.setProperty("com.sun.javafx.web.enableRemoteDebugging", "true");
        launch();
    }

}

