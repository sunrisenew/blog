export function positiveSorter(prevValue, nextValue) {
  return prevValue === nextValue ? 0 : (prevValue > nextValue ? 1 : -1);
}

export function negativeSorter(prevValue, nextValue) {
  return prevValue === nextValue ? 0 : (prevValue < nextValue ? 1 : -1);
}

export function upperFirst(str) {
  return str && `${str[0].toUpperCase()}${str.substr(1)}`;
}

export function getAllClassificationsName(name) {
  return `all${upperFirst(name)}`;
}
