import * as React from 'react';
import { isNullOrUndefined } from 'util';

/**
 * SetStateAction replacement that has an optional value and will simply toggle the boolean value if no value is supplied.
 */
export type ToggleStateAction = (value?: React.SetStateAction<boolean>) => void;

/**
 * A useState like hook for boolean values that returns the state, and a ToggleStateAction instead of a SetStateAction that allows
 * the setState callback to be called without passing any arguments to simply toggle the boolean value.
 * 
 * @param initialState
 */
export function useToggleState(initialState?: boolean | (() => boolean)): [boolean, ToggleStateAction] {
    const [state, setState] = React.useState<boolean>(initialState ?? false);
    const toggle = React.useCallback((value?: React.SetStateAction<boolean>) => {
        setState(prevState => {
            // If we are being told which value to use, use it
            if (!isNullOrUndefined(value)) {
                if (value instanceof Function) {
                    return value(prevState);
                }

                return value;
            }

            // Otherwise simply toggle the value.
            return !prevState;
        });
    }, [setState]);

    return [state, toggle];
}