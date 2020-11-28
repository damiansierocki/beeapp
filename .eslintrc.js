module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'airbnb-base', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'no-empty-pattern': 'off',
        'import/no-unresolved': 'off',
        'no-alert': 'off',
        'no-param-reassign': 'off',
    },
};
