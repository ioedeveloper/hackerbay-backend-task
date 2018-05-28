"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var apiRoutes = __importStar(require("./routes/api"));
var app = express();
var port = process.env.PORT || 8001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", apiRoutes.apiRoutes.router);
// serve the application at the given port
app.listen(port, function () {
    // success callback
    console.log("Listening at http://localhost:" + port + "/");
});
