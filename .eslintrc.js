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
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "undef": false,
    'indent': 'off',
    "no-extra-boolean-cast": 0,
    "no-unneeded-ternary": 1,
    "eqeqeq": 0
  },
  globals:{
    document: true,
    localStorage: true,
    window: true,
    $: true,
    wx: true,
    CKobject: true,
    AMap: true,
    BMap: true,
    requestAnimFrame: true
  }
}
