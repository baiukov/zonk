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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   App: () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _game_game_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game/game.module.js */ \"./build/game/game.module.js\");\n/* harmony import */ var _language_language_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./language/language.module.js */ \"./build/language/language.module.js\");\n/* harmony import */ var _lobby_lobby_module_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lobby/lobby.module.js */ \"./build/lobby/lobby.module.js\");\n/* harmony import */ var _login_login_module_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.module.js */ \"./build/login/login.module.js\");\n/* harmony import */ var _notifications_notifications_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifications/notifications.module.js */ \"./build/notifications/notifications.module.js\");\n\n\n\n\n\n\nvar App = /** @class */function () {\n  function App() {\n    new _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService();\n    new _language_language_module_js__WEBPACK_IMPORTED_MODULE_2__.LanguageModule();\n    new _login_login_module_js__WEBPACK_IMPORTED_MODULE_4__.LoginModule();\n    new _notifications_notifications_module_js__WEBPACK_IMPORTED_MODULE_5__.NotificationsModule();\n    new _lobby_lobby_module_js__WEBPACK_IMPORTED_MODULE_3__.LobbyModule();\n    new _game_game_module_js__WEBPACK_IMPORTED_MODULE_1__.GameModule();\n  }\n  return App;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/app.js?");

/***/ }),

/***/ "./build/app.service.js":
/*!******************************!*\
  !*** ./build/app.service.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppService: () => (/* binding */ AppService)\n/* harmony export */ });\nvar AppService = /** @class */function () {\n  function AppService() {\n    if (!localStorage.getItem(\"ip\")) return;\n    // @ts-ignore\n    AppService.ip = localStorage.getItem(\"ip\").replaceAll('\"', '');\n  }\n  AppService.events = {};\n  AppService.setIP = function (ip) {\n    AppService.ip = ip;\n    localStorage.setItem(\"ip\", ip);\n  };\n  AppService.on = function (eventName, event) {\n    AppService.events[eventName] = event;\n  };\n  AppService.emit = function (eventName, data) {\n    Object.getOwnPropertyNames(AppService.events).forEach(function (currentEvent) {\n      if (eventName != currentEvent) return;\n      AppService.events[currentEvent](data);\n    });\n  };\n  AppService.emitServer = function (eventName, data, successFunc, errorFunc) {\n    var str = JSON.stringify(data);\n    if (!AppService.ip) {\n      return;\n    }\n    $.ajax({\n      url: \"http://\".concat(AppService.ip, \":8080/\").concat(eventName),\n      type: \"POST\",\n      data: str,\n      contentType: 'application/json',\n      success: function success(response) {\n        successFunc(response);\n      },\n      error: function error(xhr, status, _error) {\n        errorFunc(xhr.responseText);\n      }\n    });\n  };\n  return AppService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/app.service.js?");

/***/ }),

/***/ "./build/enums/events.enum.js":
/*!************************************!*\
  !*** ./build/enums/events.enum.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Events: () => (/* binding */ Events)\n/* harmony export */ });\nvar Events;\n(function (Events) {\n  Events[\"Notify\"] = \"ShowNotification\";\n  Events[\"GetLanguage\"] = \"GetLanguage\";\n  Events[\"PostLanguage\"] = \"PostLanguage\";\n  Events[\"UpdatePlayerList\"] = \"UpdatePlayerList\";\n  Events[\"ClearPlayer\"] = \"ClearPlayer\";\n})(Events || (Events = {}));\n\n//# sourceURL=webpack://zonk/./build/enums/events.enum.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ServerEvents: () => (/* binding */ ServerEvents)\n/* harmony export */ });\nvar ServerEvents;\n(function (ServerEvents) {\n  ServerEvents[\"Login\"] = \"api/login\";\n  ServerEvents[\"GetPlayers\"] = \"api/getPlayers\";\n  ServerEvents[\"Check\"] = \"api/check\";\n  ServerEvents[\"GetRoom\"] = \"api/getRoom\";\n  ServerEvents[\"StartGame\"] = \"api/createGame\";\n  ServerEvents[\"UpdateState\"] = \"api/getState\";\n  ServerEvents[\"AddPlayer\"] = \"api/addPlayer\";\n  ServerEvents[\"Roll\"] = \"api/roll\";\n})(ServerEvents || (ServerEvents = {}));\n\n//# sourceURL=webpack://zonk/./build/enums/serverEvents.enum.js?");

/***/ }),

/***/ "./build/game/game.controller.js":
/*!***************************************!*\
  !*** ./build/game/game.controller.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameController: () => (/* binding */ GameController)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n\n\nvar GameController = /** @class */function () {\n  function GameController(gameService) {\n    var _this = this;\n    this.gameService = gameService;\n    _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.on(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.PostLanguage, function (newLanguage) {\n      _this.gameService.currentLanguage = newLanguage;\n    });\n  }\n  return GameController;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/game/game.controller.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameService: () => (/* binding */ GameService)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n/* harmony import */ var _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/serverEvents.enum.js */ \"./build/enums/serverEvents.enum.js\");\n/* harmony import */ var _language_language_config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../language/language.config.js */ \"./build/language/language.config.js\");\n/* harmony import */ var _utils_getID_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getID.js */ \"./build/utils/getID.js\");\n/* harmony import */ var _utils_secToMs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/secToMs.js */ \"./build/utils/secToMs.js\");\n/* harmony import */ var _utils_showPlayers_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/showPlayers.js */ \"./build/utils/showPlayers.js\");\n\n\n\n\n\n\n\nvar GameService = /** @class */function () {\n  function GameService() {\n    var _this = this;\n    this.dataIsNotRollingTime = 0;\n    this.selectedDices = [false, false, false, false, false, false];\n    this.currentLanguage = \"ENG\";\n    this.watch = function () {\n      $(\"#roll\").click(function () {\n        _this.playDiceAnim((0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_5__.secToMs)(5), []);\n        var id = (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_4__.getID)();\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emitServer(_enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.Roll, {\n          id: id\n        }, function (_) {}, function (_) {});\n        return false;\n      });\n    };\n    this.watchState = function () {\n      if (window.location.pathname != \"/pages/game/\") return;\n      _this.updateInterval = setInterval(function () {\n        var id = (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_4__.getID)();\n        var data = {\n          \"id\": id\n        };\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emitServer(_enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.UpdateState, data, function (response) {\n          _this.update(response);\n        }, function (_) {});\n      }, 100);\n    };\n    this.update = function (dataStr) {\n      var data = JSON.parse(dataStr);\n      if (!data) {\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, _language_language_config_js__WEBPACK_IMPORTED_MODULE_3__.languageConfig[_this.currentLanguage].smthWrong);\n        return;\n      }\n      $(\"#totalPoints\").text(data.total);\n      (0,_utils_showPlayers_js__WEBPACK_IMPORTED_MODULE_6__.showPlayers)(data);\n      $(\"#goalPoints\").text(data.goal);\n      if (data.turn) {\n        $(\"#roll\").removeAttr(\"disabled\");\n      } else {\n        $(\"#roll\").attr(\"disabled\");\n      }\n      if (data.isRolling) {\n        $(\"#roll\").attr(\"disabled\", '');\n        if (!data.turn && !_this.diceAnimInterval) {\n          _this.playDiceAnim((0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_5__.secToMs)(4.9), []);\n        }\n      }\n      if (data.dices) {\n        clearInterval(_this.diceAnimInterval);\n        _this.diceAnimInterval = undefined;\n        _this.setDice(data.dices);\n      }\n      var element = $(\"#currentPoints\");\n      if (parseInt($(element).text()) != data.currentPoints && !_this.numberInterval) {\n        _this.playNumbersAnim(element, parseInt($(element).text()) || 0, data.currentPoints);\n      }\n      if (!data.isPending || !data.turn) {\n        $(\"#roll\").text(_language_language_config_js__WEBPACK_IMPORTED_MODULE_3__.languageConfig[_this.currentLanguage].roll);\n        $(\"#reroll\").remove();\n      }\n      if (data.isPending && data.turn && $(\"#reroll\").length <= 0) {\n        $(\"#roll\").text(_language_language_config_js__WEBPACK_IMPORTED_MODULE_3__.languageConfig[_this.currentLanguage].enough);\n        var reroll = document.createElement(\"button\");\n        $(reroll).attr(\"type\", \"submit\").addClass(\"reroll\").attr(\"id\", \"reroll\").text(_language_language_config_js__WEBPACK_IMPORTED_MODULE_3__.languageConfig[_this.currentLanguage].reroll);\n        $(\".submits\").append(reroll);\n      }\n    };\n    this.playDiceAnim = function (time, correctValues) {\n      var intervalTime = 100;\n      var timeSpent = 0;\n      _this.diceAnimInterval = setInterval(function () {\n        if (timeSpent >= time && time != -1) {\n          _this.setDice(correctValues);\n          clearInterval(_this.diceAnimInterval);\n          return;\n        }\n        if (timeSpent >= intervalTime) {\n          intervalTime *= time == -1 ? 1 : 1.15;\n          var values = [];\n          for (var i = 0; i < 6; i++) {\n            values[i] = Math.floor(Math.random() * (6 - 1) + 1);\n          }\n          _this.setDice(values);\n        }\n        timeSpent += 100;\n      }, 100);\n    };\n    //this.playDiceAnim(10000, [1, 2, 3, 4, 6])\n    this.setDice([1, 2, 3, 4, 5, 6]);\n    this.watch();\n    this.watchState();\n  }\n  GameService.prototype.setDice = function (values) {\n    var _this = this;\n    var diceField = $(\".dices\");\n    var dices = diceField.children(\"div\");\n    var j = 1;\n    dices.each(function (i) {\n      var dice = dices[i];\n      var doesExist = false;\n      var diceChildren = $(dice).children(\"div\");\n      var dots = values[i];\n      diceChildren.each(function (index) {\n        var _a;\n        var element = diceChildren[index];\n        if (!((_a = $(element).attr(\"class\")) === null || _a === void 0 ? void 0 : _a.startsWith(\"dots\"))) return;\n        var dotsIndexStr = $(element).attr(\"class\");\n        var dotsIndex = parseInt(dotsIndexStr.charAt(dotsIndexStr.length - 1));\n        if (dotsIndex == dots) {\n          doesExist = true;\n        }\n      });\n      if (doesExist) return;\n      $(dice).empty();\n      if (dots === 5) {\n        var dotsFirst = $(\"<div class='dots5'></div>\");\n        var dotsSecond = $(\"<div class='dots5'></div>\");\n        var dotsThird = $(\"<div class='dots5'></div>\");\n        $(dotsFirst).append($(\"<div class='dot'></div>\"));\n        $(dotsFirst).append($(\"<div class='dot'></div>\"));\n        $(dotsSecond).append($(\"<div class='dot'></div>\"));\n        $(dotsThird).append($(\"<div class='dot'></div>\"));\n        $(dotsThird).append($(\"<div class='dot'></div>\"));\n        $(dice).append(dotsFirst, dotsSecond, dotsThird);\n        return;\n      }\n      var newDots = document.createElement(\"div\");\n      $(newDots).addClass(\"dots\" + values[i]);\n      for (var j_1 = 0; j_1 < values[i]; j_1++) {\n        var dot = document.createElement(\"div\");\n        $(dot).addClass(\"dot\");\n        $(newDots).append(dot);\n      }\n      $(dice).append(newDots);\n    });\n    for (var i = 1; i <= 6; i++) {\n      if ($(\"#clickHandler\".concat(i)).length > 0) return;\n      var clickHandler = document.createElement(\"div\");\n      $(clickHandler).addClass(\"click-handler\");\n      $(clickHandler).attr(\"id\", \"clickHandler\" + i);\n      $(clickHandler).click(function (event) {\n        var idStr = $(event.target).attr(\"id\");\n        var id = parseInt(idStr === null || idStr === void 0 ? void 0 : idStr.charAt(idStr.length - 1));\n        if (!_this.selectedDices[id]) {\n          $(\"#dice\".concat(id)).addClass(\"selected\");\n        } else {\n          $(\"#dice\".concat(id)).removeClass(\"selected\");\n        }\n        _this.selectedDices[id] = !_this.selectedDices[id];\n      });\n      $(\"#dice\".concat(i)).append(clickHandler);\n    }\n  };\n  GameService.prototype.playNumbersAnim = function (element, start, stop) {\n    var _this = this;\n    if (start === 0 && stop === 0) {\n      $(element).text(0);\n      return;\n    }\n    var interval = 10;\n    var difference = Math.abs(start - stop);\n    var temp = start > stop ? stop : start;\n    this.numberInterval = setInterval(function () {\n      if (temp >= stop && start <= stop || temp <= stop && start >= stop) {\n        clearInterval(_this.numberInterval);\n        _this.numberInterval = undefined;\n        $(element).text(stop.toFixed(0));\n        return;\n      }\n      if (start < stop) {\n        temp += difference * 0.01;\n      } else {\n        temp -= difference * 0.01;\n      }\n      $(element).text(temp.toFixed(0));\n    }, interval);\n  };\n  return GameService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/game/game.service.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   languageConfig: () => (/* binding */ languageConfig)\n/* harmony export */ });\nvar languageConfig = {\n  \"ENG\": {\n    name: \"Nickname\",\n    room: \"Room name\",\n    go: \"Go\",\n    ip: \"Ip\",\n    players: \"Players:\",\n    goalTitle: \"Goal:\",\n    goal: \"goal points\",\n    start: \"Start\",\n    pts: \"pts\",\n    total: \"total\",\n    enough: \"enough\",\n    reroll: \"reroll\",\n    playerAlreadyExists: \"Player already exists\",\n    playerDoesntExist: \"Player is not found\",\n    roomDoesntExist: \"Room is not found\",\n    defaultError: \"Some issue has happened\",\n    roomIsFull: \"Room is full\",\n    smthWrong: \"Something went wrong\",\n    serverUnreachable: \"Server is unreachable\",\n    ipIsIncorrect: \"IP address is not correct\"\n  }\n};\n\n//# sourceURL=webpack://zonk/./build/language/language.config.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LobbyService: () => (/* binding */ LobbyService)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n/* harmony import */ var _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/serverEvents.enum.js */ \"./build/enums/serverEvents.enum.js\");\n/* harmony import */ var _utils_getID_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getID.js */ \"./build/utils/getID.js\");\n/* harmony import */ var _utils_secToMs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/secToMs.js */ \"./build/utils/secToMs.js\");\n/* harmony import */ var _utils_showPlayers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/showPlayers.js */ \"./build/utils/showPlayers.js\");\n\n\n\n\n\n\nvar LobbyService = /** @class */function () {\n  function LobbyService() {\n    var _this = this;\n    this.watch = function () {\n      $(\"#start\").click(function () {\n        var id = (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_3__.getID)();\n        var points = $(\"#goal\").val();\n        if (!id || !points) return;\n        var data = {\n          \"id\": id,\n          \"points\": points\n        };\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emitServer(_enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.StartGame, data, function (response) {\n          console.log(response);\n          window.location.href = \"../game\";\n        }, function (error) {\n          console.log(error);\n        });\n        return false;\n      });\n    };\n    this.setUpdateInterval = function () {\n      if (window.location.pathname != \"/pages/lobby/\") return;\n      _this.updatePlayerList();\n      _this.roomInterval = setInterval(function () {\n        _this.updatePlayerList();\n      }, (0,_utils_secToMs_js__WEBPACK_IMPORTED_MODULE_4__.secToMs)(0.5));\n    };\n    this.updatePlayerList = function () {\n      var dataStr = localStorage.getItem(\"currentPlayer\");\n      if (!dataStr) return;\n      var data = JSON.parse(dataStr);\n      if (!data) return;\n      var id = data.sessionID;\n      if (!id) return;\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emitServer(_enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.GetRoom, {\n        id: id\n      }, function (roomName) {\n        _this.getPlayers(roomName, id);\n        _this.setRoom();\n      }, function (error) {\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.ClearPlayer, 0);\n      });\n    };\n    this.setRoom = function () {\n      if (window.location.pathname != \"/pages/lobby/\") {\n        window.location.href = \"./pages/lobby\";\n      }\n    };\n    this.getPlayers = function (roomName, id) {\n      var data = {\n        room: roomName\n      };\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emitServer(_enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.GetPlayers, data, function (response) {\n        _this.update(response, roomName, id);\n      }, function (error) {\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n        window.location.href = \"\";\n        localStorage.removeItem(\"currentPlayer\");\n      });\n    };\n    this.update = function (dataStr, room, id) {\n      var data = JSON.parse(dataStr);\n      (0,_utils_showPlayers_js__WEBPACK_IMPORTED_MODULE_5__.showPlayers)(data);\n      if (!data.isInGame) return;\n      window.location.href = \"../game\";\n      var dataToSend = {\n        id: id,\n        room: room\n      };\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emitServer(_enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_2__.ServerEvents.AddPlayer, dataToSend, function (_) {}, function (error) {\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n      });\n    };\n    this.watch();\n    this.setUpdateInterval();\n  }\n  return LobbyService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/lobby/lobby.service.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LoginService: () => (/* binding */ LoginService)\n/* harmony export */ });\n/* harmony import */ var _app_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.service.js */ \"./build/app.service.js\");\n/* harmony import */ var _enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/events.enum.js */ \"./build/enums/events.enum.js\");\n/* harmony import */ var _enums_playerStatus_enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/playerStatus.enum.js */ \"./build/enums/playerStatus.enum.js\");\n/* harmony import */ var _enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums/serverEvents.enum.js */ \"./build/enums/serverEvents.enum.js\");\n/* harmony import */ var _language_language_config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../language/language.config.js */ \"./build/language/language.config.js\");\n/* harmony import */ var _utils_getID_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getID.js */ \"./build/utils/getID.js\");\n/* harmony import */ var _utils_save_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/save.js */ \"./build/utils/save.js\");\n\n\n\n\n\n\n\nvar LoginService = /** @class */function () {\n  function LoginService() {\n    var _this = this;\n    this.currentLanguage = \"ENG\";\n    this.setCurrentLanguage = function (language) {\n      _this.currentLanguage = language;\n    };\n    this.checkPlayer = function () {\n      if (window.location.pathname != \"/\") return;\n      _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emitServer(_enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.Check, {\n        id: (0,_utils_getID_js__WEBPACK_IMPORTED_MODULE_5__.getID)()\n      }, function (status) {\n        console.log(status);\n        switch (status) {\n          case _enums_playerStatus_enum_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatus.INGAME:\n            window.location.href = \"../pages/game\";\n            break;\n          case _enums_playerStatus_enum_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatus.INLOBBY:\n            window.location.href = \"/pages/lobby\";\n            break;\n        }\n      }, function (error) {\n        console.log(\"1\");\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, error);\n      });\n    };\n    this.watch = function () {\n      $(\"#go\").click(function () {\n        var name = $(\"#name\").val();\n        var room = $(\"#room\").val();\n        var ip = $(\"#ip\").val();\n        if (!name || !room || !ip) return;\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.setIP(ip);\n        var data = {\n          \"name\": name,\n          \"room\": room\n        };\n        _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emitServer(_enums_serverEvents_enum_js__WEBPACK_IMPORTED_MODULE_3__.ServerEvents.Login, data, function (response) {\n          _this.login(response);\n        }, function (error) {\n          _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.GetLanguage, null);\n          _app_service_js__WEBPACK_IMPORTED_MODULE_0__.AppService.emit(_enums_events_enum_js__WEBPACK_IMPORTED_MODULE_1__.Events.Notify, _language_language_config_js__WEBPACK_IMPORTED_MODULE_4__.languageConfig[_this.currentLanguage][error]);\n        });\n        return false;\n      });\n    };\n    this.login = function (sessionID) {\n      var data = {\n        sessionID: sessionID\n      };\n      (0,_utils_save_js__WEBPACK_IMPORTED_MODULE_6__.save)(data);\n      window.location.href = \"./pages/lobby\";\n    };\n    this.clearPlayer = function () {\n      window.location.pathname = \"\";\n      localStorage.removeItem(\"currentPlayer\");\n    };\n    this.watch();\n    this.checkPlayer();\n  }\n  return LoginService;\n}();\n\n\n//# sourceURL=webpack://zonk/./build/login/login.service.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showPlayers: () => (/* binding */ showPlayers)\n/* harmony export */ });\nvar showPlayers = function showPlayers(response) {\n  var playerList = response.players;\n  var playersView = document.getElementById(\"playerList\");\n  var isPlayerInList = function isPlayerInList(name) {\n    var isIn = false;\n    Array.from(playersView.children).forEach(function (element) {\n      var listPlayerName = $(element).text().split(\"|\")[0];\n      if (listPlayerName.trim() == name.trim()) {\n        isIn = true;\n      }\n    });\n    return isIn;\n  };\n  playerList.forEach(function (player) {\n    if (!isPlayerInList(player.name.split(\"|\")[0])) {\n      var listElement = document.createElement(\"li\");\n      $(listElement).text(player.name + \" | 0\");\n      playersView === null || playersView === void 0 ? void 0 : playersView.appendChild(listElement);\n    }\n  });\n};\n\n//# sourceURL=webpack://zonk/./build/utils/showPlayers.js?");

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