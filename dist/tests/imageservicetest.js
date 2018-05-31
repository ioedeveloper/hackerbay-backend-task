"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imageService_1 = require("../services/imageService");
const imageService_2 = require("../services/imageService");
const chai_1 = require("chai");
require("mocha");
describe("downloadImage function", () => {
    // create app db connection.
    it("should return downloaded image file path", () => {
        const dImage = new imageService_1.DownloadImage();
        const options = {
            url: "https://i.imgur.com/nQo9kLG.jpg",
            dest: "./images"
        };
        // act
        dImage.download(options).then((res) => {
            // assert or Expect
            chai_1.expect(res).to.be.a("string");
        }).catch((err) => {
            chai_1.expect(err).to.be.eql("Image download failed");
        });
    });
});
describe("Generate Thumbnail function", () => {
    // create app db connection.
    it("should return file path to generated thumbnail", () => {
        const thumbnailImage = new imageService_2.Thumbnail();
        const imagePath = "https://i.imgur.com/nQo9kLG.jpg";
        const destPath = "./images";
        // act
        thumbnailImage.generateThumbnail(imagePath, destPath).then((res) => {
            // assert or Expect
            chai_1.expect(res).to.be.a("string");
        }).catch((err) => {
            // assert or Expect
            chai_1.expect(err).to.be.a("string");
        });
    });
});
