import chalk from 'chalk';
import semver from 'semver';
import assert from './assert.js';

/**
 * Create a new deprecate function for your library.
 * 
 * ```js
 * import { makeDeprecate } from 'semver-deprecate';
 * import pkg from "./package.json" with { type: "json" };
 * 
 * const deprecate = makeDeprecate(pkg.name, pkg.version);
 * ```
 *
 * @param {string} deprecateLib the library that you are creating a deprecate function for (usually name in package.json)
 * @param {*} currentVersion the current version of the library you are creating a deprecate function for (usually read from package.json)
 */
export function makeDeprecate(deprecateLib, currentVersion) {
  /**
   * Display a deprecation message.
   *
   * ```js
   * deprecate('The `foo` method is deprecated.', false, {
   *   for: 'ember-cli',
   *   id: 'ember-cli.foo-method',
   *   since: {
   *     available: '4.1.0',
   *     enabled: '4.2.0',
   *   },
   *   until: '5.0.0',
   *   url: 'https://example.com',
   * });
   * ```
   *
   * @param {String} description Describes the deprecation.
   * @param {Any} condition If falsy, the deprecation message will be displayed.
   * @param {Object} options An object including the deprecation's details:
   * - `for` The library that the deprecation is for
   * - `id` The deprecation's unique id
   * - `since.available` A SemVer version indicating when the deprecation was made available
   * - `since.enabled` A SemVer version indicating when the deprecation was enabled
   * - `until` A SemVer version indicating until when the deprecation will be active
   * - `url` A URL that refers to additional information about the deprecation
   */
  return function deprecate(description, condition, options) {
    assert(
      'When calling `deprecate`, you must provide a description as the first argument.',
      description,
    );
    assert(
      'When calling `deprecate`, you must provide a condition as the second argument.',
      arguments.length > 1,
    );

    assert(
      'When calling `deprecate`, you must provide an options object as the third argument. The options object must include the `for`, `id`, `since` and `until` options (`url` is optional).',
      options,
    );

    assert(
      'When calling `deprecate`, you must provide the `for` option.',
      options.for,
    );
    assert(
      'When calling `deprecate`, you must provide the `id` option.',
      options.id,
    );

    assert(
      'When calling `deprecate`, you must provide the `since` option. `since` must include the `available` and/or the `enabled` option.',
      options.since,
    );

    assert(
      'When calling `deprecate`, you must provide the `since.available` and/or the `since.enabled` option.',
      options.since.available || options.since.enabled,
    );

    assert(
      '`since.available` must be a valid SemVer version.',
      !options.since.available || isSemVer(options.since.available),
    );

    assert(
      '`since.enabled` must be a valid SemVer version.',
      !options.since.enabled || isSemVer(options.since.enabled),
    );

    assert(
      'When calling `deprecate`, you must provide a valid SemVer version for the `until` option.',
      isSemVer(options.until),
    );

    if (condition) {
      return;
    }

    if (
      options.for === deprecateLib &&
      isDeprecationRemoved(options.until, currentVersion)
    ) {
      throw new Error(
        `The API deprecated by ${options.id} was removed in ${deprecateLib}@${options.until}. The message was: ${description}. Please see ${options.url} for more details.`,
      );
    }

    let message = formatMessage(description, options);

    warn(message);
    warn('');
    warn(getStackTrace());

    // Return the message for testing purposes.
    // This can be removed once we can register deprecation handlers.
    return message;
  };
}

function isSemVer(version) {
  return semver.valid(version) !== null;
}

function formatMessage(description, options) {
  let message = [
    chalk.inverse(' DEPRECATION '),
    '\n\n',
    description,
    '\n\n',
    `ID     ${options.id}`,
    '\n',
    `UNTIL  ${options.until}`,
  ];

  if (options.url) {
    message.push('\n', `URL    ${options.url}`);
  }

  return message.join('');
}

function getStackTrace() {
  let error = new Error();
  let lines = error.stack.split('\n');

  lines.shift(); // Remove the word `Error`.

  return lines.map((line) => line.trim()).join('\n');
}

function warn(message) {
  console.warn(chalk.yellow(message));
}

function isDeprecationRemoved(until, currentVersion) {
  return semver.gte(
    semver.coerce(currentVersion, { includePrerelease: false }),
    until,
  );
}
