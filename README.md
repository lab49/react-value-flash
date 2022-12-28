# @lab49/react-value-flash

[![codecov](https://codecov.io/gh/lab49/react-value-flash/branch/master/graph/badge.svg)](https://codecov.io/gh/lab49/react-value-flash) [![.github/workflows/cicd.yml](https://github.com/lab49/react-value-flash/actions/workflows/cicd.yml/badge.svg)](https://github.com/lab49/react-value-flash/actions/workflows/cicd.yml) [![npm version](https://img.shields.io/npm/v/@lab49/react-value-flash?label=version&color=%2354C536&logo=npm)](https://www.npmjs.com/package/@lab49/react-value-flash) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

<h3>&nbsp;</h3>
<p align="center">
  <img src="https://github.com/lab49/react-value-flash/blob/f5329bea47bd6635a86b9ae7ff3eb07003f61ed1/.github/react-value-flash.png?raw=true" width="400">
	<p align="center">Flash on value change. Perfect for financial applications.</p>
</p>
<h3>&nbsp;</h3>

`react-value-flash` will display a flashed value on screen based on some value change. This pattern is extremely common in financial applications, and at Lab49, we're focused on the finance industry.

Incorporate this component into your application and pass along a number. As that number changes, this component will briefly flash a color, letting the user know the number has changed. By default, this component will flash green when the value changes up, or red when the value changes down.

Not only are these colors configurable, but the properties of the flash itself and the formatting of the value are configurable as well.

Furthermore, this component doesn't come with any styles, but does provide plenty of hooks to add your own styles. Even though flash color and transition properties are configurable as props, you can still use the generated classnames (which are also configurable) to add your own unique styles.

<p align="center">
  <img src="https://github.com/lab49/react-value-flash/blob/f5329bea47bd6635a86b9ae7ff3eb07003f61ed1/.github/motion.gif?raw=true">
</p>

This component is perfect for:

- Trading platforms
- Analytics dashboards
- Monitoring dashboards

## Features

- Written in TypeScript
- Small, simple, configurable, performant
- Maintained by a team of finance industry professionals

## Table of contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
	- [`Flash`](#Flash)
  - [`Props`](#Props)
  - [`FlashDirection`](#FlashDirection)
- [License](#License)
- [TODO](#TODO)

## Demo

Hosted demo: [https://master--5f3fca6e6b5eba0022c71e4e.chromatic.com/](https://master--5f3fca6e6b5eba0022c71e4e.chromatic.com/)

You can also run the demo locally. To get started:

```sh
git clone git@github.com:lab49/react-value-flash.git
npm install
npm run storybook
```

###### [⇡ Top](#table-of-contents)

## Installation

```sh
npm install @lab49/react-value-flash
```

###### [⇡ Top](#table-of-contents)

## Usage

```js
import { Flash } from '@lab49/react-value-flash';

<Flash value={20_000}>
```

As discussed above, there are a number of classnames you can use to add your own styles. There is an example of doing exactly that in the include [Storybook](./stories/Flash.stories.tsx), but as an example, here's a description of the available classnames:

| Class | Description |
| --- | --- |
| `.rvf_Flash` | Root DOM node |
| `.rvf_Flash__value` | Rendered value, direct (and only) child of the root node. |
| `.rvf_Flash--flashing` | Applied only when the component is in the flashing state. |
| `.rvf_Flash--flashing-up` | Applied when flashing 'up'. |
| `.rvf_Flash--flashing-down` | Applied when flashing 'down'. |
| `.rvf_Flash--positive` | Applied when the value is positive. |
| `.rvf_Flash--negative` | Applied when the value is negative. |

###### [⇡ Top](#table-of-contents)

## API

### `Flash`

`<Flash />` is a `(props: Props) => JSX.Element`. See `Props` below for a description of the avilable props.

```ts
import { Flash } from '@lab49/react-value-flash';

const MyComponent = () => <Flash value={1} />;
```

### `Props`

```ts
interface Props {
  /**
   * Color value when the component flashes 'down'.
   */
  downColor?: string;
  /**
   * One of the built in formatters.
   */
  formatter?: 'currency' | 'percentage' | 'number';
  /**
   * Pass your own formatter function.
   */
  formatterFn?: Formatter;
  /**
   * Prefix for the CSS selectors in the DOM.
   */
  stylePrefix?: string;
  /**
   * Amount of time the flashed state is visible for, in milliseconds.
   */
  timeout?: number;
  /**
   * Custom CSS transition property.
   */
  transition?: string;
  /**
   * Transition length, in milliseconds.
   */
  transitionLength?: number;
  /**
   * Color value when the component flashes 'up'.
   */
  upColor?: string;
  /**
   * Value to display. The only required prop.
   */
  value: number;
}
```

### `FlashDirection`

```ts
enum FlashDirection {
  Down = 'down',
  Up = 'up',
}
```

###### [⇡ Top](#table-of-contents)

## License

MIT @ [Lab49](https://lab49.com)

###### [⇡ Top](#table-of-contents)

## Sponsored by Lab49

<a href="https://lab49.com">
  <img src="https://www.lab49.com/wp-content/uploads/2020/06/logo.svg" />
</a>
