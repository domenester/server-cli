import { paths } from '../../config';
import { existsSync } from 'fs';
import CopyFiles from './copy-files';
import RewriteFiles from './rewrite-files';
import RenameFiles from './rename-files';

export const apiExists = (name) => {
  return existsSync(paths.out.api.root(name));
}

export default async (name) => {

  if (existsSync(paths.out.api.root(name))) {
    console.log(`Api called "${name}" already exists.`); process.exit(0);
  }

  await CopyFiles();
  await RewriteFiles(name);
  await RenameFiles(name);
  
  // const indexContent = readFileSync(`${paths.out.api.source()}/index.ts`, 'utf-8');
  // const newIndexContent = indexContent
  // .replace(/export default [/g, splitHifenAndUpper(name) )
  // .replace(/_apipath_/g, name );
  
  return;
};
