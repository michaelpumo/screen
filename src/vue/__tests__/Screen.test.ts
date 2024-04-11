import { mount } from '@vue/test-utils'
import Screen from '../components/Screen.vue'

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
        label,
      },
    })

    const labelEl = wrapper.find('[data-test-label]')

    expect(labelEl.text()).toMatch(label)
  })

  it('renders correct number of rows with array and maxLength prop', async () => {
    const maxLength = 5
    const wrapper = mount(Screen, {
      props: {
        log: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        maxLength,
      },
    })

    const rows = wrapper.findAll('[data-test-main] > table > tbody > tr')
    const rowsOfData = rows.length - 2

    expect(rowsOfData).toBe(maxLength)
  })

  it('renders correct number of rows with object and maxLength prop', async () => {
    const maxLength = 5
    const wrapper = mount(Screen, {
      props: {
        log: {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
          f: 6,
          g: 7,
          h: 8,
          i: 9,
          j: 10,
        },
        maxLength,
      },
    })

    const rows = wrapper.findAll('[data-test-main] > table > tbody > tr')
    const rowsOfData = rows.length - 2

    expect(rowsOfData).toBe(maxLength)
  })
})
