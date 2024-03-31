/**
 *  Dostuné úrovně logování zpráv
 */
export var LogLevels;
(function (LogLevels) {
    LogLevels[LogLevels["INFO"] = 0] = "INFO";
    LogLevels[LogLevels["WARN"] = 1] = "WARN";
    LogLevels[LogLevels["ERROR"] = 2] = "ERROR";
    LogLevels[LogLevels["DEBUG"] = 3] = "DEBUG";
})(LogLevels || (LogLevels = {}));
