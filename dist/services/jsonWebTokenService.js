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
class JsonWebToken {
    constructor() {
    }
    verifyToken(req, res, next) {
        //get to from headers['authorization']
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.body.token = bearerToken;
            jwt.verify(req.body.token, "hackerbay", (err, authData) => {
                if (err) {
                    return res.status(403).send();
                }
                else {
                    next();
                }
            });
        }
        else {
            // forbidden
            return res.status(403).send();
        }
    }
    signUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //sign user with jwt token
            let viewresult = {};
            yield jwt.sign({ user }, "hackerbay", (err, token) => {
                viewresult = { token };
            });
            return viewresult;
        });
    }
}
exports.JsonWebToken = JsonWebToken;
