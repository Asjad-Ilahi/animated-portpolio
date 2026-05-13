// eslint.config.mjs
import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import unusedImports from "eslint-plugin-unused-imports"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
  // Ignores first
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "scripts/**"],
  },

  // Next + Prettier legacy configs via compat
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

  // Your rules + plugin registration
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // turn off competing rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // use the plugin
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // your extras
      "react/no-unescaped-entities": "warn",
      "no-irregular-whitespace": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
]
