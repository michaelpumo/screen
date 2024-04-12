import { S } from 'vitest/dist/reporters-P7C2ytIv.js'

const wait = (ms: number = 0): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const getType = (value: unknown): string =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object\s+([a-z0-9.]+)\]$/i, '$1')
    .replace(/\./g, '')
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
  const type = getType(value)

  if (value && type === 'object') {
    const entries = Object.entries(value)
    const sliced = entries.slice(0, maxLength)

    return Object.fromEntries(sliced)
  } else if (Array.isArray(value) && type === 'array') {
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
  type: string
  dataRaw: unknown
  typeRaw: string
}

const formatData = async (value: unknown): Promise<LogData> => {
  const dataRaw = value
  const typeRaw = getType(value)
  let data = value
  let type = typeRaw

  if (
    [
      'cachestorage',
      'console',
      'crypto',
      'domstringlist',
      'file',
      'frames',
      'globalThis',
      'history',
      'htmldocument',
      'idbfactory',
      'location',
      'navigator',
      'nodelist',
      'parent',
      'performance',
      'performancetiming',
      'performancenavigation',
      'screen',
      'screenorientation',
      'self',
      'storage',
      'subtlecrypto',
      'top',
      'url',
      'visualviewport',
      'window',
    ].includes(typeRaw)
  ) {
    type ObjectTypes =
      | Console
      | DOMStringList
      | Crypto
      | File
      | Global
      | History
      | Document
      | Location
      | NodeList
      | NodeListOf<Element>
      | Performance
      | Screen
      | ScreenOrientation
      | Storage
      | SubtleCrypto
      | URL
      | VisualViewport
      | Window
      | WindowProxy
      | typeof globalThis
    const temp = value as ObjectTypes
    const obj: Record<string, unknown> = {}

    for (const key in temp) {
      const current = temp[key as keyof ObjectTypes]
      obj[key] = isCircular(current) ? `Circular Ref: ${key}` : current
    }

    data = obj
  } else if (['error', 'intl', 'math', 'json'].includes(typeRaw)) {
    type ObjectTypes = Error | Math | JSON
    const temp = value as ObjectTypes
    const obj: Record<string, unknown> = {}

    for (const key of Object.getOwnPropertyNames(temp)) {
      const current = temp[key as keyof ObjectTypes]
      obj[key] = isCircular(current) ? `Circular Ref: ${key}` : current
    }

    data = obj
  } else if (['map', 'urlsearchparams'].includes(typeRaw)) {
    const temp = value as Map<string, string> | URLSearchParams
    const obj: Record<string, unknown> = {}

    for (const [key, value] of temp.entries()) {
      obj[key] = value
    }

    data = obj
  } else if (typeRaw === 'arraybuffer') {
    const buffer = value as ArrayBuffer
    const typedArray = new Uint8Array(buffer)

    data = [...typedArray]
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
  }

  const toObjectDisplay = [
    'blob',
    'cachestorage',
    'console',
    'crypto',
    'domstringlist',
    'error',
    'file',
    'history',
    'htmldocument',
    'idbfactory',
    'intl',
    'json',
    'location',
    'navigator',
    'map',
    'math',
    'nodelist',
    'performance',
    'performancetiming',
    'performancenavigation',
    'screen',
    'screenorientation',
    'storage',
    'subtlecrypto',
    'url',
    'urlsearchparams',
    'visualviewport',
    'window',
  ]

  const toArrayDisplay = [
    'arraybuffer',
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
  ]

  type = toObjectDisplay.includes(typeRaw)
    ? 'object'
    : toArrayDisplay.includes(typeRaw)
      ? 'array'
      : typeRaw

  return { data, type, dataRaw, typeRaw }
}

export { wait, getType, getLength, hasLength, toggleRows, truncate, formatData }
