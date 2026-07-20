import * as React from 'react';
import { isNullOrUndefined } from 'util';

/**
 * Callback to check if the value is true (or false) in the toggleable array by key.
 */
export type GetToggleStateArrayValue<Key> = (key: Key) => boolean;

/**
 * Callback to toggle an item in an array of booleans by key.
 */
export type ToggleStateArrayValueAction<Key> = (key: Key, value?: React.SetStateAction<boolean>) => void;

/**
 * A version of useToggleState that allows for management of an array of togglable states index by a key.
 * 
 * @param initialState
 */
export function useToggleStateArray<Key = string>(initialState?: Array<Key> | (() => Array<Key>)): [GetToggleStateArrayValue<Key>, ToggleStateArrayValueAction<Key>] {
    const [state, setState] = React.useState<Array<Key>>(initialState ?? []);

    const getState = React.useCallback((key: Key) => {
        return !!state.find(it => it === key);
    }, [state]);

    const toggle = React.useCallback((key: Key, value?: React.SetStateAction<boolean>) => {
        setState(prevState => {
            const currentValue = prevState.find(it => it === key);

            // Set an explicit value.
            if (!isNullOrUndefined(value)) {
                let newValue = value;
                if (value instanceof Function) {
                    newValue = value(!!currentValue);
                }

                if (newValue) {
                    return [...prevState.filter(it => it !== key), key];
                } else {
                    return prevState.filter(it => it !== key);
                }
            }

            // Toggle the state based on its current value.
            if (isNullOrUndefined(currentValue)) {
                return [...prevState, key];
            } else {
                return prevState.filter(it => it !== key);
            }
        });
    }, [setState]);

    return [getState, toggle];
}