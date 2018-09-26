module.exports = {
  "extends": "airbnb",
  "rules": {
    "implicit-arrow-linebreak": [0],
    "global-require": [1],
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "react/jsx-boolean-value": [0],
    "react/prefer-stateless-function": [0],
    "react/prop-types": [0],
    "react/jsx-indent": [0],
    "react/sort-comp": [0],
    "react/no-multi-comp": [0],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore"
    }],
    "no-unused-vars": [2, {
      "vars": "all",
      "args": "after-used",
      "varsIgnorePattern": "^React",
      "ignoreRestSiblings": true
    }],
    "no-param-reassign": [0],
    "function-paren-newline": [0],
    "prefer-destructuring": [0],
    "no-plusplus": [0],
    "func-names": [0],
    "no-underscore-dangle": [0],
    "prefer-promise-reject-errors": [0],
    "object-curly-newline": [0],
    "import/no-extraneous-dependencies": [0],
    "import/first": [0],
    "import/extensions": [0],
    "import/no-unresolved": [0],
    "import/prefer-default-export": [0],
    "no-restricted-syntax": [0],
    "no-class-assign": [1],
    "jsx-a11y/anchor-is-valid": [0],
    "jsx-a11y/interactive-supports-focus": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/no-static-element-interactions": [0],
    "jsx-a11y/no-noninteractive-element-interactions": [0],
    "lines-between-class-members": [1]
  }
};