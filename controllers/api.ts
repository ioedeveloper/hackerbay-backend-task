// importing libraries and dependencies
import { NextFunction, Request, Response } from "express";

/**
 * Get All Leaves
 * @param req
 * @param res
 */
export let welcomeApi:any = async (req: Request, res: Response) => {
    let viewresult = {
        "message":"Welcome To My App"
    };
    return res.status(200).send(viewresult);
};
