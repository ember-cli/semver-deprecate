import { describe, it, expect, beforeEach } from 'vitest';
import stripAnsi from 'strip-ansi';

// leave this one as a require because this is the point of the test file
const { makeDeprecate } = require('semver-deprecate');

let deprecate;

describe('basic cjs test', () => {
  beforeEach(async () => {
    deprecate = makeDeprecate('ember-cli', '3.0.0');
  });
  it('it does nothing when the condition argument is truthy', function () {
    let message = deprecate('description', true, {
      for: 'foo',
      id: 'foo',
      since: {
        available: '4.0.0',
        enabled: '4.0.0',
      },
      until: '5.0.0',
    });

    expect(message).to.be.undefined;
  });

  it('it displays a deprecation message when the condition argument is falsy', function () {
    let message = deprecate('description', false, {
      for: 'foo',
      id: 'foo',
      since: {
        available: '4.0.0',
        enabled: '4.0.0',
      },
      until: '5.0.0',
    });

    expect(stripAnsi(message)).to.be.equal(` DEPRECATION \n
description

ID     foo
UNTIL  5.0.0`);
  });
});
