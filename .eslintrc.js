module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['airbnb', 'prettier', 'plugin:vue/essential'],
    plugins: ['prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'warn',
        'no-undef': 'off',
        'no-empty-pattern': 'off',
        'prettier/prettier': 'error',
        'func-names': 'off',
        'no-param-reassign': 'off',
        'no-alert': 'off',
        'import/no-unresolved': 'off',
    },
};
