export const appendImportEndpoint = (endpoint, content) => {
  return (
    `import ${splitHifenAndUpper(endpoint)} from "./endpoints/${endpoint}";\n${content}`
  );
}

export const pushEndpointToApi = (endpoint) => {
  return (
    `this.endpoints = [
      new ${splitHifenAndUpper(endpoint)}(this.logger, this.path),`
  );
}

export const splitHifenAndUpper = (str) => {
  const split = str.split('-');
  if (split.length < 2) return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  return split.map( letter => {
    return `${letter.charAt(0).toUpperCase()}${letter.slice(1)}`;
  }).join('');
}

export const splitHifenAndUpperFirstNot = (str) => {
  const split = str.split('-');
  if (split.length < 2) return str;
  const splitHifenAndUpper = split.map( letter => {
    return `${letter.charAt(0).toUpperCase()}${letter.slice(1)}`;
  }).join('');
  return `${splitHifenAndUpper.charAt(0).toLowerCase()}${splitHifenAndUpper.slice(1)}`;
}