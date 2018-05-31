"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonPatch = __importStar(require("json-patch"));
class JsonPatch {
    constructor() {
    }
    applyPatch(document, patch) {
        jsonPatch.apply(document, patch);
        let viewresult = jsonPatch.compile(patch);
        return viewresult;
    }
}
exports.JsonPatch = JsonPatch;
