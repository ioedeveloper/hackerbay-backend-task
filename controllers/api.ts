import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import * as path from "path";
import * as jsonPatch from "json-patch";
import * as apiViewModels from "../view_models/api";
import * as imageService from "../services/imageService";
import * as jsonWebTokenService from "../services/jsonWebTokenService";
import * as jsonPatchService from "../services/jsonPatchService";

/**
 * @param req
 * @param res
 */
export let welcomeApi:any = async (req: Request, res: Response) => {
    let viewresult = {
        message:"Welcome To My App"
    };
    return res.status(200).type("application/json").send(viewresult);
};

export let login:any = (req: Request, res:Response) => {
    // map test user to view model
    let user = new apiViewModels.UserData(req.body.username, req.body.password);
    // instantiate webTokenService
    let webTokenObj = new jsonWebTokenService.JsonWebToken();
    // sign new test user
    webTokenObj.signUser(user).then((viewresult) => {
        return res.status(200).type("application/json").send(viewresult);
    }, (err)=>{
        return res.status(200).type("application/json").send(err);
    });
};

export let createThumbnail:any = (req:Request, res:Response) => {
    let url = new apiViewModels.CreateThumbnail(req.body.publicimageurl);
    let imgObj = new imageService.DownloadImage();
    let thumbnailObj = new imageService.Thumbnail();

    //Downloads image from test url
    imgObj.download(url.options).then((filepath)=>{

        //Generate a 50px by 50px thumbnail
        thumbnailObj.generateThumbnail(filepath, './tmp.jpg').then((img)=>{
        return res.status(200).send({"image":path.join(__dirname, '../../.', img)});
        }).catch((err)=>{
            return res.status(200).send({error:err});
        });

    }).catch((err)=>{
        return res.status(200).send({error:err});
    });
};

export let applyJsonPatch:any = (req:Request, res:Response) => {
            // map json request body to view model.
            let jsonObjData = new apiViewModels.JsonObjectData(req.body.jsonDocument, req.body.jsonPatchObject);
            let jsonPatchObj = new jsonPatchService.JsonPatch();
            let viewresult = jsonPatchObj.applyPatch(req.body.jsonDocument, req.body.jsonPatchObject)
            return res.status(200).type("application/json").send(viewresult);
};