# use-caret-position

A custom React hook for grabbing the caret position in an input field.

## Install

```shell
npm i use-caret-position
```

```shell
yarn add use-caret-position
```

## Usage

Refer to `src/app/index.js` for common usage examples.

At a high-level, you pass the hook an input ref.

```javascript
import useCaretPosition from 'use-caret-position'
```
```javascript
const { x, y, getPosition, getSelection } = useCaretPosition(inputRef)
```

You get an `x` and `y` coordinate that you can use to display a marker with. I'd recommend using CSS variables for this. This is what the demos do. `getPosition` and `getSelection` are functions you can trigger whenever needed to update the `x` and `y` positions.

`getPosition` returns the position at `selectionStart` for an input. `getSelection` returns a midpoint between `selectionStart` and `selectionEnd` for an input. It's tricky to provide an exact accurate `x` and `y` for the caret in all scenarios so often you might need to adjust the positioning slightly with CSS transforms.

## Development

Package is built with `parcel-bundler`. To get to work, use `yarn dev`.

To work with the test app, you'll also need to run `yarn` and `yarn dev` from within `src/app`.

To work with the published node module directly, use `npm link` in the root of the repo.

Then use `npm link use-caret-position` within `src/app`.

---

Made in haste by @jh3y 2020 :sweat_smile:
