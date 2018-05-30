"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp = __importStar(require("jimp"));
const imageDownloader = require('image-downloader');
class DownloadImage {
    constructor() {
    }
    download(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filename, image } = yield imageDownloader.image(options);
                return filename;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.DownloadImage = DownloadImage;
class Thumbnail {
    constructor() {
    }
    generateThumbnail(imageSrc, destPath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield jimp.read(imageSrc).then((image) => {
                image.resize(50, 50).write(destPath);
            });
            return destPath;
        });
    }
}
exports.Thumbnail = Thumbnail;
