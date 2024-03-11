/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./build/app.js":
/*!**********************!*\
  !*** ./build/app.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   App: () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _connection_connection_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection/connection.module.js */ \"./build/connection/connection.module.js\");\n/* harmony import */ var _game_game_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game/game.module.js */ \"./build/game/game.module.js\");\n/* harmony import */ var _language_language_module_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language/language.module.js */ \"./build/language/language.module.js\");\n/* harmony import */ var _lobby_lobby_module_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lobby/lobby.module.js */ \"./build/lobby/lobby.module.js\");\n/* harmony import */ var _login_login_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.module.js */ \"./build/login/login.module.js\");\n/* harmony import */ var _notifications_notifications_module_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifications/notifications.module.js */ \"./build/notifications/notifications.module.js\");\n\n\n\n\n\n\n\nvar App = /** @class */function () {\n  function App() {\n    new _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService();\n    new _connection_connection_module_js__WEBPACK_IMPORTED_MODULE_1__.ConnectionModule();\n    new _language_language_module_js__WEBPACK_IMPORTED_MODULE_3__.LanguageModule();\n    new _login_login_module_js__WEBPACK_IMPORTED_MODULE_5__.LoginModule();\n    new _notifications_notifications_module_js__WEBPACK_IMPORTED_MODULE_6__.NotificationsModule();\n    new _lobby_lobby_module_js__WEBPACK_IMPORTED_MODULE_4__.LobbyModule();\n    new _game_game_module_js__WEBPACK_IMPORTED_MODULE_2__.GameModule();\n  }\n  return App;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/app.js?");

/***/ }),

/***/ "./build/app.service.js":
/*!******************************!*\
  !*** ./build/app.service.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppService: () => (/* binding */ AppService)\n/* harmony export */ });\nvar AppService = /** @class */function () {\n  function AppService() {}\n  AppService.events = {};\n  AppService.on = function (eventName, event) {\n    AppService.events[eventName] = event;\n  };\n  AppService.emit = function (eventName, data) {\n    Object.getOwnPropertyNames(AppService.events).forEach(function (currentEvent) {\n      if (eventName != currentEvent) return;\n      AppService.events[currentEvent](data);\n    });\n  };\n  return AppService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/app.service.js?");

/***/ }),

/***/ "./build/connection/connection.controller.js":
/*!***************************************************!*\
  !*** ./build/connection/connection.controller.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ConnectionController: () => (/* binding */ ConnectionController)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n/* harmony import */ var _connection_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./connection.service.js */ \"./build/connection/connection.service.js\");\n\n\n\nvar ConnectionController = /** @class */function () {\n  function ConnectionController(connectionService) {\n    var _this = this;\n    this.connectionService = connectionService;\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.SetConnectionType, function (type) {\n      _this.connectionService.setConnectionType(type);\n    });\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, function (config) {\n      _this.connectionService.emitServer(config);\n    });\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.SetIP, function (ip) {\n      _connection_service_js__WEBPACK_IMPORTED_MODULE_2__.ConnectionService.setIP(ip);\n    });\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.PostTask, function (task) {\n      _this.connectionService.onPostTask(task);\n    });\n  }\n  return ConnectionController;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/connection/connection.controller.js?");

/***/ }),

/***/ "./build/connection/connection.module.js":
/*!***********************************************!*\
  !*** ./build/connection/connection.module.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ConnectionModule: () => (/* binding */ ConnectionModule)\n/* harmony export */ });\n/* harmony import */ var _connection_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connection.controller.js */ \"./build/connection/connection.controller.js\");\n/* harmony import */ var _connection_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection.service.js */ \"./build/connection/connection.service.js\");\n\n\nvar ConnectionModule = /** @class */function () {\n  function ConnectionModule() {\n    var connectionService = new _connection_service_js__WEBPACK_IMPORTED_MODULE_1__.ConnectionService();\n    new _connection_controller_js__WEBPACK_IMPORTED_MODULE_0__.ConnectionController(connectionService);\n  }\n  return ConnectionModule;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/connection/connection.module.js?");

/***/ }),

/***/ "./build/connection/connection.service.js":
/*!************************************************!*\
  !*** ./build/connection/connection.service.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ConnectionService: () => (/* binding */ ConnectionService)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_connectionTypes_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/connectionTypes.enum.js */ \"./build/enums/connectionTypes.enum.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n/* harmony import */ var _enums_TaskStatuses_enum_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums/TaskStatuses.enum.js */ \"./build/enums/TaskStatuses.enum.js\");\n\n\n\n\nvar ConnectionService = /** @class */function () {\n  function ConnectionService() {\n    var _this = this;\n    this.getConnectionType = function () {\n      return _this.connectionType;\n    };\n    this.setConnectionType = function (type) {\n      _this.connectionType = type;\n      localStorage.setItem(\"connectionType\", type);\n    };\n    this.checkConnectionType = function () {\n      var savedType = localStorage.getItem(\"connectionType\");\n      if (!savedType) {\n        _this.connectionType = _enums_connectionTypes_enum_js__WEBPACK_IMPORTED_MODULE_1__.ConnectionTypes.Rest;\n        return;\n      }\n      _this.connectionType = savedType;\n    };\n    this.checkIP = function () {\n      var storedIP = localStorage.getItem(\"ip\");\n      if (!storedIP) return;\n      ConnectionService.ip = storedIP.replaceAll('\"', '');\n    };\n    this.emitServer = function (config) {\n      console.log(_this.connectionType, config);\n      switch (_this.connectionType) {\n        case _enums_connectionTypes_enum_js__WEBPACK_IMPORTED_MODULE_1__.ConnectionTypes.Rest:\n          _this.emitRestServer(config);\n          break;\n        case _enums_connectionTypes_enum_js__WEBPACK_IMPORTED_MODULE_1__.ConnectionTypes.WebSockets:\n          _this.emitWebSocket(config);\n          break;\n        case _enums_connectionTypes_enum_js__WEBPACK_IMPORTED_MODULE_1__.ConnectionTypes.Sockets:\n          _this.getTask(config);\n      }\n    };\n    this.getTask = function (config) {\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_2__.Events.GetTask, config);\n    };\n    this.onPostTask = function (task) {\n      if (task.getStatus() === _enums_TaskStatuses_enum_js__WEBPACK_IMPORTED_MODULE_3__.TaskStatuses.Unexecuted) {\n        _this.emitSocketServer(task);\n      } else {\n        _this.resolveTask(task);\n      }\n    };\n    this.emitSocketServer = function (task) {\n      console.log(task.getEventName(), task.getID(), task.getOriginData());\n      // @ts-ignore\n      window.java.receiveDataFromWebPage(task.toJSONString());\n    };\n    this.receiveDataFromJava = function (dataStr) {\n      var data = JSON.parse(dataStr);\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_2__.Events.FetchTask, data);\n    };\n    this.resolveTask = function (task) {\n      var status = task.getStatus();\n      if (!task || status === _enums_TaskStatuses_enum_js__WEBPACK_IMPORTED_MODULE_3__.TaskStatuses.Unexecuted) {\n        return;\n      }\n      var response = task.getResponse();\n      if (!response) return;\n      if (status === _enums_TaskStatuses_enum_js__WEBPACK_IMPORTED_MODULE_3__.TaskStatuses.Successfull) {\n        task.getOnSuccess()(response);\n      } else {\n        task.getOnError()(response);\n      }\n    };\n    this.emitWebSocket = function (config) {\n      if (!_this.webSocket || _this.webSocket.CLOSED || _this.webSocket.CLOSING) {\n        _this.connectToWebSocket();\n      }\n      var dataToSend = JSON.stringify(config.data);\n      var messageHandler = function messageHandler(event) {\n        var data = event.data;\n        if (!data) return;\n        var messages = data.split(\" \");\n        var status = messages[0];\n        var response = messages[1];\n        if (status === _enums_TaskStatuses_enum_js__WEBPACK_IMPORTED_MODULE_3__.TaskStatuses.Unexecuted) return;\n        if (status === _enums_TaskStatuses_enum_js__WEBPACK_IMPORTED_MODULE_3__.TaskStatuses.Successfull) {\n          config.onSuccess(response);\n        } else {\n          config.onError(response);\n        }\n        // this.webSocket?.close()\n        // this.webSocket = undefined\n      };\n      var interval = setInterval(function () {\n        if (!_this.webSocket) return;\n        if (_this.webSocket.CONNECTING || !_this.webSocket.OPEN) return;\n        _this.webSocket.send(\"\".concat(config.eventName, \" \").concat(dataToSend));\n        _this.webSocket.onmessage = messageHandler;\n        clearInterval(interval);\n      }, 10);\n    };\n    this.connectToWebSocket = function () {\n      _this.webSocket = new WebSocket(\"ws://\".concat(ConnectionService.ip, \":8585/api/websockets\"));\n    };\n    this.emitRestServer = function (config) {\n      var str = JSON.stringify(config.data);\n      if (!ConnectionService.ip) {\n        return;\n      }\n      $.ajax({\n        url: \"http://\".concat(ConnectionService.ip, \":8080/\").concat(config.eventName),\n        type: \"POST\",\n        data: str,\n        contentType: 'application/json',\n        success: function success(response) {\n          config.onSuccess(response);\n        },\n        error: function error(xhr, status, _error) {\n          config.onError(xhr.responseText);\n        }\n      });\n    };\n    this.checkConnectionType();\n    this.checkIP();\n    // @ts-ignore\n    window.receiveDataFromJava = this.receiveDataFromJava;\n  }\n  ConnectionService.setIP = function (ip) {\n    ConnectionService.ip = ip;\n    localStorage.setItem(\"ip\", ip);\n  };\n  return ConnectionService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/connection/connection.service.js?");

/***/ }),

/***/ "./build/enums/TaskStatuses.enum.js":
/*!******************************************!*\
  !*** ./build/enums/TaskStatuses.enum.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TaskStatuses: () => (/* binding */ TaskStatuses)\n/* harmony export */ });\nvar TaskStatuses;\n(function (TaskStatuses) {\n  TaskStatuses[\"Unexecuted\"] = \"UNEXECUTED\";\n  TaskStatuses[\"Successfull\"] = \"SUCCESS\";\n  TaskStatuses[\"Error\"] = \"ERROR\";\n})(TaskStatuses || (TaskStatuses = {}));\n\n//# sourceURL=webpack://zonk/./build/enums/TaskStatuses.enum.js?");

/***/ }),

/***/ "./build/enums/connectionTypes.enum.js":
/*!*********************************************!*\
  !*** ./build/enums/connectionTypes.enum.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ConnectionTypes: () => (/* binding */ ConnectionTypes)\n/* harmony export */ });\nvar ConnectionTypes;\n(function (ConnectionTypes) {\n  ConnectionTypes[\"Rest\"] = \"Rest\";\n  ConnectionTypes[\"WebSockets\"] = \"WebSockets\";\n  ConnectionTypes[\"Sockets\"] = \"Sockets\";\n})(ConnectionTypes || (ConnectionTypes = {}));\n\n//# sourceURL=webpack://zonk/./build/enums/connectionTypes.enum.js?");

/***/ }),

/***/ "./build/enums/events.enum.js":
/*!************************************!*\
  !*** ./build/enums/events.enum.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Events: () => (/* binding */ Events)\n/* harmony export */ });\nvar Events;\n(function (Events) {\n  Events[\"Notify\"] = \"ShowNotification\";\n  Events[\"GetLanguage\"] = \"GetLanguage\";\n  Events[\"PostLanguage\"] = \"PostLanguage\";\n  Events[\"UpdatePlayerList\"] = \"UpdatePlayerList\";\n  Events[\"ClearPlayer\"] = \"ClearPlayer\";\n  Events[\"SetConnectionType\"] = \"SetConnectionType\";\n  Events[\"SetIP\"] = \"SetIP\";\n  Events[\"EmitServer\"] = \"EmitServer\";\n  Events[\"GetTask\"] = \"GetTask\";\n  Events[\"PostTask\"] = \"PostTask\";\n  Events[\"FetchTask\"] = \"FetchTask\";\n})(Events || (Events = {}));\n\n//# sourceURL=webpack://zonk/./build/enums/events.enum.js?");

/***/ }),

/***/ "./build/enums/gameStatuses.enum.js":
/*!******************************************!*\
  !*** ./build/enums/gameStatuses.enum.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameStatuses: () => (/* binding */ GameStatuses)\n/* harmony export */ });\nvar GameStatuses;\n(function (GameStatuses) {\n  GameStatuses[\"WAITING\"] = \"Waiting\";\n  GameStatuses[\"ROLLING\"] = \"Rolling\";\n  GameStatuses[\"PENDING\"] = \"Pending\";\n})(GameStatuses || (GameStatuses = {}));\n\n//# sourceURL=webpack://zonk/./build/enums/gameStatuses.enum.js?");

/***/ }),

/***/ "./build/enums/playerStatus.enum.js":
/*!******************************************!*\
  !*** ./build/enums/playerStatus.enum.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PlayerStatus: () => (/* binding */ PlayerStatus)\n/* harmony export */ });\nvar PlayerStatus;\n(function (PlayerStatus) {\n  PlayerStatus[\"UNKNOWN\"] = \"unknown\";\n  PlayerStatus[\"UNAUTHORISED\"] = \"unauthorised\";\n  PlayerStatus[\"INLOBBY\"] = \"inlobby\";\n  PlayerStatus[\"INGAME\"] = \"ingame\";\n})(PlayerStatus || (PlayerStatus = {}));\n\n//# sourceURL=webpack://zonk/./build/enums/playerStatus.enum.js?");

/***/ }),

/***/ "./build/enums/serverEvents.enum.js":
/*!******************************************!*\
  !*** ./build/enums/serverEvents.enum.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ServerEvents: () => (/* binding */ ServerEvents)\n/* harmony export */ });\nvar ServerEvents;\n(function (ServerEvents) {\n  ServerEvents[\"Login\"] = \"api/login\";\n  ServerEvents[\"GetPlayers\"] = \"api/getPlayers\";\n  ServerEvents[\"Check\"] = \"api/check\";\n  ServerEvents[\"GetRoom\"] = \"api/getRoom\";\n  ServerEvents[\"StartGame\"] = \"api/createGame\";\n  ServerEvents[\"UpdateState\"] = \"api/getState\";\n  ServerEvents[\"AddPlayer\"] = \"api/addPlayer\";\n  ServerEvents[\"Roll\"] = \"api/roll\";\n  ServerEvents[\"SubmitRoll\"] = \"api/submitRoll\";\n  ServerEvents[\"Reroll\"] = \"api/reroll\";\n  ServerEvents[\"CheckCombination\"] = \"api/checkCombination\";\n  ServerEvents[\"CloseGame\"] = \"api/closeGame\";\n})(ServerEvents || (ServerEvents = {}));\n\n//# sourceURL=webpack://zonk/./build/enums/serverEvents.enum.js?");

/***/ }),

/***/ "./build/game/game.controller.js":
/*!***************************************!*\
  !*** ./build/game/game.controller.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameController: () => (/* binding */ GameController)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n\n\nvar GameController = /** @class */function () {\n  function GameController(gameService) {\n    var _this = this;\n    this.gameService = gameService;\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.PostLanguage, function (newLanguage) {\n      _this.gameService.setCurrentLanguage(newLanguage);\n    });\n  }\n  return GameController;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/game/game.controller.js?");

/***/ }),

/***/ "./build/game/game.module.js":
/*!***********************************!*\
  !*** ./build/game/game.module.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameModule: () => (/* binding */ GameModule)\n/* harmony export */ });\n/* harmony import */ var _game_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.controller.js */ \"./build/game/game.controller.js\");\n/* harmony import */ var _game_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.service.js */ \"./build/game/game.service.js\");\n\n\nvar GameModule = /** @class */function () {\n  function GameModule() {\n    var gameService = new _game_service_js__WEBPACK_IMPORTED_MODULE_1__.GameService();\n    new _game_controller_js__WEBPACK_IMPORTED_MODULE_0__.GameController(gameService);\n  }\n  return GameModule;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/game/game.module.js?");

/***/ }),

/***/ "./build/game/game.service.js":
/*!************************************!*\
  !*** ./build/game/game.service.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameService: () => (/* binding */ GameService)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n/* harmony import */ var _enums_gameStatuses_enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/gameStatuses.enum.js */ \"./build/enums/gameStatuses.enum.js\");\n/* harmony import */ var _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums/serverEvents.enum.js */ \"./build/enums/serverEvents.enum.js\");\n/* harmony import */ var _language_language_config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../language/language.config.js */ \"./build/language/language.config.js\");\n/* harmony import */ var _utils_getID_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getID.js */ \"./build/utils/getID.js\");\n/* harmony import */ var _utils_secToMs_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/secToMs.js */ \"./build/utils/secToMs.js\");\n/* harmony import */ var _utils_showPlayers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/showPlayers.js */ \"./build/utils/showPlayers.js\");\n/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./game.view.js */ \"./build/game/game.view.js\");\n\n\n\n\n\n\n\n\n\nvar GameService = /** @class */function () {\n  function GameService() {\n    var _this = this;\n    this.currentLanguage = \"ENG\";\n    this.view = new _game_view_js__WEBPACK_IMPORTED_MODULE_8__.GameView();\n    this.intervals = {\n      diceAnimInterval: null,\n      numberAnimInterval: null\n    };\n    this.selectedDices = [];\n    this.bannedDices = [];\n    this.setCurrentLanguage = function (language) {\n      _this.currentLanguage = language;\n    };\n    this.watch = function () {\n      $(\"#roll\").click(_this.roll);\n      $(\"#reroll\").click(_this.checkCombination);\n      $(\"#submitRoll\").click(_this.submitRoll);\n    };\n    this.submitRoll = function () {\n      var id = (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_5__.getID)();\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n        eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.SubmitRoll,\n        data: {\n          id: id\n        },\n        onSuccess: function onSuccess(_) {\n          _this.selectedDices = [];\n          _this.bannedDices = [];\n        },\n        onError: function onError(_) {}\n      });\n      return false;\n    };\n    this.checkCombination = function () {\n      if (_this.selectedDices.length === 0) {\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, _language_language_config_js__WEBPACK_IMPORTED_MODULE_4__.languageConfig[_this.currentLanguage].pickOne);\n        return;\n      }\n      var id = (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_5__.getID)();\n      var chosenDices = {};\n      for (var i = 0; i < _this.selectedDices.length; i++) {\n        var diceID = _this.selectedDices[i];\n        chosenDices[diceID] = _this.getDiceAmount(diceID);\n      }\n      var data = {\n        id: id,\n        chosenDices: chosenDices\n      };\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n        eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.CheckCombination,\n        data: data,\n        onSuccess: function onSuccess(response) {\n          if (JSON.parse(response).result) {\n            _this.reroll(data);\n          } else {\n            _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, _language_language_config_js__WEBPACK_IMPORTED_MODULE_4__.languageConfig[_this.currentLanguage].wrongCombination);\n          }\n        },\n        onError: function onError(message) {\n          _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, message);\n          return false;\n        }\n      });\n      return false;\n    };\n    this.reroll = function (data) {\n      $(\".click-handler\").click(function () {\n        return false;\n      });\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n        eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.Reroll,\n        data: data,\n        onSuccess: function onSuccess(_) {\n          for (var i = 0; i < 6; i++) {\n            if (_this.selectedDices.includes(i)) continue;\n            _this.playDiceAnim(i, (0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_6__.secToMs)(5), Math.round(Math.random() * 5 + 1));\n          }\n        },\n        onError: function onError(_) {}\n      });\n      return false;\n    };\n    this.getDiceAmount = function (diceID) {\n      var allDices = $(\".dice\");\n      var amount = 0;\n      allDices.each(function (i) {\n        var dice = allDices[i];\n        var diceIDStr = $(dice).attr(\"id\");\n        if (!diceIDStr) return undefined;\n        var currentDiceID = parseInt(diceIDStr[diceIDStr.length - 1]);\n        if (currentDiceID !== diceID) return undefined;\n        var diceChildren = $(dice).children(\"div\");\n        var dots = diceChildren[0];\n        var dotsAmountStr = $(dots).attr(\"class\");\n        if (!dotsAmountStr) return undefined;\n        var dotsAmount = parseInt(dotsAmountStr[dotsAmountStr.length - 1]);\n        amount = dotsAmount;\n      });\n      return amount;\n    };\n    this.roll = function () {\n      for (var i = 0; i < 6; i++) {\n        if (_this.selectedDices.includes(i)) continue;\n        _this.playDiceAnim(i, (0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_6__.secToMs)(5), Math.round(Math.random() * 5 + 1));\n      }\n      var id = (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_5__.getID)();\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n        eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.Roll,\n        data: {\n          id: id\n        },\n        onSuccess: function onSuccess(_) {},\n        onError: function onError(_) {}\n      });\n      return false;\n    };\n    this.watchUpdate = function () {\n      if (window.location.pathname != \"/pages/game/\") return;\n      setInterval(function () {\n        var id = (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_5__.getID)();\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n          eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.UpdateState,\n          data: {\n            id: id\n          },\n          onSuccess: function onSuccess(response) {\n            _this.update(response);\n          },\n          onError: function onError(error) {\n            _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n            window.location.href = \"../lobby\";\n          }\n        });\n      }, 100);\n    };\n    this.update = function (dataStr) {\n      var data = JSON.parse(dataStr);\n      if (!data) {\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, _language_language_config_js__WEBPACK_IMPORTED_MODULE_4__.languageConfig[_this.currentLanguage].smthWrong);\n        return;\n      }\n      var status = data.status;\n      var isTurn = data.turn;\n      _this.checkTurn(isTurn, status);\n      _this.setPoints($(\"#totalPoints\"), data.total);\n      _this.setPoints($(\"#goalPoints\"), data.goal);\n      (0,_utils_showPlayers_js__WEBPACK_IMPORTED_MODULE_7__.showPlayers)(data);\n      _this.setDicesForNotTurn(status, isTurn, data.bannedDices);\n      _this.updateDices(data.dices, status, data.bannedDices);\n      _this.setCurrentPoints(data.currentPoints);\n      _this.checkButtonsVisibilty(status, isTurn);\n      _this.selectedUpdate();\n      _this.checkWin(data.winner, data.turn);\n    };\n    this.checkWin = function (winner, turn) {\n      if (!winner) return;\n      $(\".win\").show();\n      $(\"#winner\").text(winner);\n      setTimeout(function () {\n        if (!turn) {\n          window.location.href = \"../lobby\";\n          return;\n        }\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n          eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.CloseGame,\n          data: {\n            id: (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_5__.getID)()\n          },\n          onSuccess: function onSuccess(_) {\n            window.location.href = \"../lobby\";\n          },\n          onError: function onError(error) {\n            _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n          }\n        });\n      }, (0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_6__.secToMs)(10));\n    };\n    this.selectedUpdate = function () {\n      for (var i = 0; i < 6; i++) {\n        var element = $(\"#dice\".concat(i));\n        if (_this.selectedDices.includes(i)) {\n          if ($(element).hasClass('selected')) return;\n          $(element).addClass('selected');\n          return;\n        }\n        $(element).removeClass('selected');\n      }\n    };\n    this.checkButtonsVisibilty = function (status, turn) {\n      if (turn && status != _enums_gameStatuses_enum_js__WEBPACK_IMPORTED_MODULE_2__.GameStatuses.PENDING) {\n        $(\"#roll\").show();\n        $(\"#roll\").removeAttr(\"disabled\");\n      } else {\n        $(\"#roll\").attr(\"disabled\");\n      }\n      if (status != _enums_gameStatuses_enum_js__WEBPACK_IMPORTED_MODULE_2__.GameStatuses.PENDING || !turn) {\n        $(\"#reroll\").hide();\n        $(\"#submitRoll\").hide();\n        $(\"#roll\").show();\n      }\n      if (status === _enums_gameStatuses_enum_js__WEBPACK_IMPORTED_MODULE_2__.GameStatuses.PENDING && turn && !$(\"#reroll\").is(\":visible\")) {\n        $(\"#roll\").hide();\n        $(\"#submitRoll\").show();\n        $(\"#reroll\").show();\n      }\n      if (status === _enums_gameStatuses_enum_js__WEBPACK_IMPORTED_MODULE_2__.GameStatuses.ROLLING) {\n        $(\"#roll\").attr(\"disabled\", '');\n      }\n    };\n    this.setCurrentPoints = function (currentPoints) {\n      var element = $(\"#currentPoints\");\n      if (parseInt($(element).text()) === currentPoints || _this.intervals.numberAnimInterval) return;\n      _this.playNumbersAnim(element, parseInt($(element).text()) || 0, currentPoints);\n    };\n    this.updateDices = function (dices, status, dataBannedDices) {\n      var bannedDices = [];\n      for (var i = 0; i < dataBannedDices.length; i++) {\n        if (dataBannedDices[i] == 0) continue;\n        bannedDices.push(i);\n      }\n      if (!dices || status == _enums_gameStatuses_enum_js__WEBPACK_IMPORTED_MODULE_2__.GameStatuses.ROLLING) return;\n      for (var i = 0; i < dices.length; i++) {\n        _this.setDice(i, dices[i], !bannedDices.includes(i));\n      }\n      bannedDices.forEach(function (dice) {\n        if (_this.selectedDices.includes(dice)) return;\n        _this.selectedDices.push(dice);\n      });\n    };\n    this.setPoints = function (element, points) {\n      var currentPoints = parseInt(element.text());\n      if (currentPoints === points) return;\n      element.text(points);\n    };\n    this.checkTurn = function (turn, status) {\n      if (turn || status != _enums_gameStatuses_enum_js__WEBPACK_IMPORTED_MODULE_2__.GameStatuses.ROLLING || _this.intervals.diceAnimInterval) return;\n      for (var i = 0; i < 6; i++) {\n        _this.playDiceAnim(i, (0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_6__.secToMs)(5.2), 1);\n      }\n    };\n    this.setDicesForNotTurn = function (status, turn, bannedDices) {\n      if (status != _enums_gameStatuses_enum_js__WEBPACK_IMPORTED_MODULE_2__.GameStatuses.ROLLING) return;\n      if (turn) return;\n      $(\"#roll\").attr(\"disabled\", '');\n      var dicesToRoll = [0, 1, 2, 3, 4, 5];\n      if (bannedDices) {\n        for (var i = 0; i < bannedDices.length; i++) {\n          dicesToRoll.splice(dicesToRoll.indexOf(bannedDices[i]), 1);\n        }\n      }\n      dicesToRoll.forEach(function (dice) {\n        _this.playDiceAnim(dice, 5, 1);\n      });\n    };\n    this.init = function () {\n      $(\"#roll\").hide();\n      $(\"#reroll\").hide();\n      $(\"#submitRoll\").hide();\n      for (var i = 0; i < 6; i++) {\n        _this.setDice(i, i + 1, true);\n      }\n    };\n    this.playDiceAnim = function (diceID, time, correctValue) {\n      var nextTimeToSwitch = time * 0.01;\n      var currentTime = 0;\n      var interval = setInterval(function () {\n        _this.intervals.diceAnimInterval = interval;\n        if (currentTime >= nextTimeToSwitch) {\n          var randomDice = Math.round(Math.random() * 5 + 1);\n          _this.setDice(diceID, randomDice, false);\n          nextTimeToSwitch *= 1.15;\n        }\n        if (currentTime >= time) {\n          _this.setDice(diceID, correctValue, true);\n          _this.intervals.diceAnimInterval = null;\n          clearInterval(interval);\n          return;\n        }\n        currentTime += 50;\n      }, 50);\n    };\n    this.setDice = function (diceID, amount, isClickable) {\n      var diceField = $(\".dices\");\n      var dices = diceField.children(\"div\");\n      var setDiceToChild = function setDiceToChild(i) {\n        var currentDice = dices[i];\n        var currentDiceStr = $(currentDice).attr(\"id\");\n        if (!currentDiceStr) {\n          return;\n        }\n        var currentDiceID = currentDiceStr[currentDiceStr.length - 1];\n        if (parseInt(currentDiceID) != diceID) return;\n        var diceChildren = $(currentDice).children(\"div\");\n        if (!diceChildren) return;\n        var diceFirstChild = diceChildren[0];\n        var diceFirstChildIDStr = $(diceFirstChild).attr(\"class\");\n        if (diceFirstChildIDStr) {\n          var diceFirstChildAmount = diceFirstChildIDStr[diceFirstChildIDStr.length - 1];\n          if (parseInt(diceFirstChildAmount) === amount) return;\n        }\n        $(currentDice).empty();\n        _this.view.setDiceAmount(currentDice, amount);\n        _this.view.setClickHandler(parseInt(currentDiceID), _this.selectedDices, isClickable, _this.bannedDices);\n      };\n      dices.each(function (i) {\n        setDiceToChild(i);\n      });\n    };\n    this.init();\n    this.watch();\n    this.watchUpdate();\n  }\n  GameService.prototype.playNumbersAnim = function (element, start, stop) {\n    var _this = this;\n    if (start === 0 && stop === 0) {\n      $(element).text(0);\n      return;\n    }\n    var interval = 10;\n    var difference = Math.abs(start - stop);\n    var temp = start > stop ? stop : start;\n    this.intervals.numberAnimInterval = setInterval(function () {\n      if (temp >= stop && start <= stop || temp <= stop && start >= stop) {\n        clearInterval(_this.intervals.numberAnimInterval || undefined);\n        _this.intervals.numberAnimInterval = null;\n        $(element).text(stop.toFixed(0));\n        return;\n      }\n      if (start < stop) {\n        temp += difference * 0.01;\n      } else {\n        temp -= difference * 0.01;\n      }\n      $(element).text(temp.toFixed(0));\n    }, interval);\n  };\n  return GameService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/game/game.service.js?");

/***/ }),

/***/ "./build/game/game.view.js":
/*!*********************************!*\
  !*** ./build/game/game.view.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameView: () => (/* binding */ GameView)\n/* harmony export */ });\nvar GameView = /** @class */function () {\n  function GameView() {\n    this.setDiceAmount = function (element, amount) {\n      if (amount === 5) {\n        var dotsFirst = $(\"<div class='dots5'></div>\");\n        var dotsSecond = $(\"<div class='dots51'></div>\");\n        var dotsThird = $(\"<div class='dots5'></div>\");\n        $(dotsFirst).append($(\"<div class='dot'></div>\"));\n        $(dotsFirst).append($(\"<div class='dot'></div>\"));\n        $(dotsSecond).append($(\"<div class='dot'></div>\"));\n        $(dotsThird).append($(\"<div class='dot'></div>\"));\n        $(dotsThird).append($(\"<div class='dot'></div>\"));\n        $(element).append(dotsFirst, dotsSecond, dotsThird);\n        return;\n      }\n      var newDots = document.createElement(\"div\");\n      $(newDots).addClass(\"dots\" + amount);\n      for (var i = 0; i < amount; i++) {\n        var dot = document.createElement(\"div\");\n        $(dot).addClass(\"dot\");\n        $(newDots).append(dot);\n      }\n      $(element).append(newDots);\n    };\n    this.setClickHandler = function (id, selectedDices, isClickable, bannedDices) {\n      if ($(\"clickHandler\".concat(id)).length > 0) return;\n      var clickHandler = document.createElement(\"div\");\n      $(clickHandler).addClass(\"click-handler\");\n      $(clickHandler).attr(\"id\", \"clickHandler\" + id);\n      if (isClickable && !bannedDices.includes(id)) {\n        $(clickHandler).click(function (event) {\n          var idStr = $(event.target).attr(\"id\");\n          var id = parseInt(idStr === null || idStr === void 0 ? void 0 : idStr.charAt(idStr.length - 1));\n          if (!selectedDices.includes(id)) {\n            $(\"#dice\".concat(id)).addClass(\"selected\");\n            selectedDices.push(id);\n          } else {\n            $(\"#dice\".concat(id)).removeClass(\"selected\");\n            selectedDices.splice(selectedDices.indexOf(id), 1);\n          }\n        });\n      } else {\n        $(clickHandler).click(function () {});\n      }\n      $(\"#dice\".concat(id)).append(clickHandler);\n    };\n  }\n  return GameView;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/game/game.view.js?");

/***/ }),

/***/ "./build/index.js":
/*!************************!*\
  !*** ./build/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ \"./build/app.js\");\n\nnew _app_js__WEBPACK_IMPORTED_MODULE_0__.App();\n\n//# sourceURL=webpack://zonk/./build/index.js?");

/***/ }),

/***/ "./build/language/language.config.js":
/*!*******************************************!*\
  !*** ./build/language/language.config.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   languageConfig: () => (/* binding */ languageConfig)\n/* harmony export */ });\nvar languageConfig = {\n  \"ENG\": {\n    name: \"Nickname\",\n    room: \"Room name\",\n    go: \"Go\",\n    ip: \"Ip\",\n    players: \"Players:\",\n    goalTitle: \"Goal:\",\n    goal: \"goal points\",\n    start: \"Start\",\n    pts: \"pts\",\n    total: \"total\",\n    submitRoll: \"enough\",\n    reroll: \"reroll\",\n    won: \"has won!\",\n    congratulation: \"CONGRATULATIONS!\",\n    playerAlreadyExists: \"Player already exists\",\n    playerDoesntExist: \"Player is not found\",\n    roomDoesntExist: \"Room is not found\",\n    defaultError: \"Some issue has happened\",\n    roomIsFull: \"Room is full\",\n    smthWrong: \"Something went wrong\",\n    serverUnreachable: \"Server is unreachable\",\n    ipIsIncorrect: \"IP address is not correct\",\n    pickOne: \"You should select a combination dice(-s) to reroll\",\n    wrongCombination: \"Choosen dices are not a combination\"\n  }\n};\n\n//# sourceURL=webpack://zonk/./build/language/language.config.js?");

/***/ }),

/***/ "./build/language/language.controller.js":
/*!***********************************************!*\
  !*** ./build/language/language.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LanguageController: () => (/* binding */ LanguageController)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n\n\nvar LanguageController = /** @class */function () {\n  function LanguageController(languageService) {\n    var _this = this;\n    this.languageService = languageService;\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.GetLanguage, function () {\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.PostLanguage, _this.languageService.getLanguage());\n    });\n  }\n  return LanguageController;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/language/language.controller.js?");

/***/ }),

/***/ "./build/language/language.module.js":
/*!*******************************************!*\
  !*** ./build/language/language.module.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LanguageModule: () => (/* binding */ LanguageModule)\n/* harmony export */ });\n/* harmony import */ var _language_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language.controller.js */ \"./build/language/language.controller.js\");\n/* harmony import */ var _language_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language.service.js */ \"./build/language/language.service.js\");\n\n\nvar LanguageModule = /** @class */function () {\n  function LanguageModule() {\n    var languageService = new _language_service_js__WEBPACK_IMPORTED_MODULE_1__.LanguageService();\n    new _language_controller_js__WEBPACK_IMPORTED_MODULE_0__.LanguageController(languageService);\n  }\n  return LanguageModule;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/language/language.module.js?");

/***/ }),

/***/ "./build/language/language.service.js":
/*!********************************************!*\
  !*** ./build/language/language.service.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LanguageService: () => (/* binding */ LanguageService)\n/* harmony export */ });\n/* harmony import */ var _language_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language.config.js */ \"./build/language/language.config.js\");\n\nvar LanguageService = /** @class */function () {\n  function LanguageService() {\n    var _this = this;\n    this.language = \"ENG\";\n    this.getLanguage = function () {\n      return _this.language;\n    };\n    this.setLanguage = function (language) {\n      _this.language = language;\n    };\n    this.update = function (langName) {\n      var language = _language_config_js__WEBPACK_IMPORTED_MODULE_0__.languageConfig[langName];\n      Object.keys(language).forEach(function (id) {\n        var element = $(\"#\" + id);\n        if (!element) return;\n        var text = language[id];\n        switch (element.prop(\"nodeName\")) {\n          case \"INPUT\":\n            $(element).attr(\"placeholder\", text);\n            break;\n          default:\n            $(element).text(text);\n        }\n      });\n    };\n    document.addEventListener(\"DOMContentLoaded\", function () {\n      _this.update(_this.language);\n    });\n  }\n  return LanguageService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/language/language.service.js?");

/***/ }),

/***/ "./build/lobby/lobby.controller.js":
/*!*****************************************!*\
  !*** ./build/lobby/lobby.controller.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LobbyController: () => (/* binding */ LobbyController)\n/* harmony export */ });\nvar LobbyController = /** @class */function () {\n  function LobbyController(lobbyService) {\n    this.lobbyService = lobbyService;\n  }\n  return LobbyController;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/lobby/lobby.controller.js?");

/***/ }),

/***/ "./build/lobby/lobby.module.js":
/*!*************************************!*\
  !*** ./build/lobby/lobby.module.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LobbyModule: () => (/* binding */ LobbyModule)\n/* harmony export */ });\n/* harmony import */ var _lobby_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lobby.controller.js */ \"./build/lobby/lobby.controller.js\");\n/* harmony import */ var _lobby_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lobby.service.js */ \"./build/lobby/lobby.service.js\");\n\n\nvar LobbyModule = /** @class */function () {\n  function LobbyModule() {\n    var lobbyService = new _lobby_service_js__WEBPACK_IMPORTED_MODULE_1__.LobbyService();\n    new _lobby_controller_js__WEBPACK_IMPORTED_MODULE_0__.LobbyController(lobbyService);\n  }\n  return LobbyModule;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/lobby/lobby.module.js?");

/***/ }),

/***/ "./build/lobby/lobby.service.js":
/*!**************************************!*\
  !*** ./build/lobby/lobby.service.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LobbyService: () => (/* binding */ LobbyService)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n/* harmony import */ var _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/serverEvents.enum.js */ \"./build/enums/serverEvents.enum.js\");\n/* harmony import */ var _utils_getID_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getID.js */ \"./build/utils/getID.js\");\n/* harmony import */ var _utils_secToMs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/secToMs.js */ \"./build/utils/secToMs.js\");\n/* harmony import */ var _utils_showPlayers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/showPlayers.js */ \"./build/utils/showPlayers.js\");\n\n\n\n\n\n\nvar LobbyService = /** @class */function () {\n  function LobbyService() {\n    var _this = this;\n    this.watch = function () {\n      $(\"#start\").click(function () {\n        var id = (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_3__.getID)();\n        var points = $(\"#goal\").val();\n        if (!id || !points) return;\n        var data = {\n          \"id\": id,\n          \"points\": points\n        };\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n          eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.StartGame,\n          data: data,\n          onSuccess: function onSuccess(response) {\n            window.location.href = \"../game\";\n          },\n          onError: function onError(error) {\n            console.log(error);\n          }\n        });\n        return false;\n      });\n    };\n    this.setUpdateInterval = function () {\n      if (window.location.pathname != \"/pages/lobby/\") return;\n      _this.updatePlayerList();\n      _this.roomInterval = setInterval(function () {\n        _this.updatePlayerList();\n      }, (0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_4__.secToMs)(0.5));\n    };\n    this.updatePlayerList = function () {\n      var dataStr = localStorage.getItem(\"currentPlayer\");\n      if (!dataStr) return;\n      var data = JSON.parse(dataStr);\n      if (!data) return;\n      var id = data.sessionID;\n      if (!id) return;\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n        eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.GetRoom,\n        data: {\n          id: id\n        },\n        onSuccess: function onSuccess(roomName) {\n          _this.getPlayers(roomName, id);\n          _this.setRoom();\n        },\n        onError: function onError(error) {\n          _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n          _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.ClearPlayer, 0);\n        }\n      });\n    };\n    this.setRoom = function () {\n      if (window.location.pathname != \"/pages/lobby/\") {\n        window.location.href = \"./pages/lobby\";\n      }\n    };\n    this.getPlayers = function (roomName, id) {\n      var data = {\n        room: roomName\n      };\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n        eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.GetPlayers,\n        data: data,\n        onSuccess: function onSuccess(response) {\n          _this.update(response, roomName, id);\n        },\n        onError: function onError(error) {\n          _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n          window.location.href = \"\";\n          localStorage.removeItem(\"currentPlayer\");\n        }\n      });\n    };\n    this.update = function (dataStr, room, id) {\n      var data = JSON.parse(dataStr);\n      (0,_utils_showPlayers_js__WEBPACK_IMPORTED_MODULE_5__.showPlayers)(data);\n      if (!data.isInGame) return;\n      window.location.href = \"../game\";\n      var dataToSend = {\n        id: id,\n        room: room\n      };\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n        eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.AddPlayer,\n        data: dataToSend,\n        onSuccess: function onSuccess(_) {},\n        onError: function onError(error) {\n          _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n        }\n      });\n    };\n    this.watch();\n    this.setUpdateInterval();\n  }\n  return LobbyService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/lobby/lobby.service.js?");

/***/ }),

/***/ "./build/login/login.controller.js":
/*!*****************************************!*\
  !*** ./build/login/login.controller.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LoginController: () => (/* binding */ LoginController)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n\n\nvar LoginController = /** @class */function () {\n  function LoginController(loginService) {\n    var _this = this;\n    this.loginService = loginService;\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.PostLanguage, function (language) {\n      _this.loginService.setCurrentLanguage(language);\n    });\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.ClearPlayer, function () {\n      _this.loginService.clearPlayer();\n    });\n  }\n  return LoginController;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/login/login.controller.js?");

/***/ }),

/***/ "./build/login/login.module.js":
/*!*************************************!*\
  !*** ./build/login/login.module.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LoginModule: () => (/* binding */ LoginModule)\n/* harmony export */ });\n/* harmony import */ var _login_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.controller.js */ \"./build/login/login.controller.js\");\n/* harmony import */ var _login_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.service.js */ \"./build/login/login.service.js\");\n\n\nvar LoginModule = /** @class */function () {\n  function LoginModule() {\n    var loginService = new _login_service_js__WEBPACK_IMPORTED_MODULE_1__.LoginService();\n    new _login_controller_js__WEBPACK_IMPORTED_MODULE_0__.LoginController(loginService);\n  }\n  return LoginModule;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/login/login.module.js?");

/***/ }),

/***/ "./build/login/login.service.js":
/*!**************************************!*\
  !*** ./build/login/login.service.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LoginService: () => (/* binding */ LoginService)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n/* harmony import */ var _enums_playerStatus_enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/playerStatus.enum.js */ \"./build/enums/playerStatus.enum.js\");\n/* harmony import */ var _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums/serverEvents.enum.js */ \"./build/enums/serverEvents.enum.js\");\n/* harmony import */ var _language_language_config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../language/language.config.js */ \"./build/language/language.config.js\");\n/* harmony import */ var _utils_getID_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getID.js */ \"./build/utils/getID.js\");\n/* harmony import */ var _utils_save_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/save.js */ \"./build/utils/save.js\");\n\n\n\n\n\n\n\nvar LoginService = /** @class */function () {\n  function LoginService() {\n    var _this = this;\n    this.currentLanguage = \"ENG\";\n    this.setCurrentLanguage = function (language) {\n      _this.currentLanguage = language;\n    };\n    this.checkPlayer = function () {\n      if (window.location.pathname != \"/\") return;\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n        eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.Check,\n        data: {\n          id: (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_5__.getID)()\n        },\n        onSuccess: function onSuccess(status) {\n          switch (status) {\n            case _enums_playerStatus_enum_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatus.INGAME:\n              window.location.href = \"../pages/game\";\n              break;\n            case _enums_playerStatus_enum_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatus.INLOBBY:\n              window.location.href = \"/pages/lobby\";\n              break;\n          }\n        },\n        onError: function onError(error) {\n          _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n        }\n      });\n    };\n    this.watch = function () {\n      $(\"#go\").click(function () {\n        var name = $(\"#name\").val();\n        var room = $(\"#room\").val();\n        var ip = $(\"#ip\").val();\n        var connection = $(\"#connection\").val();\n        if (!name || !room || !ip || !connection) return;\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.SetIP, ip);\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.SetConnectionType, connection);\n        var data = {\n          \"name\": name,\n          \"room\": room\n        };\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.EmitServer, {\n          eventName: _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.Login,\n          data: data,\n          onSuccess: function onSuccess(response) {\n            _this.login(response);\n          },\n          onError: function onError(error) {\n            _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.GetLanguage, null);\n            _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, _language_language_config_js__WEBPACK_IMPORTED_MODULE_4__.languageConfig[_this.currentLanguage][error]);\n          }\n        });\n        return false;\n      });\n    };\n    this.login = function (sessionID) {\n      var data = {\n        sessionID: sessionID\n      };\n      (0,_utils_save_js__WEBPACK_IMPORTED_MODULE_6__.save)(data);\n      window.location.href = \"./pages/lobby\";\n    };\n    this.clearPlayer = function () {\n      window.location.pathname = \"\";\n      localStorage.removeItem(\"currentPlayer\");\n    };\n    this.watch();\n    this.checkPlayer();\n  }\n  return LoginService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/login/login.service.js?");

/***/ }),

/***/ "./build/notifications/notifications.controller.js":
/*!*********************************************************!*\
  !*** ./build/notifications/notifications.controller.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NotificationsController: () => (/* binding */ NotificationsController)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n\n\nvar NotificationsController = /** @class */function () {\n  function NotificationsController(notificationsService) {\n    var _this = this;\n    this.notificationsService = notificationsService;\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, function (message) {\n      _this.notificationsService.show(message);\n    });\n  }\n  return NotificationsController;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/notifications/notifications.controller.js?");

/***/ }),

/***/ "./build/notifications/notifications.module.js":
/*!*****************************************************!*\
  !*** ./build/notifications/notifications.module.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NotificationsModule: () => (/* binding */ NotificationsModule)\n/* harmony export */ });\n/* harmony import */ var _notifications_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notifications.controller.js */ \"./build/notifications/notifications.controller.js\");\n/* harmony import */ var _notifications_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notifications.service.js */ \"./build/notifications/notifications.service.js\");\n\n\nvar NotificationsModule = /** @class */function () {\n  function NotificationsModule() {\n    var notificationsService = new _notifications_service_js__WEBPACK_IMPORTED_MODULE_1__.NotificationsService();\n    new _notifications_controller_js__WEBPACK_IMPORTED_MODULE_0__.NotificationsController(notificationsService);\n  }\n  return NotificationsModule;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/notifications/notifications.module.js?");

/***/ }),

/***/ "./build/notifications/notifications.service.js":
/*!******************************************************!*\
  !*** ./build/notifications/notifications.service.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NotificationsService: () => (/* binding */ NotificationsService)\n/* harmony export */ });\n/* harmony import */ var _utils_secToMs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/secToMs.js */ \"./build/utils/secToMs.js\");\n\nvar NotificationsService = /** @class */function () {\n  function NotificationsService() {}\n  NotificationsService.prototype.show = function (message) {\n    var error = document.createElement(\"div\");\n    $(error).hide();\n    $(error).addClass(\"error\");\n    var errorText = document.createElement(\"p\");\n    $(errorText).addClass(\"error-message\").text(message);\n    $(error).append(errorText);\n    $(error).click(function () {\n      $(error).remove();\n    });\n    $(\".error-pane\").append(error);\n    var unshow = function unshow(elem) {\n      $(elem).fadeOut((0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_0__.secToMs)(1), function () {\n        $(elem).remove();\n      });\n    };\n    var show = function show(elem) {\n      $(error).fadeIn((0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_0__.secToMs)(1), function () {\n        setTimeout(function () {\n          unshow(elem);\n        }, (0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_0__.secToMs)(10));\n      });\n    };\n    show(error);\n  };\n  return NotificationsService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/notifications/notifications.service.js?");

/***/ }),

/***/ "./build/utils/getID.js":
/*!******************************!*\
  !*** ./build/utils/getID.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getID: () => (/* binding */ getID)\n/* harmony export */ });\nvar getID = function getID() {\n  var playerStr = localStorage.getItem(\"currentPlayer\");\n  if (!playerStr) return null;\n  var player = JSON.parse(playerStr);\n  var id = player.sessionID;\n  return id || null;\n};\n\n//# sourceURL=webpack://zonk/./build/utils/getID.js?");

/***/ }),

/***/ "./build/utils/save.js":
/*!*****************************!*\
  !*** ./build/utils/save.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   save: () => (/* binding */ save)\n/* harmony export */ });\nvar save = function save(data) {\n  var dataStr = localStorage.getItem(\"curretPlayer\");\n  var currentData = {};\n  if (dataStr) {\n    currentData = JSON.parse(dataStr);\n  }\n  if (currentData) {\n    Object.assign(currentData, data);\n  }\n  localStorage.setItem(\"currentPlayer\", JSON.stringify(currentData));\n};\n\n//# sourceURL=webpack://zonk/./build/utils/save.js?");

/***/ }),

/***/ "./build/utils/secToMs.js":
/*!********************************!*\
  !*** ./build/utils/secToMs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   secToMs: () => (/* binding */ secToMs)\n/* harmony export */ });\nvar secToMs = function secToMs(seconds) {\n  return seconds * 1000;\n};\n\n//# sourceURL=webpack://zonk/./build/utils/secToMs.js?");

/***/ }),

/***/ "./build/utils/showPlayers.js":
/*!************************************!*\
  !*** ./build/utils/showPlayers.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showPlayers: () => (/* binding */ showPlayers)\n/* harmony export */ });\nvar showPlayers = function showPlayers(response) {\n  var playerList = response.players;\n  var playersView = document.getElementById(\"playerList\");\n  var getPlayerInList = function getPlayerInList(name) {\n    var playerElement = null;\n    Array.from(playersView.children).forEach(function (element) {\n      var listPlayerName = $(element).text().split(\"|\")[0];\n      if (listPlayerName.trim() == name.trim()) {\n        playerElement = element;\n      }\n    });\n    return playerElement;\n  };\n  playerList.forEach(function (player) {\n    var playerLable = player.name.split(\"|\");\n    var playerName = playerLable[0];\n    var playerElement = getPlayerInList(playerName);\n    var playerPoints = playerElement == null ? 0 : $(playerElement).text().split(\"|\")[1];\n    var listElement = document.createElement(\"li\");\n    if (!playerElement) {\n      $(listElement).text(player.name + \" | \" + player.totalPoints);\n      playersView === null || playersView === void 0 ? void 0 : playersView.appendChild(listElement);\n    } else if (playerPoints != player.totalPoints) {\n      console.log(playerPoints, player.totalPoints);\n      $(playerElement).text(player.name + \" | \" + player.totalPoints);\n    }\n  });\n};\n\n//# sourceURL=webpack://zonk/./build/utils/showPlayers.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./build/index.js");
/******/ 	
/******/ })()
;