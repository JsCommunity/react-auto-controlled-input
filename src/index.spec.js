/* eslint-env jest */

import React from 'react'
import { shallow, mount } from 'enzyme'

import uncontrollableInput from './'

describe('uncontrollableInput()', () => {
  let MyInput
  let receivedProps
  beforeAll(() => {
    MyInput = uncontrollableInput()(props => {
      receivedProps = props
      return null
    })
  })

  it('can be used in controlled mode', () => {
    const node = mount(<MyInput value='foo' />).getNode()

    expect(node._controlled).toBe(true)
    expect(receivedProps).toEqual({ value: 'foo' })
  })

  it('accepts undefined in controlled mode', () => {
    const node = mount(<MyInput value={undefined} />).getNode()

    expect(node._controlled).toBe(true)
    expect(receivedProps.value).toBe(undefined)
  })

  it('can be used in uncontrolled mode', () => {
    const node = mount(<MyInput defaultValue='foo' />).getNode()

    expect(node._controlled).toBe(false)
    expect(receivedProps.value).toEqual('foo')
    expect(receivedProps.onChange('bar'))
    expect(receivedProps.value).toEqual('bar')
  })

  it('falsy default value is correctly supported', () => {
    mount(<MyInput defaultValue='' />).getNode()

    expect(receivedProps.value).toEqual('')
  })

  it('throws if both defaultValue and value are present', () => {
    expect(() =>
      shallow(<MyInput defaultValue='foo' value='bar' />)
    ).toThrow(/controlled component should not have a default value/)
  })

  it('throws if the component becomes controlled', () => {
    const wrapper = shallow(<MyInput defaultValue='foo' />)

    expect(() => {
      wrapper.setProps({
        value: 'foo'
      })
    }).toThrow(/uncontrolled component should not become controlled/)
  })

  // See https://github.com/airbnb/enzyme/issues/851
  it.skip('throws if the component becomes uncontrolled', () => {
    const wrapper = shallow(<MyInput value='foo' />)

    expect(() => {
      wrapper.setProps({
        defaultValue: 'foo'
      })
    }).toThrow(/uncontrolled component should not become controlled/)
  })

  it('throws if the default value changes', () => {
    const wrapper = shallow(<MyInput defaultValue='foo' />)

    expect(() => {
      wrapper.setProps({
        defaultValue: 'bar'
      })
    }).toThrow(/default value should not change/)
  })

  describe('#get value()', () => {
    it('returns the current value', () => {
      expect(
        mount(<MyInput defaultValue='foo' />).getNode().value
      ).toBe('foo')

      expect(
        mount(<MyInput value='foo' />).getNode().value
      ).toBe('foo')
    })
  })

  describe('#set value()', () => {
    it('updates the value in uncontrolled mode', () => {
      const node = mount(<MyInput defaultValue='foo' />).getNode()

      node.value = 'bar'
      expect(node.value).toBe('bar')

      expect(receivedProps.value).toEqual('bar')
    })

    it('throws in controlled mode', () => {
      const node = mount(<MyInput value='foo' />).getNode()

      expect(() => {
        node.value = 'bar'
      }).toThrow(/should not set value on controlled component/)
    })
  })
})
