import { readFileSync, writeFileSync } from 'fs';
import { splitHifenAndUpper } from '../utils/strings';
import { paths } from '../../config';

export default (name) => {
  return new Promise( (resolve) => {
    const fileContent = readFileSync(paths.out.api.file(), 'utf-8');
    const newFileContent = fileContent
    .replace(/_apiname_/g, splitHifenAndUpper(name) )
    .replace(/_apipath_/g, name );
    writeFileSync(paths.out.api.file(), newFileContent, 'utf-8');
    resolve();
  });
}