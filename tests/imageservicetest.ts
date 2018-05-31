import { DownloadImage } from "../services/imageService";
import { Thumbnail } from "../services/imageService";
import { expect, assert, should } from "chai";
import "mocha";

describe("downloadImage function", () => {
// create app db connection.
    it("should return downloaded image file path", () => {
        const dImage = new DownloadImage();
        const options = {
            url:"https://i.imgur.com/nQo9kLG.jpg",
            dest:"./images"
        }
        // act
        dImage.download(options).then((res)=>{
            // assert or Expect
            expect(res).to.be.a("string");
        }).catch((err)=>{
            expect(err).to.be.eql("Image download failed");
        });
    });
});

describe("Generate Thumbnail function", () => {
    // create app db connection.
        it("should return file path to generated thumbnail", () => {
            const thumbnailImage = new Thumbnail();
            const imagePath = "https://i.imgur.com/nQo9kLG.jpg";
            const destPath = "./images";
            // act
            thumbnailImage.generateThumbnail(imagePath, destPath).then((res)=>{
                // assert or Expect
                expect(res).to.be.a("string");
            }).catch((err)=>{
                // assert or Expect
                expect(err).to.be.a("string");
            });
        });
    
    });