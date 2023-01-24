module.exports = {
    extends: ['airbnb-base', 'airbnb-typescript/base'],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        'max-len': ['error', { code: 120 }],
        'import/prefer-default-export':'off',
        'class-methods-use-this': 'off',
    }
}