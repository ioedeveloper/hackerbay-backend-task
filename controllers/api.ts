// importing libraries and dependencies
import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import {User} from "../models/api";

/**
 * Get All Leaves
 * @param req
 * @param res
 */
export let welcomeApi:any = async (req: Request, res: Response) => {
    let viewresult = {
        message:"Welcome To My App"
    };
    return res.status(200).send(viewresult);
};

export let login:any = (req: Request, res:Response) => {
    //test user
    let user = new User(req.body.username, req.body.password);
    jwt.sign({user},"hackerbay", (err:any, token:any) => {
        let viewresult = {
            token
        };
        return res.status(200).send(viewresult);
    });
};

let verifyToken = (req:Request, res:Request, next:NextFunction) =>{

};