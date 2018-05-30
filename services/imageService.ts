import * as jimp from "jimp";
const imageDownloader = require('image-downloader');

class DownloadImage{
    constructor(){

    }

    public async download(options: { url: string; dest: string; }) {
        try {
          const { filename, image } = await imageDownloader.image(options);
          return filename;
        } catch (e) {
          throw e;
        }
    }
}

class Thumbnail{
  constructor(){

  }
  public generateThumbnail(){
    
  }
}

  export {DownloadImage};