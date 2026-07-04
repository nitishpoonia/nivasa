import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Boundary rules from CLAUDE.md section 1.
  {
    files: ["src/app/**/*.{ts,tsx}", "src/modules/*/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@sanity/client",
              message:
                "app/ and ui/ must not import @sanity/client directly. Go through @/lib/cms.",
            },
            {
              name: "groq",
              message:
                "app/ and ui/ must not import GROQ directly. Go through @/lib/cms.",
            },
          ],
          patterns: [
            {
              group: ["@/lib/cms/sanity/*"],
              message:
                "Do not reach into the Sanity adapter directly. Import from @/lib/cms instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/modules/*/domain/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              message: "domain/ must be framework-free. No react imports.",
            },
            {
              name: "next",
              message: "domain/ must be framework-free. No next imports.",
            },
          ],
          patterns: [
            {
              group: ["@sanity/*"],
              message: "domain/ must be framework-free. No Sanity imports.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/modules/*/application/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              message: "application/ must stay framework-free.",
            },
            {
              name: "next",
              message: "application/ must stay framework-free.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
