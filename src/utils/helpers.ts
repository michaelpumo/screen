const wait = (ms: number = 0): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const getType = (value: unknown): string =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object\s+([a-z0-9.]+)\]$/i, '$1')
    .replace(/\./g, '')
    .toLowerCase()

const getLength = (value: unknown): number => {
  const typeRaw = getType(value)

  if (value && ['object'].includes(typeRaw)) {
    return Object.keys(value).length
  } else if (
    (Array.isArray(value) || typeof value === 'string') &&
    ['array', 'string'].includes(typeRaw)
  ) {
    return value.length
  } else if (
    (value instanceof Set || value instanceof Map) &&
    ['map', 'set'].includes(typeRaw)
  ) {
    return value.size
  }

  return -1
}

const hasLength = (value: string): boolean => {
  return ['array', 'map', 'object', 'set', 'string'].includes(value)
}

const toggleRows = (e: Event) => {
  const table = (e.target as HTMLElement).closest('table')

  if (!table) return

  const rows = Array.from(
    table.querySelectorAll(':scope > tbody tr'),
  ) as HTMLTableRowElement[]

  if (!rows || rows.length === 0) {
    return
  }

  rows.forEach((tr) => {
    tr.classList.toggle('sl-hidden')
  })
}

const truncate = (value: unknown, maxLength: number): object => {
  const typeRaw = getType(value)

  if (value && typeRaw === 'object') {
    const entries = Object.entries(value)
    const sliced = entries.slice(0, maxLength)

    return Object.fromEntries(sliced)
  } else if (Array.isArray(value) && typeRaw === 'array') {
    return value.slice(0, maxLength)
  }

  return value as object
}

const isCircular = (value: unknown) => {
  try {
    JSON.stringify(value)
    return false
  } catch (error) {
    return true
  }
}

type LogData = {
  data: unknown
  dataRaw: unknown
  typeDisplay: string
  typeRaw: string
}

const formatData = async (value: unknown): Promise<LogData> => {
  const dataRaw = value
  const typeRaw = getType(value)
  let data = value
  let typeDisplay = typeRaw
  const obj: Record<string, unknown> = {}

  if (
    [
      'array',
      'bigint',
      'boolean',
      'function',
      'null',
      'number',
      'object',
      'string',
      'symbol',
      'undefined',
    ].includes(typeRaw)
  ) {
    return { data, typeDisplay, dataRaw, typeRaw }
  }

  if (['error', 'intl', 'math', 'json'].includes(typeRaw)) {
    type Intl = typeof Intl
    type ObjectTypes = Error | Math | JSON | Intl

    const temp = value as ObjectTypes

    for (const key of Object.getOwnPropertyNames(temp)) {
      const current = temp[key as keyof ObjectTypes]
      obj[key] = isCircular(current) ? `Circular Ref: ${key}` : current
    }

    data = obj
    typeDisplay = 'object'
  } else if (['map', 'urlsearchparams'].includes(typeRaw)) {
    const temp = value as Map<string, string> | URLSearchParams

    for (const [key, value] of temp.entries()) {
      obj[key] = isCircular(value) ? `Circular Ref: ${key}` : value
    }

    data = obj
    typeDisplay = 'object'
  } else if (typeRaw === 'arraybuffer') {
    const buffer = value as ArrayBuffer
    const typedArray = new Uint8Array(buffer)

    data = [...typedArray]
    typeDisplay = 'array'
  } else if (typeRaw === 'blob') {
    const temp = value as Blob

    const readBlobContents = async (blob: Blob) => {
      try {
        const contents = await blob.text()
        return contents
      } catch (error) {
        return error
      }
    }

    const result = await readBlobContents(temp)

    data = {
      payload: result,
      size: temp.size,
      type: temp.type,
    }
    typeDisplay = 'object'
  } else if (
    [
      'bigint64array',
      'biguint64array',
      'float32array',
      'float64array',
      'int8array',
      'int16array',
      'int32array',
      'set',
      'uint8array',
      'uint16array',
      'uint16array',
      'uint32array',
      'uint8clampedarray',
    ].includes(typeRaw)
  ) {
    const temp = value as Uint8Array

    data = [...temp]
    typeDisplay = 'array'
  } else {
    const temp = value as any //ObjectTypes
    const propertyNames = Object.getOwnPropertyNames(temp)

    if (Array.isArray(propertyNames) && propertyNames.length) {
      for (const key of propertyNames) {
        const current = temp[key as keyof any]
        obj[key] = isCircular(current) ? `Circular Ref: ${key}` : current
      }
    } else if (['mimetype'].includes(typeRaw)) {
      // console.log(
      //   'Circular',
      //   isCircular(temp),
      //   typeRaw,
      //   temp,
      //   Object.keys(temp),
      // )
    } else {
      for (const key in temp) {
        const current = temp[key as keyof any]
        obj[key] = isCircular(current) ? `Circular Ref: ${key}` : current
      }
    }

    data = obj
    typeDisplay = 'object'
  }

  return { data, typeDisplay, dataRaw, typeRaw }
}

export { wait, getType, getLength, hasLength, toggleRows, truncate, formatData }
