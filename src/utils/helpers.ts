const getType = (value: any): string =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object\s+([a-z]+)\]$/i, '$1')
    .toLowerCase()

const getLength = (value: any): number => {
  const dataType = getType(value)

  if (dataType === 'object') {
    return Object.keys(value).length
  } else if (dataType === 'array' || dataType === 'string') {
    return value.length
  } else if (dataType === 'map' || dataType === 'set') {
    return value.size
  }

  return 0
}

export { getType, getLength }
