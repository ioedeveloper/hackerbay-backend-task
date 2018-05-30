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
const jsonPatch = __importStar(require("json-patch"));
const apiViewModels = __importStar(require("../view_models/api"));
const imageService = __importStar(require("../services/imageService"));
const jsonWebTokenService = __importStar(require("../services/jsonWebTokenService"));
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
    let webTokenObj = new jsonWebTokenService.JsonWebToken();
    webTokenObj.signUser(user).then((viewresult) => {
        return res.status(200).type("application/json").send(viewresult);
    }, (err) => {
        return res.status(200).type("application/json").send(err);
    });
};
exports.createThumbnail = (req, res) => {
    console.log(req.body.publicimageurl);
    let url = new apiViewModels.CreateThumbnail(req.body.publicimageurl);
    let imgObj = new imageService.DownloadImage();
    imgObj.download(url.options).then((filepath) => {
        // Delete the temporary file that we created in the cropping task
        //fs.unlinkSync('./tmp.png'); 
    }).catch((err) => {
        return res.status(400).send({ error: err });
    });
};
exports.applyJsonPatch = (req, res) => {
    // map json request body to view model.
    let jsonObjectData = new apiViewModels.JsonObjectData(req.body.jsonObject, req.body.jsonPatchObject);
    //apply json patch to document
    jsonPatch.apply(jsonObjectData.jsonObject, jsonObjectData.jsonPatchObject);
    let viewresult = jsonPatch.compile(jsonObjectData.jsonPatchObject);
    //send response
    return res.status(200).type("application/json").send(viewresult);
};
