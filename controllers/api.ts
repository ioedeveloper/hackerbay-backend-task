import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import * as jsonPatch from "json-patch";
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

export let apply:any = (req:Request, res:Response) => {
    jwt.verify(req.body.token, "hackerbay", (err:any, authData:any) =>{
        if(err){
            return res.status(403);
        }else{
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

export let verifyToken = (req:Request, res:Response, next:NextFunction) =>{
    const bearerHeader = req.headers['authorization'];
    if(typeof  bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.body.token = bearerToken;
        next();
    }else{
        // forbidden
        return res.status(403);
    }
};