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
const apiViewModels = __importStar(require("../view_models/api"));
/**
 * Get All Leaves
 * @param req
 * @param res
 */
exports.welcomeApi = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let viewresult = {
        message: "Welcome To My App"
    };
    return res.status(200).send(viewresult);
});
exports.login = (req, res) => {
    //test user
    let user = new apiViewModels.User(req.body.username, req.body.password);
    jwt.sign({ user }, "hackerbay", (err, token) => {
        let viewresult = {
            token
        };
        return res.status(200).type("application/json").send(viewresult);
    });
};
let verifyToken = (req, res, next) => {
};
