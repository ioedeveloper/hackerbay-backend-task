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
const express_1 = require("express");
const apiController = __importStar(require("../controllers/api"));
const jsonWebTokenService = __importStar(require("../services/jsonWebTokenService"));
/**
 * Handles routing of all api request
 */
class Api {
    constructor() {
        this.webTokenObj = new jsonWebTokenService.JsonWebToken();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", apiController.welcomeApi);
        this.router.post("/login", apiController.login);
        this.router.patch("/applyJsonPatch", this.webTokenObj.verifyToken, apiController.applyJsonPatch);
        this.router.post("/createthumbnail", this.webTokenObj.verifyToken, apiController.createThumbnail);
    }
}
const apiRoutes = new Api();
exports.apiRoutes = apiRoutes;
