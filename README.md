# React Compiler Demo

Projekt demonstracyjny pokazujący, jak **React Compiler** automatycznie optymalizuje komponenty React bez potrzeby ręcznych optymalizacji takich jak `memo`, `useMemo` i `useCallback`.

## 🚀 Funkcje

### ✅ Dobre Przykłady (`GoodExamples.tsx`)
- Komponenty **bez** `React.memo()`
- Funkcje **bez** `useCallback()`
- Obliczenia **bez** `useMemo()`
- Wszystko automatycznie optymalizowane przez React Compiler!

### ❌ Złe Przykłady (`BadExamples.tsx`)
Przykłady kodu **naruszającego Reguły React** i wywołującego błędy ESLint:

1. **Mutacja Obiektów** - Modyfikowanie obiektów po utworzeniu
2. **Mutacja Tablic** - Bezpośrednie modyfikowanie tablic
3. **Warunkowe Hooki** - Wywoływanie hooków warunkowo
4. **Mutacja Props** - Modyfikowanie właściwości komponentu
5. **Efekty Uboczne Podczas Renderowania** - Efekty uboczne poza useEffect
6. **Nieaktualne Dane State** - Używanie przestarzałych wartości stanu
7. **Bezpośrednia Mutacja State** - Bezpośrednie modyfikowanie stanu
8. **Niepotrzebny Stan Pochodny** - Redundantne derywowanie stanu

## 🛠️ Instalacja

```bash
yarn install
yarn dev
```

Otwórz przeglądarkę i przejdź do lokalnego serwera deweloperskiego (zwykle `http://localhost:5173`).

## 📋 Konfiguracja ESLint

Projekt używa najnowszej konfiguracji ESLint z reguły `react-hooks` do wykrywania naruszeń Reguł React:

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

## 🔍 Sprawdzanie Błędów

Uruchom ESLint, aby zobaczyć wszystkie naruszenia Reguł React:

```bash
yarn lint
```

Zbuduj projekt, aby zobaczyć optymalizacje React Compiler:

```bash
yarn build
```

### Oczekiwane błędy ESLint w `BadExamples.tsx`:

- ❌ **Warunkowe wywołania hooków** (react-hooks/rules-of-hooks)
  ```
  Hooki muszą być zawsze wywoływane w tej samej kolejności
  ```
- ❌ **Mutowanie props** (react-hooks)
  ```
  Mutowanie właściwości komponentu lub argumentów hooków nie jest dozwolone
  ```
- ❌ **Efekty uboczne podczas renderowania** (react-hooks)
  ```
  Zapisywanie do zmiennej zdefiniowanej poza komponentem nie jest dozwolone
  ```
- ❌ **Mutowanie stanu** (react-hooks)
  ```
  Mutowanie wartości zwróconej z 'useState()' nie jest dozwolone
  ```
- ❌ **Brakujące zależności** (react-hooks/exhaustive-deps)
  ```
  Efekt używa zmiennych, które nie są wymienione w tablicy zależności
  ```

## 🎯 Korzyści z React Compiler

React Compiler automatycznie:
- ✅ Memoizuje komponenty (nie potrzeba `React.memo`)
- ✅ Memoizuje wartości (nie potrzeba `useMemo`)
- ✅ Memoizuje funkcje (nie potrzeba `useCallback`)
- ✅ Optymalizuje ponowne renderowanie bez ręcznej interwencji
- ✅ Wykrywa naruszenia Reguł React poprzez ESLint

**Uwaga:** Może to wpłynąć na wydajność deweloperską i budowania w Vite, ale wydajność w czasie rzeczywistym będzie znacznie lepsza.

## 🔧 Konfiguracja

### Stos Technologiczny
- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.3.1
- **Tailwind CSS** 4.2.1
- **babel-plugin-react-compiler** 1.0.0

### Konfiguracja Vite (`vite.config.ts`)
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

### Konfiguracja ESLint (`eslint.config.js`)
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

## 🎨 Nawigacja w UI

Użyj **nawigacji zakładek** na górze, aby przełączać się między:
- **✅ Dobre Przykłady** - Poprawnie zoptymalizowany kod z React Compiler
- **❌ Złe Przykłady** - Naruszenia Reguł React z błędami ESLint

Nawigacja jest **przyklejona** na górze, dzięki czemu pozostaje dostępna podczas przewijania treści.

## 🐛 Przeglądanie Błędów ESLint

Otwórz `src/BadExamples.tsx` w swoim IDE, aby zobaczyć:
- Czerwone podkreślenia problematycznego kodu
- Najedź na błędy, aby zobaczyć szczegółowe komunikaty
- ESLint pokaże dokładnie, które Reguły React zostały naruszone

Przykładowe błędy, które zobaczysz:
```
❌ Linia 43: Hooki muszą być zawsze wywoływane w tej samej kolejności
❌ Linia 53: Mutowanie właściwości komponentu nie jest dozwolone
❌ Linia 63: Zapisywanie do zmiennych zewnętrznych podczas renderowania nie jest dozwolone
❌ Linia 100: Mutowanie stanu zwróconego z useState() nie jest dozwolone
```

**Uwaga:** Błędy ESLint w `BadExamples.tsx` są **celowe**, aby zademonstrować, co React Compiler wykrywa i zapobiega!

## 📚 Dowiedz się Więcej

- [Dokumentacja React Compiler](https://react.dev/learn/react-compiler)
- [Reguły React](https://react.dev/reference/rules)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [babel-plugin-react-compiler](https://www.npmjs.com/package/babel-plugin-react-compiler)

## 📝 Struktura Projektu

```
src/
├── App.tsx              # Główna aplikacja z nawigacją zakładek
├── GoodExamples.tsx     # ✅ Dobre przykłady (zoptymalizowane przez React Compiler)
├── BadExamples.tsx      # ❌ Złe przykłady (naruszenia Reguł React)
├── main.tsx             # Punkt wejścia
└── index.css            # Globalne style
```

## 🚨 Ważne Uwagi

1. **React Compiler działa transparentnie** - nie zobaczysz specjalnych oznaczeń w React DevTools. Optymalizacje zachodzą w czasie kompilacji.

2. **ESLint jest Twoim przyjacielem** - Reguły `react-hooks` wychwytują kod naruszający Reguły React i zapobiegają optymalizacji przez React Compiler.

3. **Pisz czysty kod React** - Przestrzegaj Reguł React, a React Compiler automatycznie zoptymalizuje Twoje komponenty bez ręcznego `memo`, `useMemo` czy `useCallback`.

4. **Błędy w `BadExamples.tsx` są celowe** - służą jako przykłady edukacyjne tego, czego NIE robić.

## 🎓 Ścieżka Nauki

1. Zacznij od eksploracji `GoodExamples.tsx`, aby zobaczyć poprawnie napisany kod React
2. Kliknij zakładkę "Bad Examples", aby zobaczyć typowe błędy
3. Otwórz `BadExamples.tsx` w swoim IDE, aby zobaczyć błędy ESLint
4. Uruchom `yarn lint`, aby zobaczyć wszystkie naruszenia w terminalu
5. Porównaj oba podejścia, aby zrozumieć wymagania React Compiler

