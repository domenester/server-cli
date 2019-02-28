export const defaultFolder = 'api-name';
export const defaultFile = 'api-name.api.txt';
export const defaultEndpointFile = 'endpoint-name.txt';
export const defaultEndpointSpec = 'endpoint-name.spec.txt';
export const defaultEndpointValidation = 'endpoint-name.validation.txt';

export const paths = {
  in: {
    api: {
      source: () => (`${process.cwd()}/node_modules/api-endpoint-cli/dist/structure/api`),
      root: function () { return `${this.source()}/api-name`},
      file: function () { return `${this.root()}/api-name.api.txt`}
    },
    endpoint: {
      source: () => (`${process.cwd()}/node_modules/api-endpoint-cli/dist/structure/endpoint`),
      file: function () { return `${this.source()}/${defaultEndpointFile}`},
      spec: function () { return `${this.source()}/${defaultEndpointSpec}`},
      validation: function () { return `${this.source()}/${defaultEndpointValidation}`}
    }
  },
  out: {
    api: {
      source: () => (`${process.cwd()}/src/components/endpoint`),
      root: function (name = defaultFolder) {
        return `${this.source()}/${name}`
      },
      file: function (name = defaultFile, folder = defaultFolder) {
        return `${this.root(folder)}/${name}`;
      }
    },
    endpoint: {
      source: (api) => (`${process.cwd()}/src/components/endpoint/${api}`),
      rootEndpoint: function (api) {
        return `${this.source(api)}/endpoints`
      },
      rootValidation: function (api) {
        return `${this.source(api)}/validations`;
      },
      fileEndpoint: function (api, name) {
        return `${this.rootEndpoint(api)}/${name}`;
      },
      fileValidation: function (api, name) {
        return `${this.rootValidation(api)}/${name}`;
      }
    }
  }
};
