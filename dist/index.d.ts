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
export function makeDeprecate(deprecateLib: string, currentVersion: any): (description: string, condition: Any, options: any, ...args: any[]) => string;
//# sourceMappingURL=index.d.ts.map