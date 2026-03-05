# React Compiler Demo

This project demonstrates how **React Compiler** automatically optimizes React components without the need for manual optimizations like `memo`, `useMemo`, and `useCallback`.

## 🚀 Features

### ✅ Good Examples (`GoodExamples.tsx`)
- Components **without** `React.memo()`
- Functions **without** `useCallback()`
- Calculations **without** `useMemo()`
- All automatically optimized by React Compiler!

### ❌ Bad Examples (`BadExamples.tsx`)
Examples of code that **violates Rules of React** and triggers ESLint errors:

1. **Object Mutation** - Mutating objects after creation
2. **Array Mutation** - Direct array mutations
3. **Conditional Hooks** - Calling hooks conditionally
4. **Props Mutation** - Mutating component props
5. **Side Effects During Render** - Side effects outside useEffect
6. **Stale State** - Using outdated state values
7. **Direct State Mutation** - Mutating state directly
8. **Unnecessary Derived State** - Redundant state derivation

## 🛠️ Setup

```bash
yarn install
yarn dev
```

Open your browser and navigate to the local development server (usually `http://localhost:5173`).

## 📋 ESLint Configuration

The project uses `eslint-plugin-react-compiler` to detect Rules of React violations:

```javascript
// eslint.config.js
import reactCompiler from 'eslint-plugin-react-compiler'

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
])
```

## 🔍 Check for Errors

Run ESLint to see all Rules of React violations:

```bash
yarn lint
```

Build the project to see React Compiler optimizations:

```bash
yarn build
```

### Expected ESLint Errors in `BadExamples.tsx`:

- ❌ **Conditional hook calls** (react-compiler/react-compiler)
  ```
  Hooks must always be called in a consistent order
  ```
- ❌ **Mutating props** (react-compiler/react-compiler)
  ```
  Mutating component props or hook arguments is not allowed
  ```
- ❌ **Side effects during render** (react-compiler/react-compiler)
  ```
  Writing to a variable defined outside a component is not allowed
  ```
- ❌ **Mutating state** (react-compiler/react-compiler)
  ```
  Mutating a value returned from 'useState()' is not allowed
  ```
- ❌ **Immutability violations** (react-hooks/immutability)

## 🎯 React Compiler Benefits

React Compiler automatically:
- ✅ Memoizes components (no need for `React.memo`)
- ✅ Memoizes values (no need for `useMemo`)
- ✅ Memoizes functions (no need for `useCallback`)
- ✅ Optimizes re-rendering without manual intervention
- ✅ Detects Rules of React violations via ESLint

**Note:** This will impact Vite dev & build performances, but the runtime performance will be significantly better.

## 🔧 Configuration

### Tech Stack
- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.3.1
- **babel-plugin-react-compiler** 1.0.0
- **eslint-plugin-react-compiler** 19.1.0-rc.2

### Vite Config (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
```

### ESLint Config (`eslint.config.js`)
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactCompiler from 'eslint-plugin-react-compiler'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
])
```

## 🎨 UI Navigation

Use the **tab navigation** at the top to switch between:
- **✅ Good Examples** - Properly optimized code with React Compiler
- **❌ Bad Examples** - Rules of React violations with ESLint errors

The navigation is **sticky** at the top, so it remains accessible as you scroll through the content.

## 🐛 Viewing ESLint Errors

Open `src/BadExamples.tsx` in your IDE to see:
- Red underlines on problematic code
- Hover over errors to see detailed messages
- ESLint will show exactly what Rules of React are violated

Example errors you'll see:
```
❌ Line 43: Hooks must always be called in a consistent order
❌ Line 53: Mutating component props is not allowed
❌ Line 63: Writing to external variables during render is not allowed
❌ Line 100: Mutating state returned from useState() is not allowed
```

**Note:** The ESLint errors in `BadExamples.tsx` are **intentional** to demonstrate what React Compiler detects and prevents!

## 📚 Learn More

- [React Compiler Documentation](https://react.dev/learn/react-compiler)
- [Rules of React](https://react.dev/reference/rules)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [eslint-plugin-react-compiler](https://www.npmjs.com/package/eslint-plugin-react-compiler)
- [babel-plugin-react-compiler](https://www.npmjs.com/package/babel-plugin-react-compiler)

## 📝 Project Structure

```
src/
├── App.tsx              # Main app with tab navigation
├── GoodExamples.tsx     # ✅ Good examples (optimized by React Compiler)
├── BadExamples.tsx      # ❌ Bad examples (Rules of React violations)
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🚨 Important Notes

1. **React Compiler works transparently** - you won't see special badges in React DevTools. The optimizations happen at compile time.

2. **ESLint is your friend** - The `react-compiler/react-compiler` rule will catch code that violates Rules of React and prevent React Compiler from optimizing it.

3. **Write clean React code** - Follow the Rules of React, and React Compiler will automatically optimize your components without manual `memo`, `useMemo`, or `useCallback`.

4. **The errors in `BadExamples.tsx` are intentional** - they serve as educational examples of what NOT to do.

## 🎓 Learning Path

1. Start by exploring `GoodExamples.tsx` to see properly written React code
2. Click "Bad Examples" tab to see common mistakes
3. Open `BadExamples.tsx` in your IDE to see ESLint errors
4. Run `yarn lint` to see all violations in the terminal
5. Compare the two approaches to understand React Compiler requirements

