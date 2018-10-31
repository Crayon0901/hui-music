// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    /*"off" or 0 - 关闭规则
      "warn" or 1 - 将规则视为一个警告（不会影响退出码）
      "error" or 2 - 将规则视为一个错误 (退出码为1)
    */
    //要求箭头函数的参数使用圆括号,禁用
    'arrow-parens': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    //不检测文件末尾空行
    'eol-last': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': 0,
    //禁用 tab
    'no-tabs': 0,
    //强制使用一致的缩进
    'indent': 0,
    //要求或禁止使用分号代替 ASI
    'semi': 0
  }
}
