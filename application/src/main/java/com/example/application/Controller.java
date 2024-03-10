package com.example.application;

import javafx.scene.control.Label;

public class Controller {
    private Label welcomeText;

    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }
}