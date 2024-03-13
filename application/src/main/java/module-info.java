module com.example.application {
    requires javafx.controls;
    requires javafx.web;
    requires jdk.jsobject;
    requires jcef;
    requires java.desktop;
    requires jcefmaven;


    opens com.example.application to javafx.fxml;
    exports com.example.application;
}