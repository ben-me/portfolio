import antfu from "@antfu/eslint-config";

export default antfu({
  vue: true,
  typescript: true,
  formatters: true,
  markdown: false,
  stylistic: {
    semi: true,
    indent: 2,
    quotes: "double",
  },
  ignores: ["app/paraglide/**"],
  plugins: {},
}, {
  rules: {
    "perfectionist/sort-imports": ["error", { tsconfig: { rootDir: "." } }],
    "no-console": "warn",
    "ts/consistent-type-definitions": ["error", "type"],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md", "CLAUDE.md"],
    }],
  },
});
