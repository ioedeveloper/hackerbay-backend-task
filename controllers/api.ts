import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import * as path from "path";
import * as jsonPatch from "json-patch";
import * as apiViewModels from "../view_models/api";
import * as imageService from "../services/imageService";
import * as jsonWebTokenService from "../services/jsonWebTokenService";

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
    //map test user to view model
    let user = new apiViewModels.UserData(req.body.username, req.body.password);
    let webTokenObj = new jsonWebTokenService.JsonWebToken();
    webTokenObj.signUser(user).then((viewresult) => {
        return res.status(200).type("application/json").send(viewresult);
    }, (err)=>{
        return res.status(200).type("application/json").send(err);
    });
};

export let createThumbnail:any = (req:Request, res:Response) => {
    console.log(req.body.publicimageurl);
    let url = new apiViewModels.CreateThumbnail(req.body.publicimageurl);
    let imgObj = new imageService.DownloadImage();
    let thumbnailObj = new imageService.Thumbnail();
    imgObj.download(url.options).then((filepath)=>{
        thumbnailObj.generateThumbnail(filepath, './tmp.jpg').then((img)=>{
            //return res.status(200).sendFile(path.join(__dirname, '../../', img));
            return res.status(200).sendFile(img);
        }).catch((err)=>{
            return res.status(200).send({error:err});
        });
    }).catch((err)=>{
        return res.status(200).send({error:err});
    });
};

export let applyJsonPatch:any = (req:Request, res:Response) => {
            // map json request body to view model.
            let jsonObjectData = new apiViewModels.JsonObjectData(req.body.jsonObject, req.body.jsonPatchObject);

            //apply json patch to document
            jsonPatch.apply(jsonObjectData.jsonObject, jsonObjectData.jsonPatchObject);
            let viewresult = jsonPatch.compile(jsonObjectData.jsonPatchObject);

            //send response
            return res.status(200).type("application/json").send(viewresult);
};