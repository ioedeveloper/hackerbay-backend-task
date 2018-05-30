import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import * as jsonPatch from "json-patch";
import * as fs from "fs";
import gm from "gm";
import * as apiViewModels from "../view_models/api";
import * as thumbnailService from "../services/createThumbnailService";
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
    let viewresult = jsonWebTokenService.signUser(user);
    return res.status(200).type("application/json").send(viewresult);
};

export let createThumbnail:any = (req:Request, res:Response) => {
    console.log(req.body.publicimageurl);
    let url = new apiViewModels.CreateThumbnail(req.body.publicimageurl);
    thumbnailService.downloadIMG(url.options).then((filepath)=>{
        console.log(filepath);
        let imageMagick = gm.subClass({imageMagick: true});
        imageMagick(filepath).resize(50, 50).write('./tmp.png', (err) => {
            if (err) {
                console.log(err); 
            } else {
                res.sendFile('./tmp.png');
            }
        });
        // Delete the temporary file that we created in the cropping task
        //fs.unlinkSync('./tmp.png'); 
    }).catch((err)=>{
        return res.status(400).send({error:err});
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