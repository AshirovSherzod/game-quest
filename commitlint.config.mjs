/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['server', 'client', 'shared', 'engine', 'ci', 'deps', 'docs'],
    ],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'test',
        'docs',
        'chore',
        'ci',
        'perf',
        'build',
        'revert',
      ],
    ],
  },
};
