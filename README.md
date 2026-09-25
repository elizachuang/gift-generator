# Gift Generator

[![check](https://github.com/elizachuang/gift-generator/actions/workflows/check.yml/badge.svg)](https://github.com/elizachuang/gift-generator/actions/workflows/check.yml)

Stuck on what to give for a birthday, baby shower, colleague farewell, housewarming or Christmas?
Answer 3 quick questions (occasion, who it's for, budget) and get thoughtful gift ideas that fit your budget,
each with a note on **why it feels special** and a link to find it in shops.

<img src="docs/screenshot.png" alt="Results screen on a phone: '6 gift ideas for you' with a highlighted Best match card" width="320">

- Built with React and Vite; the gift ideas live in [`src/data/gifts.json`](src/data/gifts.json).
- No accounts, no tracking, no database. Prices are in euros, for the Netherlands, Belgium and Germany.
- Plan and decisions: [`docs/MVP_PLAN.md`](docs/MVP_PLAN.md).

## Run it locally

1. Install [Node.js](https://nodejs.org/) (version 20.19 or newer).
2. Download the code: `git clone https://github.com/elizachuang/gift-generator.git` and `cd gift-generator`
3. `npm install`
4. `npm run dev`, then open the URL it prints (usually http://localhost:5173).

### On a Chromebook

1. Turn on Linux: **Settings → About ChromeOS → Developers → Linux development environment → Turn on**.
   If the option is missing, your Chromebook is managed; use GitHub Codespaces instead
   (green **Code** button → **Codespaces** on the repo page).
2. In the Linux **Terminal**, install Git and Node.js:

   ```bash
   sudo apt update && sudo apt install -y git curl
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
   # close and reopen the Terminal, then:
   nvm install --lts
   ```

3. Download and run the project (no login needed, the repo is public):

   ```bash
   git clone https://github.com/elizachuang/gift-generator.git
   cd gift-generator
   npm install
   npm run dev
   ```

   Open http://localhost:5173 in Chrome. Press **Ctrl+C** in the Terminal to stop.

4. Only if you want to push changes: install the GitHub CLI and log in once.

   ```bash
   sudo apt install -y gh
   gh auth login   # GitHub.com → HTTPS → Yes → Login with a web browser
   ```

## Before committing

Run `npm run check`. It checks formatting, runs the linter and runs the tests.
If formatting fails, run `npm run format` to fix it.
The same check runs automatically on every pull request (GitHub Actions, `.github/workflows/check.yml`).

## Deploying

The site is hosted on [Netlify](https://www.netlify.com/). Build settings live in `netlify.toml`:
Netlify runs `npm run check && npm run build` and publishes the `dist` folder.
Every merge to `main` updates the live site. If the checks fail, the old version stays online.
No environment variables or secrets are needed.

## Copyright

© Eliza Huang. All rights reserved. The code is public to read, but no licence is granted yet,
so please ask before reusing the code, the gift list or the illustrations.
