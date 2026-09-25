# Gift Generator: MVP Plan

## Context

The repo only has `README.md` and `CLAUDE.md`, and there's no code yet. `CLAUDE.md` forbids auth, payments, external APIs and a database without approval. It also requires lint, format and tests before a task counts as done, and asks for mobile, desktop and accessibility support. This plan turns the MVP brief into the smallest product that can be built and tested within those rules.

---

## 1. Core user problem (plain English)

Someone has to give a gift (birthday, baby shower, colleague's farewell, housewarming, Christmas) and feels stuck because:

- they don't know the person's tastes well,
- their budget is limited, and
- they don't want the gift to look cheap or careless. They want the person to feel special.

**The job to be done:** "Give me a few good, fitting ideas in my price range, tell me why each one feels thoughtful, and show me where to buy it, all in under 2 minutes."

How I got here: the brief names three pains (unknown tastes, tight budget, fear of looking cheap) and one success test ("find at least 1 product they want to buy"). Everything below is sized to pass that test.

## 2. Smallest user flow

1. **Landing:** one sentence of value plus a "Find a gift" button.
2. **Answer 3 questions** on one page:
   - Occasion (5 fixed options from the brief)
   - Who it's for (close friend or family / coworker / acquaintance / baby or new parent)
   - Budget (euro price bands: under €20, €20–50, €50–100, €100+)
   - _(Optional 4th question)_ One interest ("I don't know" is allowed). This goes straight at "I don't know what they like".
3. **Results:** 3–6 gift cards. Each card shows name, price, **"why it feels special"**, and a **"View / buy" link** that opens the retailer in a new tab.
4. **Adjust:** "Change answers" goes back to the form with the answers kept. If nothing matches, an empty state offers to widen the budget or drop the interest.

**Success = the user clicks at least one "buy" link.**

## 3. Recommended tech stack

| Choice                                                     | Why                                                                                                                                                        |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vite + React (JavaScript, not TypeScript)**              | Small components match `CLAUDE.md` ("keep components small"), it has a huge beginner community, and Vite starts instantly with no config.                  |
| **Plain CSS (one file per component or one global file)**  | Nothing new to learn. Mobile-first media queries cover mobile and desktop.                                                                                 |
| **Gift data in a local JSON file** (`src/data/gifts.json`) | No database and no API, which the MVP boundary requires. You edit it by hand.                                                                              |
| **Vitest + React Testing Library**                         | Runs the tests `CLAUDE.md` requires, and works with Vite without extra config.                                                                             |
| **oxlint + Prettier**                                      | Covers the lint and format rules in `CLAUDE.md`. oxlint is the default linter in the current Vite React template (it replaced ESLint) and needs no config. |
| **Free static hosting (Netlify, Vercel or GitHub Pages)**  | No server, no cost, no secrets needed.                                                                                                                     |

**Decided: React + Vite.** Alternatives considered:

- **Plain HTML + vanilla JS:** simplest to start and no build step. But it's harder to split into components and harder to test, and it gets messy once results and filters grow. Pick it only if you want to learn the basics first.
- **Next.js:** more powerful (server, routing), but it's more than this MVP needs. You'd be learning concepts you won't use yet.

No environment variables or secrets are needed, because nothing calls a paid or private service.

## 4. Pages and components

**Pages** (two screens, one route each, or one page with two states; routing isn't needed yet):

- `HomePage`: intro plus the question form
- `ResultsPage` (or a results section): the matching gifts

**Components:**

- `Header`: site name
- `GiftQuizForm`: holds the questions and the submit button
  - `ChoiceGroup`: one reusable labelled radio group, used for occasion, recipient, budget and interest (keyboard-accessible because it's built on native radios)
- `GiftList`: renders the cards, or an empty state
- `GiftCard`: name, price, "why it feels special", tags, buy link
- `EmptyState`: "No exact match" plus "Widen budget" and "Ignore interest" buttons
- `ErrorMessage`: a form validation message (e.g. "Please pick a budget")

**Logic (no UI):**

- `src/logic/findGifts.js`: a pure function `(answers, gifts) → ranked gifts`. This is the core of the product and the easiest part to unit test.

## 5. Data model (needed: the product is the list of gifts)

The data is a static JSON array. No database.

```
Gift {
  id: string                // "scented-candle-set"
  name: string
  description: string       // 1 line
  whySpecial: string        // e.g. "Easy to personalize with a handwritten note"
  price: number             // approximate, in euros (EUR is the only currency for the MVP, so no currency field)
  occasions: string[]       // ["birthday","housewarming",...]
  recipients: string[]      // ["close","coworker","acquaintance","new-parent"]
  interests: string[]       // ["cooking","reading","any"]
  searchQuery: string       // e.g. "personalised leather keychain"; the buy link is built from this
}
```

Buy link: `https://www.google.com/search?tbm=shop&q=<searchQuery, URL-encoded>`, built by a tiny helper `src/logic/buyLink.js`. This is a plain link, not an API call. Google shows local shops and euro prices based on where the visitor is (NL, BE or DE), so one link works in all three countries.

Quiz answers are kept only in the page's state (in memory). Nothing is saved.

Matching rule (simple and explainable): a gift must match the occasion and the budget. Recipient and interest add to its score. Results are sorted by score, and gifts near the top of the budget come first, which goes at "don't want it to look cheap".

## 6. Not building yet

- Accounts, login or saved lists
- Payments or checkout (we only link out)
- Live product/price APIs, scraping, or affiliate integrations
- A database or admin panel (edit the JSON by hand)
- AI/LLM-generated suggestions
- Wishlists, sharing links, or reminders or calendar
- Multi-currency or multi-language
- Product images hosted by us (text-first, with image URLs optional later)
- Analytics beyond what the host gives for free

## 7. Build plan (small, testable milestones)

| #   | Milestone                                                                                   | Done when                                                                                                                             |
| --- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| M0  | Project setup: Vite + React, oxlint, Prettier, Vitest; add the real commands to `CLAUDE.md` | `npm run lint`, `npm run format:check` and `npm test` all pass on an empty app                                                        |
| M1  | Gift data: 30–40 hand-picked gifts in `gifts.json` covering every occasion × budget band    | A test checks that every gift has the required fields and a non-empty search query, and that each occasion × budget pair has ≥ 1 gift |
| M2  | Matching logic in `findGifts.js`                                                            | Unit tests cover exact match, no match, "I don't know" interest, and sort order                                                       |
| M3  | Question form (`GiftQuizForm`, `ChoiceGroup`)                                               | You can fill it by keyboard only, every input has a label, and submitting without an answer shows an error                            |
| M4  | Results (`GiftList`, `GiftCard`, `EmptyState`)                                              | A component test checks that the right cards render; the empty state shows and its buttons widen the search                           |
| M5  | Responsive and accessibility pass                                                           | Checked at 375px and 1280px wide, visible focus rings, Lighthouse accessibility ≥ 90                                                  |
| M6  | Deploy to free static hosting                                                               | A public URL works on a phone                                                                                                         |
| M7  | 5 user tests (see section 8)                                                                | Each tester finds ≥ 1 gift they'd buy, or we learn why not                                                                            |

## 8. Risks, assumptions, questions to validate

**Risks**

- **Stale data:** prices change. _Mitigation:_ show "approx." on prices. Search links (not exact product pages) don't break when a product sells out.
- **Quality of the curated list is the product.** With too few gifts, results feel generic. A weak list means the success test fails no matter how good the code is.
- **"Feels special" is subjective.** 3 questions may not capture enough to make a pick feel personal.
- **Region:** the approximate prices in our data are a single euro figure; real prices differ between NL, BE and DE shops.

**Assumptions** (unverified; for you to confirm)

- Users are fine with 3–4 quick questions rather than typing a free-text description.
- Euro (EUR) only, with one main retailer region, is enough for the first test. Prices display as "≈ €35" (format with `Intl.NumberFormat`, currency EUR).
- Linking out to buy is acceptable; users don't expect to buy on our site.
- Hand-curated ideas beat "random popular products" for the "feels special" goal.

**Questions to ask real users**

1. Last time you were stuck on a gift, what did you do (Google, Amazon, ask a friend)? What was frustrating?
2. Which matters more: staying under budget, or not looking cheap? Where's the line for each occasion?
3. How much do you usually know about the recipient? Would one interest question help, or is it a guess anyway?
4. Would a short "why this feels special" line change your choice?
5. Do you want 3 strong ideas or 20 options to browse?
6. Would you rather buy online, or get an idea you then find in a store?
7. Which occasion is most painful for you? (Worth weighting the gift list toward it.)

**Decisions made**

- Stack: React + Vite
- Currency: EUR
- Market: Netherlands, Belgium, Germany
- Buy links: Google Shopping search
- Site language: English

**Risk from the link choice:** a Google Shopping search can show unrelated or off-budget items. _Mitigation:_ write specific search queries, and in the user tests (M7) check that a tester can reach a buyable product within 1–2 clicks. If they can't, switch to bol.com/amazon.de links.

## Verification

- At each milestone, `npm run lint`, `npm run format:check` and `npm test` pass.
- Manual check: `npm run dev`, complete the flow on desktop and in a mobile viewport using only the keyboard, and confirm at least 1 relevant gift with a working buy link for each occasion.
- Final check: the deployed URL opens on a real phone.
