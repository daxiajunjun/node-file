import * as fs from 'fs';
import config from '../config/config';
import log from './log';

export default  class Fileupload {
  constructor() {

  }
  public static saveFile(files) {
    let saveFile:Array<any> =[];
    Object.getOwnPropertyNames(files).forEach(key => {
      const file = files[key];
      const reader = fs.createReadStream(file.path);
      const ext:string = file.name.split('.').pop();
      const date = new Date();
      const dateString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;

      const saveFileNamePath:string = `${config.saveFilePath}/${dateString}`;
      const saveFilename = dateString + '-' + Math.random().toString().split('.').pop() + '.' + ext;
      let upStream = null;
      try {
        if (!fs.existsSync(saveFileNamePath)) {
          fs.mkdirSync(saveFileNamePath);
        }
        upStream = fs.createWriteStream(`${saveFileNamePath}/${saveFilename}`, {encoding: 'utf8', flags: 'w'});
      } catch (e) {
        log.error.error(e);
      }

      upStream.on('open', () => {
        reader.pipe(upStream);
      })
      saveFile.push({
        originFileName: file.name,
        saveFileName: saveFilename,
        href: `${config.hostname}:${config.port}/file/${saveFilename}`,
      });
    })
    return saveFile;
  }
}