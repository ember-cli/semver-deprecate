import { describe, it, assertType, expectTypeOf } from 'vitest';

import { makeDeprecate } from 'semver-deprecate';

describe('Types', function () {
  it('has the right types', function () {
    expectTypeOf(makeDeprecate).toBeFunction();
    expectTypeOf(makeDeprecate).parameter(0).toBeString();

    assertType(makeDeprecate('thingy', '0.1.0'));

    const deprecateFunction = makeDeprecate('thingy', '0.1.0');

    expectTypeOf(deprecateFunction).toBeFunction();
    expectTypeOf(deprecateFunction).parameter(0).toBeString();
    expectTypeOf(deprecateFunction).parameter(1).toBeBoolean();
    expectTypeOf(deprecateFunction)
      .parameter(2)
      .toEqualTypeOf<{
        for: string;
        id: string;
        since: { available: string; enabled: string };
        until: string;
      }>();
  });
});
