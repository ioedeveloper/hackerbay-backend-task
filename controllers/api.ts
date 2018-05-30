import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import * as jsonPatch from "json-patch";
const imageDownloader = require('image-downloader');
import * as fs from "fs";
import gm from "gm";
import * as apiViewModels from "../view_models/api";

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

    //sign user with jwt token
    jwt.sign({user}, "hackerbay", (err:any, token:any) => {
        let viewresult = {
            token
        };
        return res.status(200).type("application/json").send(viewresult);
    });
};

export let createThumbnail:any = (req:Request, res:Response) => {
    console.log(req.body.publicimageurl);
    let url = new apiViewModels.CreateThumbnail(req.body.publicimageurl);
    const options = {
        url: url.publicImageUrl,
        dest: 'images'                  
      }
    downloadIMG(options).then((filepath)=>{
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

async function downloadIMG(options: { url: string; dest: string; }) {
    try {
      const { filename, image } = await imageDownloader.image(options);
      return filename;
    } catch (e) {
      throw e;
    }
  }

export let applyJsonPatch:any = (req:Request, res:Response) => {
            // map json request body to view model.
            let jsonObjectData = new apiViewModels.JsonObjectData(req.body.jsonObject, req.body.jsonPatchObject);
            let jsonObj = jsonObjectData.jsonObject;
            let jsonPatchObj = jsonObjectData.jsonPatchObject;

            //apply json patch to document
            jsonPatch.apply(jsonObj, jsonPatchObj);
            let viewresult = jsonPatch.compile(jsonPatchObj);

            //send response
            return res.status(200).type("application/json").send(viewresult);
};

export let verifyToken = (req:Request, res:Response, next:NextFunction) =>{
    //get to from headers['authorization']
    const bearerHeader = req.headers['authorization'];
    if(typeof  bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.body.token = bearerToken;
        jwt.verify(req.body.token, "hackerbay", (err:any, authData:any) =>{
            if(err){
                return res.status(403).send();
            }else{
                next();
            }
        });
    }else{
        // forbidden
        return res.status(403).send();
    }
};