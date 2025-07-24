import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    'jsx-quotes': ['error', 'prefer-double'],

    'import/no-duplicates': 'error',
    'import/prefer-default-export': 'off',

    'no-void': 'off',

    'no-irregular-whitespace': 'off',
    'vue/no-irregular-whitespace': 'off',
    'n/prefer-global/process': 'off',

    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-refresh/only-export-components': 'off',
    'react/no-nested-components': 'off',

    'react/no-context-provider': 'off',
    'react/no-forward-ref': 'off',

    'style/jsx-sort-props': 'error',
  },
})
