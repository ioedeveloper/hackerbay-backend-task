"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageService_1 = require("../services/imageService");
const chai_1 = require("chai");
require("mocha");
describe("downloadImage function", () => {
    // create app db connection.
    it("should return downloaded image file path", () => __awaiter(this, void 0, void 0, function* () {
        const dImage = new imageService_1.DownloadImage();
        const options = {
            url: "https://i.imgur.com/nQo9kLG.jpg",
            dest: "./images"
        };
        // act
        const result = yield dImage.download(options);
        // assert or Expect
        chai_1.assert.isString(result);
    }));
});
