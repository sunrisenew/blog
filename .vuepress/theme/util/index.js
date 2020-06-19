function positiveSort(prevValue, nextValue) {
  return prevValue === nextValue ? 0 : (prevValue > nextValue ? 1 : -1)
}

function negativeSort(prevValue, nextValue) {
  return prevValue === nextValue ? 0 : (prevValue < nextValue ? 1 : -1)
}

function upperFirst(str) {
  return str && `${str[0].toUpperCase()}${str.substr(1)}`
}

function getAllClassificationsName(name) {
  return `all${upperFirst(name)}`
}

const dateOptions = {
  hour12: false
}

module.exports = {
  positiveSort,
  negativeSort,
  upperFirst,
  getAllClassificationsName,
  dateOptions
}
