# use-toggle-state
A useState like hook for boolean values that returns the state, and a ToggleStateAction instead of a SetStateAction that allows
the setState callback to be called without passing any arguments to simply toggle the boolean value.

## Installation

Install use-toggle-state locally within your project folder, like so:

```shell
npm install use-toggle-state
```

Or with yarn:

```shell
yarn add use-toggle-state
```

## Basic Usage

Use this state when you want a boolean state that can be easily toggled

### Typescript
```ts
import { useToggleState } from 'use-toggle-state';

const [isOpen, toggleOpen] = useToggleState(false);

// Toggle between true and false.
toggleOpen();

// Set a specific value (true).
toggleOpen(true);

```

### Javascript
```js
import { useToggleState } from 'use-toggle-state';

const [isOpen, toggleOpen] = useToggleState(false);

// Toggle between true and false.
toggleOpen();

// Set a specific value (true).
toggleOpen(true);

```

## Array Usage

You can also use useToggleStateArray() to maintain a set of toggleable states as an array with keys.

```ts
import { useToggleStateArray } from 'use-toggle-state';

const [isOpen, toggleOpen] = useToggleStateArray();

// Check if we are open for a key
isOpen(key);

// Toggle a key between true and false.
toggleOpen(key);

// Set a specific value (true) for a key.
toggleOpen(key, true);

```

### Javascript
```js
import { useToggleState } from 'use-toggle-state';

const [isOpen, toggleOpen] = useToggleState(false);

```

## Typescript
This package is written in typescript and comes with its own bindings.

## License

Licensed under the MIT license.
