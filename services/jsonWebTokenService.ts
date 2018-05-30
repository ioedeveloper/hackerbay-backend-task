import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import * as apiViewModel from "../view_models/api";

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

export let signUser = (user:apiViewModel.UserData) =>{
    //sign user with jwt token
    jwt.sign({user}, "hackerbay", (err:any, token:any) => {
        let viewresult = {
            token
        };
        return viewresult;
    });
};

