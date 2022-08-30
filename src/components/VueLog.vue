<script lang="ts" setup>
import { ref, onMounted } from '@vue/runtime-core'

const log = ref<string>('')

const _dumpType = (obj) => {
  let t = typeof obj

  if (t === 'function') {
    const f = obj.toString()
    if (/^\/.*\/[gi]??[gi]??$/.test(f)) {
      return 'regexp'
    } else if (/^\[object.*\]$/i.test(f)) {
      t = 'object'
    }
  }

  if (t !== 'object') {
    return t
  }

  switch (obj) {
    case null:
      return 'null'
    case window:
      return 'window'
    case document:
      return document
    case window.event:
      return 'event'
  }

  if (window.event && window.event.type === obj.type) {
    return 'event'
  }

  const c = obj.constructor

  if (c != null) {
    switch (c) {
      case Array:
        t = 'array'
        break
      case Date:
        return 'date'
      case RegExp:
        return 'regexp'
      case Object:
        t = 'object'
        break
      case ReferenceError:
        return 'error'
      default:
        const sc = c.toString()
        const m = sc.match(/\s*function(.*)\(/)
        if (m != null) {
          return 'object'
        }
    }
  }

  const nt = obj.nodeType

  if (nt !== null) {
    switch (nt) {
      case 1:
        if (obj.item == null) {
          return 'domelement'
        }
        break
      case 3:
        return 'string'
    }
  }

  if (obj.toString !== null) {
    const ex = obj.toString()
    let am = ex.match(/^\[object(.*)\]$/i)

    if (am !== null) {
      switch (am[1].toLowerCase()) {
        case 'event':
          return 'event'
        case 'nodelist':
        case 'htmlcollection':
        case 'elementarray':
          return 'array'
        case 'htmldocument':
          return 'htmldocument'
      }
    }
  }

  return t
}

const _dumpStyles = (type, use) => {
  let r = ''
  const table =
    'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;cell-spacing:2px;'
  const th =
    'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;text-align:left;color: white;padding: 5px;vertical-align :top;cursor:hand;cursor:pointer;'
  const td =
    'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;vertical-align:top;padding:3px;'
  const thScript = 'onClick="tTable(this);" title="click to collapse"'
  const tdScript = 'onClick="tRow(this);" title="click to collapse"'

  switch (type) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'undefined':
    case 'object':
      switch (use) {
        case 'table':
          r = ` style="${table}background-color:#0000cc;"`
          break
        case 'th':
          r = ` style="${th}background-color:#4444cc;"${thScript}`
          break
        case 'td-key':
          r = ` style="${td}background-color:#ccddff;cursor:hand;cursor:pointer;"${tdScript}`
          break
        case 'td-value':
          r = ` style="${td}background-color:#fff;"`
          break
      }
      break
    case 'array':
      switch (use) {
        case 'table':
          r = ` style="${table}background-color:#006600;"`
          break
        case 'th':
          r = ` style="${th}background-color:#009900;"${thScript}`
          break
        case 'td-key':
          r = ` style="${td}background-color:#ccffcc;cursor:hand;cursor:pointer;"${tdScript}`
          break
        case 'td-value':
          r = ` style="${td}background-color:#fff;"`
          break
      }
      break
    case 'function':
      switch (use) {
        case 'table':
          r = ` style="${table}background-color:#aa4400;"`
          break
        case 'th':
          r = ` style="${th}background-color:#cc6600;"${thScript}`
          break
        case 'td-key':
          r = ` style="${td}background-color:#fff;cursor:hand;cursor:pointer;"${tdScript}`
          break
        case 'td-value':
          r = ` style="${td}background-color:#fff;"`
          break
      }
      break
    case 'arguments':
      switch (use) {
        case 'table':
          r = ` style="${table}background-color:#dddddd;cell-spacing:3;"`
          break
        case 'td-key':
          r = ` style="${th}background-color:#eeeeee;color:#000000;cursor:hand;cursor:pointer;"${tdScript}`
          break
      }
      break
    case 'regexp':
      switch (use) {
        case 'table':
          r = ` style="${table}background-color:#CC0000;cell-spacing:3;"`
          break
        case 'th':
          r = ` style="${th}background-color:#FF0000;"${thScript}`
          break
        case 'td-key':
          r = ` style="${th}background-color:#FF5757;color:#000000;cursor:hand;cursor:pointer;"${tdScript}`
          break
        case 'td-value':
          r = ` style="${td}background-color:#fff;"`
          break
      }
      break
    case 'date':
      switch (use) {
        case 'table':
          r = ` style="${table}background-color:#663399;cell-spacing:3;"`
          break
        case 'th':
          r = ` style="${th}background-color:#9966CC;"${thScript}`
          break
        case 'td-key':
          r = ` style="${th}background-color:#B266FF;color:#000000;cursor:hand;cursor:pointer;"${tdScript}`
          break
        case 'td-value':
          r = ` style="${td}background-color:#fff;"`
          break
      }
      break
    case 'domelement':
      switch (use) {
        case 'table':
          r = ` style="${table}background-color:#FFCC33;cell-spacing:3;"`
          break
        case 'th':
          r = ` style="${th}background-color:#FFD966;"${thScript}`
          break
        case 'td-key':
          r = ` style="${th}background-color:#FFF2CC;color:#000000;cursor:hand;cursor:pointer;"${tdScript}`
          break
        case 'td-value':
          r = ` style="${td}background-color:#fff;"`
          break
      }
      break
  }
  return r
}

const dump = (object, showTypes) => {
  const st = typeof showTypes == 'undefined' ? true : showTypes
  const script =
    'function tRow(s){t=s.parentNode.lastChild;tTarget(t, tSource(s));}function tTable(s){var switchToState=tSource(s);var table=s.parentNode.parentNode;for(var i=1;i < table.childNodes.length;i++){t=table.childNodes[i];if(t.style){tTarget(t, switchToState);}}}function tSource(s){if(s.style.fontStyle=="italic"||s.style.fontStyle==null){s.style.fontStyle="normal";s.title="click to collapse";return "open";}else{s.style.fontStyle="italic";s.title="click to expand";return "closed";}}function tTarget(t, switchToState){if(switchToState=="open"){t.style.display="";}else{t.style.display="none";}}'

  log.value =
    /string|number|undefined|boolean/.test(typeof object) || object == null
      ? object
      : recurse(object, typeof object)

  const ffs = document.createElement('script')

  ffs.setAttribute('type', 'text/javascript')
  ffs.appendChild(document.createTextNode(script))
  document.getElementsByTagName('head')[0].appendChild(ffs)

  function recurse(o, type) {
    let i
    let j = 0
    let r = ''

    type = _dumpType(o)

    switch (type) {
      case 'regexp':
        var t = type
        r += `<table${_dumpStyles(t, 'table')}><tr><th colspan="2"${_dumpStyles(
          t,
          'th'
        )}>${t}</th></tr>`
        r += `<tr><td colspan="2"${_dumpStyles(
          t,
          'td-value'
        )}><table${_dumpStyles('arguments', 'table')}><tr><td${_dumpStyles(
          'arguments',
          'td-key'
        )}><i>RegExp: </i></td><td${_dumpStyles(
          type,
          'td-value'
        )}>${o}</td></tr></table>`
        j++
        break
      case 'date':
        var t = type
        r += `<table${_dumpStyles(t, 'table')}><tr><th colspan="2"${_dumpStyles(
          t,
          'th'
        )}>${t}</th></tr>`
        r += `<tr><td colspan="2"${_dumpStyles(
          t,
          'td-value'
        )}><table${_dumpStyles('arguments', 'table')}><tr><td${_dumpStyles(
          'arguments',
          'td-key'
        )}><i>Date: </i></td><td${_dumpStyles(
          type,
          'td-value'
        )}>${o}</td></tr></table>`
        j++
        break
      case 'function':
        var t = type
        const a = o.toString().match(/^.*function.*?\((.*?)\)/im)
        const args =
          a == null || typeof a[1] == 'undefined' || a[1] == '' ? 'none' : a[1]
        r += `<table${_dumpStyles(t, 'table')}><tr><th colspan="2"${_dumpStyles(
          t,
          'th'
        )}>${t}</th></tr>`
        r += `<tr><td colspan="2"${_dumpStyles(
          t,
          'td-value'
        )}><table${_dumpStyles('arguments', 'table')}><tr><td${_dumpStyles(
          'arguments',
          'td-key'
        )}><i>Arguments: </i></td><td${_dumpStyles(
          type,
          'td-value'
        )}>${args}</td></tr><tr><td${_dumpStyles(
          'arguments',
          'td-key'
        )}><i>Function: </i></td><td${_dumpStyles(
          type,
          'td-value'
        )}>${o}</td></tr></table>`
        j++
        break
      case 'domelement':
        var t = type
        r += `<table${_dumpStyles(t, 'table')}><tr><th colspan="2"${_dumpStyles(
          t,
          'th'
        )}>${t}</th></tr>`
        r += `<tr><td${_dumpStyles(
          t,
          'td-key'
        )}><i>Node Name: </i></td><td${_dumpStyles(
          type,
          'td-value'
        )}>${o.nodeName.toLowerCase()}</td></tr>`
        r += `<tr><td${_dumpStyles(
          t,
          'td-key'
        )}><i>Node Type: </i></td><td${_dumpStyles(type, 'td-value')}>${
          o.nodeType
        }</td></tr>`
        r += `<tr><td${_dumpStyles(
          t,
          'td-key'
        )}><i>Node Value: </i></td><td${_dumpStyles(type, 'td-value')}>${
          o.nodeValue
        }</td></tr>`
        r += `<tr><td${_dumpStyles(
          t,
          'td-key'
        )}><i>innerHTML: </i></td><td${_dumpStyles(type, 'td-value')}>${
          o.innerHTML
        }</td></tr>`
        j++
        break
    }

    if (/object|array/.test(type)) {
      for (i in o) {
        var t = _dumpType(o[i])
        if (j < 1) {
          r += `<table${_dumpStyles(
            type,
            'table'
          )}><tr><th colspan="2"${_dumpStyles(type, 'th')}>${type}</th></tr>`
          j++
        }
        if (typeof o[i] == 'object' && o[i] != null) {
          r += `<tr><td${_dumpStyles(type, 'td-key')}>${i}${
            st ? ` [${t}]` : ''
          }</td><td${_dumpStyles(type, 'td-value')}>${recurse(
            o[i],
            t
          )}</td></tr>`
        } else if (typeof o[i] == 'function') {
          r += `<tr><td${_dumpStyles(type, 'td-key')}>${i}${
            st ? ` [${t}]` : ''
          }</td><td${_dumpStyles(type, 'td-value')}>${recurse(
            o[i],
            t
          )}</td></tr>`
        } else {
          r += `<tr><td${_dumpStyles(type, 'td-key')}>${i}${
            st ? ` [${t}]` : ''
          }</td><td${_dumpStyles(type, 'td-value')}>${o[i]}</td></tr>`
        }
      }
    }

    if (j == 0) {
      r += `<table${_dumpStyles(
        type,
        'table'
      )}><tr><th colspan="2"${_dumpStyles(
        type,
        'th'
      )}>${type} [empty]</th></tr>`
    }

    r += '</table>'

    return r
  }
}

onMounted(() => {
  dump(
    999,
    // [1, 2, { name: 'Michael', age: 38, job: true, grades: ['A', 'B', 'C'] }],
    true
  )
})
</script>

<template>
  <div v-html="log"></div>
</template>
