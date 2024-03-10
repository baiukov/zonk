module com.example.application {
    requires javafx.controls;
    requires javafx.web;
    requires jdk.jsobject;


    opens com.example.application to javafx.fxml;
    exports com.example.application;
    exports com.example.application.bridge;
    opens com.example.application.bridge to javafx.fxml;
}