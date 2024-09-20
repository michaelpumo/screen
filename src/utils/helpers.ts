const wait = (ms: number = 0): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

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
  }
  else if (
    (Array.isArray(value) || typeof value === 'string')
    && ['array', 'string'].includes(typeRaw)
  ) {
    return value.length
  }
  else if (
    (value instanceof Set || value instanceof Map)
    && ['map', 'set'].includes(typeRaw)
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

  if (!table)
    return

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
  }
  else if (Array.isArray(value) && typeRaw === 'array') {
    return value.slice(0, maxLength)
  }

  return value as object
}

interface LogData {
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
  const visited = new Set()

  const handleCircular = (key: string, val: unknown) => {
    if (typeof val === 'object' && val !== null) {
      if (visited.has(val)) {
        return `Circular Ref: ${key}`
      }

      visited.add(val)
    }

    return val
  }

  const processObject = (val: object) => {
    for (const key of Object.getOwnPropertyNames(val)) {
      const current = (val as any)[key]
      obj[key] = handleCircular(key, current)
    }
    return obj
  }

  if (['bigint', 'boolean', 'function', 'number', 'string', 'symbol', 'undefined'].includes(typeRaw)) {
    return { data, typeDisplay, dataRaw, typeRaw }
  }

  if (value === null) {
    return { data: null, typeDisplay: 'null', dataRaw, typeRaw: 'null' }
  }

  if (value instanceof Date) {
    return { data: value.toISOString(), typeDisplay: 'date', dataRaw, typeRaw }
  }

  if (value instanceof Error) {
    return { data: { name: value.name, message: value.message, stack: value.stack }, typeDisplay: 'error', dataRaw, typeRaw }
  }

  if (value instanceof RegExp) {
    return { data: value.toString(), typeDisplay: 'regexp', dataRaw, typeRaw }
  }

  if (value instanceof Map || value instanceof Set) {
    data = Array.from(value)
    typeDisplay = 'array'
  }
  else if (value instanceof ArrayBuffer) {
    data = Array.from(new Uint8Array(value))
    typeDisplay = 'array'
  }
  else if (ArrayBuffer.isView(value)) {
    data = Array.from(value)
    typeDisplay = 'array'
  }
  else if (value instanceof Blob) {
    try {
      const contents = await value.text()
      data = {
        payload: contents,
        size: value.size,
        type: value.type,
      }
      typeDisplay = 'object'
    }
    catch (error) {
      data = `Error reading Blob: ${error}`
      typeDisplay = 'error'
    }
  }
  else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      data = value.map((item, index) => handleCircular(index.toString(), item))
      typeDisplay = 'array'
    }
    else {
      data = processObject(value)
      typeDisplay = 'object'
    }
  }

  return { data, typeDisplay, dataRaw, typeRaw }
}

export { wait, getType, getLength, hasLength, toggleRows, truncate, formatData }
