# gift-generator

MVP of gift generator: answer a few questions and get gift ideas that fit your budget.
See `docs/MVP_PLAN.md` for the plan.

## Run it locally

1. Install [Node.js](https://nodejs.org/) (version 20.19 or newer).
2. `npm install`
3. `npm run dev`, then open the URL it prints (usually http://localhost:5173).

### On a Chromebook

1. Turn on Linux: **Settings → About ChromeOS → Developers → Linux development environment → Turn on**.
   If the option is missing, your Chromebook is managed; use GitHub Codespaces instead
   (green **Code** button → **Codespaces** on the repo page).
2. In the Linux **Terminal**, install Git, the GitHub CLI and Node.js:

   ```bash
   sudo apt update && sudo apt install -y git curl gh
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
   # close and reopen the Terminal, then:
   nvm install --lts
   ```

3. Log in to GitHub (the repo is private, so plain `git clone` asks for a login):

   ```bash
   gh auth login   # GitHub.com → HTTPS → Yes → Login with a web browser
   ```

4. Download and run the project:

   ```bash
   gh repo clone elizachuang/gift-generator
   cd gift-generator
   npm install
   npm run dev
   ```

   Open http://localhost:5173 in Chrome. Press **Ctrl+C** in the Terminal to stop.

## Before committing

Run `npm run check`. It checks formatting, runs the linter and runs the tests.
If formatting fails, run `npm run format` to fix it.

## Deploying

The site is hosted on [Netlify](https://www.netlify.com/). Build settings live in `netlify.toml`:
Netlify runs `npm run check && npm run build` and publishes the `dist` folder.
Every merge to `main` updates the live site. If the checks fail, the old version stays online.
No environment variables or secrets are needed.
