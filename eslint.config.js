import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    files: ['tests/*.cjs'],
    languageOptions: {
      // yes it's a cjs file but vitest needs it to have imports for some things to this makes eslint happy
      sourceType: 'module',
    },
  },
  {
    ignores: ['dist/*'],
  },
];
