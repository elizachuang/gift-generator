# Project instructions

## Product purpose

This web helps people who need to give a gift to know what gift they are going to give.

## MVP boundary

Build only the features listed in the MVP brief (`docs/MVP_PLAN.md`).
Do not add authentication, payments, external APIs, or a database unless I explicitly approve it.

## Code standards

- Use clear, beginner-friendly file names and comments only where useful.
- Keep components small and readable.
- Make the site work on mobile and desktop.
- Add accessible labels, keyboard-friendly controls, and useful empty/error states.
- Never put passwords, API keys, or secret tokens in source code.
- Put secrets in environment variables and explain how to configure them.
- Run formatting, linting, and tests before saying a task is finished.

## Working method

- Before changing code, explain the plan in plain English.
- Make one focused change at a time.
- Tell me which files changed and why.
- Ask for confirmation before adding a paid service or deleting data.

## Commands

- `npm install`: install dependencies (run once, and after pulling changes to `package.json`)
- `npm run dev`: start the local dev server
- `npm run format`: auto-format all files with Prettier
- `npm run lint`: lint with oxlint
- `npm test`: run tests once with Vitest
- `npm run check`: format check + lint + tests (run this before saying a task is finished)
- `npm run build`: production build into `dist/`
