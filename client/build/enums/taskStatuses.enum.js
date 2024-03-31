/**
 *  Dostuné stavy úkolů pro socketový server
 */
export var TaskStatuses;
(function (TaskStatuses) {
    TaskStatuses["Unexecuted"] = "UNEXECUTED";
    TaskStatuses["Successfull"] = "SUCCESS";
    TaskStatuses["Error"] = "ERROR";
})(TaskStatuses || (TaskStatuses = {}));
