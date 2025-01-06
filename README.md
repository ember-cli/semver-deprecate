# semver-deprecate

This is a tiny micro-library that extracts the "Ember way" of doing deprecations into a re-usable library. The philosophy of this library is that if you have marked something to be deprecated "until" a certain major version that deprecation call should throw an error once the library's version has exceeded that major version. This allows you to remove code in minor PRs after a major release has been cut because any code-path that used to hit this deprecation is now throwing and thus no longer supported.

## Usage

```js
import { makeDeprecate } from 'semver-deprecate';

import pkg from './package.json' with { type: 'json' };

const deprecate = makeDeprecate(pkg.name, pkg.version);

deprecate('The `foo` method is deprecated.', false, {
  for: 'your-lib',
  id: 'your-lib.foo-method', // a unique ID for the deprecation
  since: {
    available: '4.1.0',
    enabled: '4.2.0',
  },
  until: '5.0.0',
  url: 'https://example.com',
});
```
