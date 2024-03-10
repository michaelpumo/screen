const getType = (value: any) =>
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

  return -1
}

const hasLength = (value: string): boolean => {
  return ['array', 'object', 'map', 'set', 'string'].includes(value)
}

const isComplexType = (value: any): boolean => {
  const dataType = getType(value)
  return ['object', 'array', 'map', 'set'].includes(dataType)
}

const truncate = (value: any, maxLength: number): any => {
  const dataType = getType(value)

  if (dataType === 'object') {
    const entries = Object.entries(value)
    const sliced = entries.slice(0, maxLength)

    return Object.fromEntries(sliced)
  } else if (dataType === 'array') {
    return value.length > maxLength ? value.slice(0, maxLength) : value
  }

  return value
}

export { getType, getLength, hasLength, isComplexType, truncate }
