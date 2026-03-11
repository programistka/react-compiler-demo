# React Compiler Demo

This project demonstrates how **React Compiler** automatically optimizes React components without the need for manual optimizations like `memo`, `useMemo`, and `useCallback`.

## 🌐 Live Demo

**[View Live Demo](https://programistka.github.io/react-compiler-demo/)**

The demo is automatically deployed to GitHub Pages on every push to the main branch.

## 🚀 Features

### ✅ Good Examples (`GoodExamples.tsx`)
- Components **without** `React.memo()`
- Functions **without** `useCallback()`
- Calculations **without** `useMemo()`
- All automatically optimized by React Compiler!

### ❌ Bad Examples (`BadExamples.tsx`)
Examples of code that **violates Rules of React** and triggers ESLint errors:

1. **Conditional Hook Calls** - Calling hooks conditionally
2. **Props Mutation** - Mutating component props
3. **Side Effects During Render** - Side effects outside useEffect
4. **Direct State Mutation** - Mutating state directly
5. **Hook Inside a Loop** - Calling hooks in loops
6. **Hook Inside Nested Function** - Calling hooks in nested functions
7. **Missing Effect Dependencies** - useEffect with missing dependencies
8. **Component Defined Inside Render** - Unstable component definition
9. **Mutating Hook Values** - Mutating reactive values from hooks

## 🛠️ Setup

```bash
yarn install
yarn dev
```

Open your browser and navigate to the local development server (usually `http://localhost:5173`).

## 📋 ESLint Configuration

The project uses the latest ESLint configuration with `react-hooks` rules to detect Rules of React violations:

```javascript
// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "react-hooks/exhaustive-deps": "error",
    },
  },
]);
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

- ❌ **Conditional hook calls** (react-hooks/rules-of-hooks)
  ```
  React Hook "useState" is called conditionally
  ```
- ❌ **Hooks in loops** (react-hooks/rules-of-hooks)
  ```
  React Hook "useState" may be executed more than once
  ```
- ❌ **Hooks in nested functions** (react-hooks/rules-of-hooks)
  ```
  React Hook "useState" cannot be called inside a callback
  ```
- ❌ **Component defined inside render** (react-hooks/rules-of-hooks)
  ```
  React Hook "useState" cannot be called in a function component body
  ```
- ❌ **Missing effect dependencies** (react-hooks/exhaustive-deps)
  ```
  React Hook useEffect has a missing dependency: 'value'
  ```

**Note:** Some violations like props/state mutations may require additional ESLint plugins to detect, but React Compiler will handle them at compile time.

## 🎯 React Compiler Benefits

React Compiler automatically:
- ✅ Memoizes components (no need for `React.memo`)
- ✅ Memoizes values (no need for `useMemo`)
- ✅ Memoizes functions (no need for `useCallback`)
- ✅ Optimizes re-rendering without manual intervention
- ✅ Detects Rules of React violations at compile time

**Note:** This may impact Vite dev & build performance, but the runtime performance will be significantly better.

## 🔧 Configuration

### Tech Stack
- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.3.1
- **Tailwind CSS** 4.2.1
- **babel-plugin-react-compiler** 1.0.0

### Vite Config (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
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
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "react-hooks/exhaustive-deps": "error",
    },
  },
]);
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
❌ Issue 1: Conditional hook calls (react-hooks/rules-of-hooks)
❌ Issue 2: Mutating props directly
❌ Issue 3: Side effects during render (use useEffect instead)
❌ Issue 4: Mutating state directly
❌ Issue 5: Hooks inside loops (react-hooks/rules-of-hooks)
❌ Issue 6: Hooks inside nested functions (react-hooks/rules-of-hooks)
❌ Issue 7: Missing useEffect dependencies (react-hooks/exhaustive-deps)
❌ Issue 8: Component defined inside render (react-hooks/rules-of-hooks)
❌ Issue 9: Mutating reactive values from hooks
```

**Note:** The ESLint errors in `BadExamples.tsx` are **intentional** to demonstrate what React Compiler detects and prevents!

## 📚 Learn More

- [React Compiler Documentation](https://react.dev/learn/react-compiler)
- [Rules of React](https://react.dev/reference/rules)
- [React DevTools](https://react.dev/learn/react-developer-tools)
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

2. **ESLint is your friend** - The `react-hooks` rules will catch code that violates Rules of React and may prevent React Compiler from optimizing properly.

3. **Write clean React code** - Follow the Rules of React, and React Compiler will automatically optimize your components without manual `memo`, `useMemo`, or `useCallback`.

4. **The errors in `BadExamples.tsx` are intentional** - they serve as educational examples of what NOT to do.

## 🎓 Learning Path

1. Start by exploring `GoodExamples.tsx` to see properly written React code
2. Click "Bad Examples" tab to see common mistakes
3. Open `BadExamples.tsx` in your IDE to see ESLint errors
4. Run `yarn lint` to see all violations in the terminal
5. Compare the two approaches to understand React Compiler requirements

## 📖 Detailed Issue Explanations

### Issue 1: Conditional Hook Calls
**Rule violated:** `react-hooks/rules-of-hooks`

Hooks must be called in the exact same order on every render. Calling hooks conditionally breaks this rule.

```typescript
// ❌ BAD
if (showCount) {
  const [count] = useState(0); // Hook called conditionally!
}

// ✅ GOOD
const [count] = useState(0);
if (showCount) {
  return <div>Count: {count}</div>;
}
```

### Issue 2: Props Mutation
**Rule violated:** Immutability

Props are read-only. Mutating them directly violates React's immutability principle.

```typescript
// ❌ BAD
data.value = 100; // Never mutate props!

// ✅ GOOD
const newData = { ...data, value: 100 };
```

### Issue 3: Side Effects During Render
**Rule violated:** Component purity

Components should be pure functions. Side effects should be in `useEffect`.

```typescript
// ❌ BAD
externalStore.data["key"] = value; // Side effect during render!

// ✅ GOOD
useEffect(() => {
  externalStore.data["key"] = value;
}, [value]);
```

### Issue 4: Direct State Mutation
**Rule violated:** State immutability

State must be treated as immutable. Always create a new object/array when updating.

```typescript
// ❌ BAD
user.age = 26;
setUser(user); // Won't trigger re-render properly

// ✅ GOOD
setUser({ ...user, age: 26 });
```

### Issue 5: Hook Inside a Loop
**Rule violated:** `react-hooks/rules-of-hooks`

Hooks cannot be called inside loops because the number of hooks must be consistent.

```typescript
// ❌ BAD
for (let i = 0; i < items.length; i++) {
  useState(items[i]); // Hook in a loop!
}

// ✅ GOOD
const [states, setStates] = useState(items);
```

### Issue 6: Hook Inside Nested Function
**Rule violated:** `react-hooks/rules-of-hooks`

Hooks must be called at the top level of a component, not inside nested functions.

```typescript
// ❌ BAD
function createState() {
  const [count] = useState(0); // Hook in nested function!
  return count;
}

// ✅ GOOD
const [count] = useState(0);
```

### Issue 7: Missing Effect Dependencies
**Rule violated:** `react-hooks/exhaustive-deps`

All variables used inside `useEffect` must be declared in the dependency array.

```typescript
// ❌ BAD
useEffect(() => {
  console.log(value);
}, []); // Missing 'value' in dependencies!

// ✅ GOOD
useEffect(() => {
  console.log(value);
}, [value]);
```

### Issue 8: Component Defined Inside Render
**Rule violated:** `react-hooks/rules-of-hooks`

Components should be defined outside of render to avoid recreating them on every render.

```typescript
// ❌ BAD
const MyComponent = () => {
  const InnerComponent = () => { // Defined inside!
    return <div>Inner</div>;
  };
  return <InnerComponent />;
};

// ✅ GOOD
const InnerComponent = () => {
  return <div>Inner</div>;
};

const MyComponent = () => {
  return <InnerComponent />;
};
```

### Issue 9: Mutating Hook Values
**Rule violated:** Reactive value immutability

Values returned from hooks (like state) should be treated as immutable.

```typescript
// ❌ BAD
const [config] = useState({ enabled: true });
config.enabled = false; // Mutating reactive value!

// ✅ GOOD
const [config, setConfig] = useState({ enabled: true });
setConfig({ enabled: false });
```

## 🔍 ESLint Rules Reference

The project detects these violations using:

- **`react-hooks/rules-of-hooks`** - Detects Issues 1, 5, 6, 8
- **`react-hooks/exhaustive-deps`** - Detects Issue 7
- **Component purity and immutability** - Issues 2, 3, 4, 9 (detected at compile time by React Compiler)


