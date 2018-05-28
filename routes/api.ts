// importing libraries and dependencies
import { NextFunction, Request, Response, Router } from "express";
import * as apiController from "../controllers/api";

/**
 * Handles routing of all api request
 */
class Api {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init():void {
    this.router.get("/", apiController.welcomeApi);
    this.router.post("/login", apiController.login);
  }
}

const apiRoutes:Api = new Api();
export {apiRoutes};
