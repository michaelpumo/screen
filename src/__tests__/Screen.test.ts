import { mount } from '@vue/test-utils'
import Screen from '@/components/Screen.vue'

describe('Screen.vue', () => {
  it('renders label correctly with default value', () => {
    const wrapper = mount(Screen)
    const labelEl = wrapper.find('[data-test-label]')

    expect(labelEl.text()).toMatch('Screen Log')
  })

  it('renders label correctly from label prop', () => {
    const label = 'Test Label'
    const wrapper = mount(Screen, {
      props: {
        label
      }
    })

    const labelEl = wrapper.find('[data-test-label]')

    expect(labelEl.text()).toMatch(label)
  })

  it('renders correct number of rows with array and maxLength prop', async () => {
    const maxLength = 5
    const wrapper = mount(Screen, {
      props: {
        log: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        maxLength
      }
    })

    const rows = wrapper.findAll('[data-test-main] > table > tr')
    const rowsOfData = rows.length - 2

    expect(rowsOfData).toBe(maxLength)
  })

  it('renders correct number of rows with object and maxLength prop', async () => {
    const maxLength = 5
    const wrapper = mount(Screen, {
      props: {
        log: {
          a: 'a',
          b: 'b',
          c: 'c',
          d: 'd',
          e: 'e',
          f: 'f',
          g: 'g',
          h: 'h',
          i: 'i',
          j: 'j'
        },
        maxLength
      }
    })

    const rows = wrapper.findAll('[data-test-main] > table > tr')
    const rowsOfData = rows.length - 2

    expect(rowsOfData).toBe(maxLength)
  })
})
