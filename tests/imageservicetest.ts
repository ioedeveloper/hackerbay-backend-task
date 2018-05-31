import { DownloadImage } from "../services/imageService";
import { Thumbnail } from "../services/imageService";
import { expect, assert } from "chai";
import "mocha";


describe("downloadImage function", () => {
// create app db connection.
    it("should return downloaded image file path", async () => {
        const dImage = new DownloadImage();
        const options = {
            url:"https://i.imgur.com/nQo9kLG.jpg",
            dest:"./images"
        }
        // act
        const result: string = await dImage.download(options);
 
        // assert or Expect
        assert.isString(result)
    });

});