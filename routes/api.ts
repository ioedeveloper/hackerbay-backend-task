// importing libraries and dependencies
import { NextFunction, Request, Response, Router } from "express";
import * as apiController from "../controllers/api";
import * as jsonWebTokenService from "../services/jsonWebTokenService";

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
    this.router.patch("/applyJsonPatch", jsonWebTokenService.verifyToken, apiController.applyJsonPatch);
    this.router.post("/createthumbnail", jsonWebTokenService.verifyToken, apiController.createThumbnail);
  }
}

const apiRoutes:Api = new Api();
export {apiRoutes};
