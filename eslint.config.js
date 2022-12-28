module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "airbnb-typescript",
    "plugin:eslint-comments/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/comma-dangle": "off",
  },
  overrides: [
    {
      files: ["./stories/**/*stories*"],
      rules: {
        "import/no-default-export": 0,
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
