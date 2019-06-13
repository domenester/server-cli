import { paths, defaultEndpointFile, defaultEndpointValidation, defaultEndpointSpec } from '../../config';
import { renameSync, readFileSync, writeFileSync } from 'fs';
import { copy } from 'fs-extra';
import { appendImportEndpoint, pushEndpointToApi, splitHifenAndUpper, splitHifenAndUpperFirstNot } from '../utils/strings';

export default async (api, endpoint, path, verb) => {

  await Promise.all(
    [
      copy(
        paths.in.endpoint.file(),
        paths.out.endpoint.fileEndpoint(api, defaultEndpointFile)
      ),
      copy(
        paths.in.endpoint.spec(),
        paths.out.endpoint.fileEndpoint(api, defaultEndpointSpec)
      ),
      copy(
        paths.in.endpoint.validation(),
        paths.out.endpoint.fileValidation(api, defaultEndpointValidation)
      )
    ]
  ).catch(err => {
    console.log('Err: ', err); process.exit(0);
  });

  //#####################################

  const fileContentEndpoint = readFileSync(
    paths.out.endpoint.fileEndpoint(api, defaultEndpointFile), 'utf-8'
  );

  const newFileContentEndpoint = fileContentEndpoint
  .replace(/_nameupper_/g, splitHifenAndUpper(endpoint) )
  .replace(/_name_/g, endpoint )
  .replace(/_verb_/g, verb )
  .replace(/_path_/g, path );

  writeFileSync(
    paths.out.endpoint.fileEndpoint(api, defaultEndpointFile),
    newFileContentEndpoint,
    'utf-8'
  );

  renameSync(
    paths.out.endpoint.fileEndpoint(api, defaultEndpointFile),
    paths.out.endpoint.fileEndpoint(api, `${endpoint}.ts`),
  );

  // ####################################

  const fileContentApi = readFileSync(
    paths.out.api.root(`${api}/${api}.api.ts`), 'utf-8'
  );

  const newFileContentApi = fileContentApi
  .replace(/this.endpoints = \[/g, pushEndpointToApi(endpoint));

  writeFileSync(
    paths.out.api.root(`${api}/${api}.api.ts`),
    appendImportEndpoint(endpoint, newFileContentApi),
    'utf-8'
  );

  // ####################################

  const fileContentValidation = readFileSync(
    paths.out.endpoint.fileValidation(api, defaultEndpointValidation), 'utf-8'
  );

  const newFileContentValidation = fileContentValidation
  .replace(/_nameupper_/g, splitHifenAndUpper(endpoint) );

  writeFileSync(
    paths.out.endpoint.fileValidation(api, defaultEndpointValidation),
    newFileContentValidation,
    'utf-8'
  );

  renameSync(
    paths.out.endpoint.fileValidation(api, defaultEndpointValidation),
    paths.out.endpoint.fileValidation(api, `${endpoint}.validation.ts`),
  );

  // ####################################

  const fileContentSpec = readFileSync(
    paths.out.endpoint.fileEndpoint(api, defaultEndpointSpec), 'utf-8'
  );

  const newFileContentSpec = fileContentSpec
  .replace(/_nameupper_/g, splitHifenAndUpper(endpoint) )
  .replace(/_name_/g, endpoint )
  .replace(/_apiupper_/g, `${splitHifenAndUpper(api)}Api` )
  .replace(/_api_/g, api )
  .replace(/_nameupperfirstnot_/g, splitHifenAndUpperFirstNot(endpoint) )
  .replace(/_apiupperfirstnot_/g, `${splitHifenAndUpperFirstNot(api)}Api` );

  writeFileSync(
    paths.out.endpoint.fileEndpoint(api, defaultEndpointSpec),
    newFileContentSpec,
    'utf-8'
  );

  renameSync(
    paths.out.endpoint.fileEndpoint(api, defaultEndpointSpec),
    paths.out.endpoint.fileEndpoint(api, `${endpoint}.spec.ts`),
  );
  
  return;
};
