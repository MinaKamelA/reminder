const conf = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  plugins: [

  ],
  rules: {
    semi: [1, 'always'],
    '@typescript-eslint/semi': [1, 'always'],
    indent: [1, 2]
  }
};
module.exports = conf;
