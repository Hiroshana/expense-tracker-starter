# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for a Claude Code course: a React expense/finance tracker that **intentionally** ships with a bug, poor UI, and messy code, to be fixed incrementally. Expect to refactor rather than preserve existing structure.

## Commands

- `npm install` — install dependencies (required before first run)
- `npm run dev` — Vite dev server at http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build
- `npm run lint` — ESLint (flat config in `eslint.config.js`)

There is no test framework configured.

## Architecture

- React 19 + Vite 7, plain JavaScript (JSX), ES modules. No router, state library, or backend.
- `src/main.jsx` mounts `<App />` in `StrictMode`; global styles in `src/index.css`, component styles in `src/App.css`.
- `src/App.jsx` owns the `transactions` array and the `categories` list and composes three children in `src/components/`:
  - `Summary` — derives income/expense/balance from `transactions`.
  - `TransactionForm` — owns its own input state; calls `onAdd(transaction)` with a fully built transaction.
  - `TransactionList` — owns the type/category filter state and renders the table.
  - Transactions are held in local `useState`, seeded with hardcoded sample data; nothing is persisted (state resets on reload).
  - Each transaction: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`.
  - `amount` is stored as a **number**; the form input yields a string, so it is converted with `Number()` when a transaction is created.
- ESLint enforces react-hooks and react-refresh rules; `no-unused-vars` ignores identifiers starting with an uppercase letter or `_`.
