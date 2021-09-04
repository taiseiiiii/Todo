/* eslint-disable linebreak-style */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['react-app', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': ['error', 'windows'],
        quotes: 0, //['error', 'single'],//一旦オフにする
        semi: ['error', 'always'],
    },
};
