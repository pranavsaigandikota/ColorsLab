export default [
  {
    ignores: ["public/js/md5.js", "node_modules/**"]
  },
  {
    files: ["public/js/code.js"],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        document: "readonly",
        window: "readonly",
        XMLHttpRequest: "readonly",
        JSON: "readonly",
        parseInt: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        console: "readonly",
        alert: "readonly",
        Date: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-var": "error",
      "semi": ["error", "always"],
      "no-dupe-keys": "error"
    }
  }
];
