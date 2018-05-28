"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing libraries and dependencies
var express_1 = require("express");
var apiController = __importStar(require("../controllers/api"));
/**
 * Handles routing of all api request
 */
var Api = /** @class */ (function () {
    function Api() {
        this.router = express_1.Router();
        this.init();
    }
    Api.prototype.init = function () {
        this.router.get("/", apiController.welcomeApi);
    };
    return Api;
}());
var apiRoutes = new Api();
exports.apiRoutes = apiRoutes;
