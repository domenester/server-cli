import { paths } from '../../config';
import { existsSync, renameSync, readFileSync, writeFileSync } from 'fs';
import { copy } from 'fs-extra';
import { splitHifenAndUpper } from '../utils/strings';

export default async (name) => {

  if (existsSync(paths.out.api.root(name))) {
    console.log(`Api called "${name}" already exists.`); process.exit(0);
  }

  await copy(
    paths.in.api.source(),
    paths.out.api.source()
  ).catch(err => {
    console.log('Err: ', err); process.exit(0);
  });

  const fileContent = readFileSync(paths.out.api.file(), 'utf-8');
  const newFileContent = fileContent
  .replace(/_apiname_/g, splitHifenAndUpper(name) )
  .replace(/_apipath_/g, name );

  writeFileSync(paths.out.api.file(), newFileContent, 'utf-8');

  renameSync(
    paths.out.api.file(),
    paths.out.api.file(`${name}.api.ts`)
  );

  renameSync(
    paths.out.api.root(),
    paths.out.api.root(name)
  );
  
  return;
};
