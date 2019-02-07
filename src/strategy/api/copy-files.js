import { paths } from '../../config';
import { copy } from 'fs-extra';

export default async () => {
  await copy(
    paths.in.api.source(),
    paths.out.api.source()
  ).catch(err => {
    console.log('Err: ', err); process.exit(0);
  });
}