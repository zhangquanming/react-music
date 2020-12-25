module.exports = {
  // 指定校验的ECMAScript的版本及特性
  parserOptions: {
    ecmaVersion: 7, // ECMAScript版本，7为ES7
    sourceType: 'module', //默认script，如果代码是ECMAScript模块，设置为module
    ecmaFeatures: {
      // 使用额外的语言特性
      jsx: true, // 启用JSX
    },
  },
  // 当访问未定义的变量时，no-undef 规则将发出警告
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: 'babel-eslint',
  // 当访问未定义的变量时，no-undef 规则将发出警告
  // 脚本在执行期间访问的额外的全局变量
  globals: {
    document: true,
    navigator: true,
    window: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react', 'jsx-a11y', 'import', 'react-hooks'],
  // 定义自己的规则
  rules: {
    // 'no-unused-vars': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'prettier/prettier': [
      'error',
      {
        semi: true, // 句末加分号
        singleQuote: true, // 用单引号
        trailingComma: 'es5', // 最后一个对象元素加逗号
        bracketSpacing: true, // 对象，数组加空格
        jsxBracketSameLine: false, // jsx > 是否另起一行
        arrowParens: 'avoid', // (x) => {} 是否要有小括号
        proseWrap: 'preserve', // 是否要换行
      },
    ],
  },
};
