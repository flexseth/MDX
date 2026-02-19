import { useState } from 'react';

/**
 * A useState drop-in that persists the value to localStorage.
 *
 * On mount, reads the stored value for the given key. On update,
 * writes the new value back to localStorage so it survives page reloads.
 *
 * Mirrors the concept of WordPress block attributes persisting editor state,
 * adapted for a browser-side React/MDX documentation environment.
 *
 * @template T
 * @param {string} key          - localStorage key. Use a unique key per demo instance.
 * @param {T}      defaultValue - Value used when nothing is stored yet.
 * @returns {[T, Function]}     - Current value and setter, same signature as useState.
 */
export function useLocalStorage( key, defaultValue ) {
	const [ value, setValue ] = useState( () => {
		try {
			const stored = localStorage.getItem( key );
			return stored !== null ? JSON.parse( stored ) : defaultValue;
		} catch {
			return defaultValue;
		}
	} );

	const setStoredValue = ( newValue ) => {
		setValue( newValue );
		try {
			localStorage.setItem( key, JSON.stringify( newValue ) );
		} catch {
			// Silently ignore write errors (e.g. private browsing quota exceeded).
		}
	};

	return [ value, setStoredValue ];
}
