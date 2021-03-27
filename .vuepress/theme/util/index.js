function positiveSort(prevValue, nextValue) {
  return prevValue === nextValue ? 0 : (prevValue > nextValue ? 1 : -1)
}

function negativeSort(prevValue, nextValue) {
  return prevValue === nextValue ? 0 : (prevValue < nextValue ? 1 : -1)
}

function upperFirst(str) {
  return str && `${str[0].toUpperCase()}${str.substr(1)}`
}

function timestampTransformer(timestamp, lang, dateOptions) {
  return timestamp
}

function buildAllClassificationsName(name) {
  return `all${upperFirst(name)}`
}

module.exports = {
  positiveSort,
  negativeSort,
  upperFirst,
  timestampTransformer,
  buildAllClassificationsName
}
