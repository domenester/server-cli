export const defaultFolder = 'api-name';
export const defaultFile = 'api-name.api.txt';

export const paths = {
  in: {
    api: {
      source: () => (`${process.cwd()}/node_modules/server-cli/dist/structure/api`),
      root: function () { return `${this.source()}/api-name`},
      file: function () { return `${this.root()}/api-name.api.txt`}
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
    }
  }
};
