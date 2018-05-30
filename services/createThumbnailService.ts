const imageDownloader = require('image-downloader');

async function downloadIMG(options: { url: string; dest: string; }) {
    try {
      const { filename, image } = await imageDownloader.image(options);
      return filename;
    } catch (e) {
      throw e;
    }
  }

  export {downloadIMG};