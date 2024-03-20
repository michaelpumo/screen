const getType = (value: unknown): string =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object\s+([a-z]+)\]$/i, '$1')
    .toLowerCase()

const getLength = (value: unknown): number => {
  const dataType = getType(value)

  if (value && ['object'].includes(dataType)) {
    return Object.keys(value).length
  } else if (
    (Array.isArray(value) || typeof value === 'string') &&
    ['array', 'string'].includes(dataType)
  ) {
    return value.length
  } else if (
    (value instanceof Set || value instanceof Map) &&
    ['map', 'set'].includes(dataType)
  ) {
    return value.size
  }

  return -1
}

const hasLength = (value: string): boolean => {
  return ['array', 'object', 'map', 'set', 'string'].includes(value)
}

const isComplexType = (value: unknown): boolean => {
  const dataType = getType(value)
  return ['object', 'array', 'map', 'set'].includes(dataType)
}

const truncate = (value: unknown, maxLength: number): object => {
  const dataType = getType(value)

  if (value && ['object'].includes(dataType)) {
    const entries = Object.entries(value)
    const sliced = entries.slice(0, maxLength)

    return Object.fromEntries(sliced)
  } else if (Array.isArray(value) && ['array'].includes(dataType)) {
    return value.length > maxLength ? value.slice(0, maxLength) : value
  }

  return value as object
}

export { getType, getLength, hasLength, isComplexType, truncate }
