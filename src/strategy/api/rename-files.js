import { paths } from '../../config';
import { renameSync } from 'fs';

export default (name) => {
  return new Promise((resolve) => {
    renameSync(
      paths.out.api.file(),
      paths.out.api.file(`${name}.api.ts`)
    );
  
    renameSync(
      paths.out.api.root(),
      paths.out.api.root(name)
    );
    resolve();
  });
}