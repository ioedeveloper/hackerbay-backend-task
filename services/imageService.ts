import * as jimp from "jimp";
const imageDownloader = require('image-downloader');

class DownloadImage{
    constructor(){

    }

    public async download(options: { url: string; dest: string; }): Promise<string> {
        try {
          const { filename, image } = await imageDownloader.image(options);
          return filename;
        } catch (e) {
          return "Image download failed";
        }
    }
}

class Thumbnail{
  constructor(){

  }
  public async generateThumbnail(imageSrc:string, destPath:string){
      await jimp.read(imageSrc).then((image)=>{
        image.resize(50,50).write(destPath);
      });
      return destPath;
  }
}

  export {DownloadImage, Thumbnail};