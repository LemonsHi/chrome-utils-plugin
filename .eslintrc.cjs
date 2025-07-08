module.exports = {
  root: true, // 阻止 ESLint 继续向上搜索配置 :contentReference[oaicite:4]{index=4}
  parser: '@typescript-eslint/parser', // 让 ESLint 解析 TS
  parserOptions: {
    ecmaVersion: 2022, // 支持最新 ECMAScript 语法
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'prettier', // 把 Prettier 结果作为 ESLint 规则输出 :contentReference[oaicite:5]{index=5}
  ],
  extends: [
    'airbnb', // Airbnb 基础规则
    'airbnb/hooks',
    'airbnb-typescript', // Airbnb + TypeScript 增强 :contentReference[oaicite:6]{index=6}
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended-type-checked', // TS 推荐规则 :contentReference[oaicite:7]{index=7}
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // 启用 eslint-plugin-prettier 并与 Prettier 冲突解决
  ],
  settings: {
    react: { version: 'detect' }, // 自动探测 React 版本 :contentReference[oaicite:8]{index=8}
    'import/resolver': {
      typescript: { project: './tsconfig.json' }, // import 路径 alias 与 TS 同源配置
    },
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  rules: {
    // 示例：增删规则可按团队习惯微调
    'react/react-in-jsx-scope': 'off', // React 17+ 不再需要显式 import React
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'consistent-return': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    'import/prefer-default-export': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'no-return-assign': 'off',
    'no-nested-ternary': 'off',
    'prettier/prettier': 'error', // 任何与 Prettier 不一致的格式都视为错误
  },
  ignorePatterns: ['dist', 'public'],
};

// eslint@typescript-eslint/no-unused-expressions
