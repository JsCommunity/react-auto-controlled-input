# uncontrollable-input [![Build Status](https://travis-ci.org/JsCommunity/uncontrollable-input.png?branch=master)](https://travis-ci.org/JsCommunity/uncontrollable-input)

> Simplify the creation of controlled/uncontrolled React inputs


Features:

- fully compatible with React 15 (both stateful and stateless components)
- full controlled and uncontrolled modes support
- errors in dev mode on incorrect uses (`NODE_ENV != 'production'`)
- full getter/setter support
- `undefined` can be used in controlled mode (as long as there is a `value` prop)

## Install

### Node & [Browserify](http://browserify.org/)/[Webpack](https://webpack.js.org/)

Installation of the [npm package](https://npmjs.org/package/uncontrollable-input):

```
> npm install --save uncontrollable-input
```

Then require the package:

```javascript
// ES2015
import uncontrollableInput from 'uncontrollable-input'

// ES5
const uncontrollableInput = require('uncontrollable-input').default
```

### Browser

You can directly use the build provided at [unpkg.com](https://unpkg.com):

```html
<script src="https://unpkg.com/uncontrollable-input@0/dist/umd.js"></script>
```

## Usage

Create a controlled input and use the decorator:

```js
const MyInput = @uncontrollableInput(({ onChange, value }) =>
  <input
    onChange={this.props.onChange}
    value={this.props.value}
  />
)
```

You can now use it in either controlled or uncontrolled mode:

```js
// uncontrolled: defaultValue and ref
<MyInput
  defaultValue='foo bar'
  ref={ref => {
    if (ref) {
      console.log(ref.value) // getter/setter
    }
  }}
/>

// controlled:
<MyInput
  onChange={event => {
    this.linkState({ value: event.target.value })
  }}
  value={this.state.value}
/>
```

## Development

```
# Install dependencies
> npm install

# Run the tests
> npm test

# Continuously compile
> npm run dev

# Continuously run the tests
> npm run dev-test

# Build for production (automatically called by npm install)
> npm run build
```

## Contributions

Contributions are *very* welcomed, either on the documentation or on
the code.

You may:

- report any [issue](https://github.com/JsCommunity/uncontrollable-input/issues)
  you've encountered;
- fork and create a pull request.

## License

ISC © [Julien Fontanet](https://github.com/julien-f)
