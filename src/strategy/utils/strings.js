export const splitHifenAndUpper = (str) => {
  const split = str.split('-');
  if (split.length < 2) return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  return split.map( letter => {
    return `${letter.charAt(0).toUpperCase()}${letter.slice(1)}`;
  }).join('');
}