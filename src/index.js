import { createElement, PureComponent } from 'react'

// If the param is an event, returns the value of it's target,
// otherwise returns the param.
const getEventValue = event => {
  let target
  if (!event || !(target = event.target)) {
    return event
  }

  return (
    target.nodeName.toLowerCase() === 'input' &&
    target.type.toLowerCase() === 'checkbox'
  )
    ? target.checked
    : target.value
}

// This decorator can be used on a controlled input component to make
// it able to automatically handled the uncontrolled mode.
export default options => ControlledInput => {
  class UncontrollableInput extends PureComponent {
    constructor (props) {
      super()

      const opts = typeof options === 'function' ? options(props) : options
      const controlled = this._controlled = 'value' in props
      if (!controlled) {
        const { defaultValue = opts && opts.defaultValue } = props
        this.state = { value: defaultValue }

        this._onChange = event => {
          let defaultPrevented = false

          const { onChange } = this.props
          if (onChange) {
            onChange(event)
            defaultPrevented = event && event.defaultPrevented
          }

          if (!defaultPrevented) {
            this.setState({ value: getEventValue(event) })
          }
        }
      } else if (__DEV__ && 'defaultValue' in props) {
        throw new Error(`${this.constructor.name}: controlled component should not have a default value`)
      }
    }

    get value () {
      return this._controlled
        ? this.props.value
        : this.state.value
    }

    set value (value) {
      if (__DEV__ && this._controlled) {
        throw new Error(`${this.constructor.name}: should not set value on controlled component`)
      }

      this.setState({ value })
    }

    render () {
      let props = this.props

      if (!this._controlled) {
        props = {
          ...props,
          onChange: this._onChange,
          value: this.state.value
        }

        delete props.defaultValue
      }

      return createElement(ControlledInput, props)
    }
  }

  if (__DEV__) {
    UncontrollableInput.prototype.componentWillReceiveProps = function (newProps) {
      const { name } = this.constructor
      const controlled = this._controlled
      const newControlled = 'value' in newProps

      if (!controlled) {
        if (newControlled) {
          throw new Error(`${name}: uncontrolled component should not become controlled`)
        }
      } else if (!newControlled) {
        throw new Error(`${name}: controlled component should not become uncontrolled`)
      }

      if (newProps.defaultValue !== this.props.defaultValue) {
        throw new Error(`${name}: default value should not change`)
      }
    }
  }

  return UncontrollableInput
}
