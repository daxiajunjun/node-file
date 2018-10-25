import config from '../config/config';
import * as fs from 'fs';
import * as Sharp from 'sharp';
import log from './log';

export default class GetFile {
  public static imgsExtList = ['png', 'jpg', 'jpeg'];
  constructor() {

  }

  public static async downloadFile(ctx: any, filename:string, query: any, ext: string) {
    const dirname = filename.split('-').shift();
    const filepath = `${config.saveFilePath}/${dirname}/${filename}`;
    if (this.imgsExtList.indexOf(ext.toLocaleLowerCase()) != -1) {
      let sharpImg = null;

      try {
        sharpImg = Sharp(filepath);
        if (query.size) {
          let opts = query.size.split('x');
          let fit = query.fit || 'fill';
          sharpImg = sharpImg.resize({width: +opts[0], height: +opts[1], fit: fit, background: {r:255,g:255,b:255,alpha:0}});
        }
        if (query.quality) {
          sharpImg = sharpImg.jpeg({
            quality: +query.quality,
            chromaSubsampling: '4:4:4'
          });
        }
      } catch (e) {
       log.error.error(e)
      }
      let data =  sharpImg.toBuffer();
      return data;
    } else {
      return fs.createReadStream(filepath)
    }
  }
}