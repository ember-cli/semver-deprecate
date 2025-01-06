/**
 * Verify that a certain condition is met, or throw an error if otherwise.
 *
 * This is useful for communicating expectations in the code to other human
 * readers as well as catching bugs that accidentally violate these expectations.
 *
 * ```js
 * const { assert } = require('ember-cli/lib/debug');
 *
 * // Test for truthiness:
 * assert('Must pass a string.', typeof str === 'string');
 *
 * // Fail unconditionally:
 * assert('This code path should never run.');
 * ```
 *
 * @method assert
 * @param {String} description Describes the condition.
 * This will become the message of the error thrown if the assertion fails.
 * @param {Any} condition Must be truthy for the assertion to pass.
 * If falsy, an error will be thrown.
 */
export default function assert(description: string, condition: Any): void;
//# sourceMappingURL=assert.d.ts.map