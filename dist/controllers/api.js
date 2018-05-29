"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const jsonPatch = __importStar(require("json-patch"));
const apiViewModels = __importStar(require("../view_models/api"));
/**
 * @param req
 * @param res
 */
exports.welcomeApi = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let viewresult = {
        message: "Welcome To My App"
    };
    return res.status(200).type("application/json").send(viewresult);
});
exports.login = (req, res) => {
    //map test user to view model
    let user = new apiViewModels.UserData(req.body.username, req.body.password);
    //sign user with jwt token
    jwt.sign({ user }, "hackerbay", (err, token) => {
        let viewresult = {
            token
        };
        return res.status(200).type("application/json").send(viewresult);
    });
};
exports.apply = (req, res) => {
    jwt.verify(req.body.token, "hackerbay", (err, authData) => {
        if (err) {
            return res.status(403).send();
        }
        else {
            // map json request body to view model.
            let jsonObjectData = new apiViewModels.JsonObjectData(req.body.jsonObject, req.body.jsonPatchObject);
            let jsonObj = jsonObjectData.jsonObject;
            let jsonPatchObj = jsonObjectData.jsonPatchObject;
            //apply json patch to document
            jsonPatch.apply(jsonObj, jsonPatchObj);
            let viewresult = jsonPatch.compile(jsonPatchObj);
            //send response
            return res.status(200).type("application/json").send(viewresult);
        }
    });
};
exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.body.token = bearerToken;
        next();
    }
    else {
        // forbidden
        return res.status(403).send();
    }
};
