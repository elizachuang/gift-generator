# User test script (M7)

**Goal:** find out whether people can find **at least 1 gift they would actually buy**. If they can't, find out why.
This is the success test from `docs/MVP_PLAN.md`.

**You'll learn:**

- Where people hesitate or get confused.
- Whether they trust the ideas (do "Why it feels special", "Best match" and the tags help?).
- Whether "Find in shops" (Google Shopping) gets them to something buyable within 1–2 clicks, inside their budget.

---

## Before the sessions

- **Who:** 5 people. Five is enough to find most usability problems ([Nielsen Norman Group](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/)).
  - Mix them: different ages, and at least 2 who aren't close friends (friends tend to be too kind).
  - If you can, include people from the Netherlands, Belgium and Germany.
- **Device:** their own phone, on the live site. Most real use will be on phones.
- **Time:** about 20 minutes each.
- **Privacy:** only take written notes, unless they say yes to recording.
  - Don't write down full names; use "Tester 1", "Tester 2" and so on.
  - Under the GDPR, recordings of someone's face or voice are personal data, so ask first and delete them after analysis.
- **Bring:** this script and 5 copies of the note sheet at the end.

## Your rules during the session

1. **Don't help and don't explain the site.** If they ask "What should I do?", answer "What would you do if I weren't here?"
2. **Don't lead.** Ask "What do you think this does?", not "Do you see the Best match badge?"
3. **Ask them to think aloud:** "Please say what you're looking at and thinking as you go."
   ([Thinking aloud: the #1 usability tool](https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/))
4. **Stay neutral.** Say "Thanks, that's helpful" whether they succeed or struggle.
5. **Write down what they do, not only what they say.** People often say "easy!" after struggling.

## 1. Intro (read aloud, about 2 minutes)

> "Thanks for helping. I'm testing a website, not you. You can't do anything wrong, and if something is confusing,
> that's exactly what I need to find out. I didn't design every detail, so you won't hurt my feelings.
> Please think aloud as you go. I won't help during the tasks, but I'll answer questions at the end.
> Is it OK if I take notes?"

## 2. Warm-up questions (about 3 minutes)

1. Think of the last time you were stuck on what gift to give. What was it for, and what did you do?
2. What was the most frustrating part?
3. Which occasion is hardest for you: birthday, baby shower, colleague farewell, housewarming or Christmas?

## 3. Tasks (about 10 minutes)

Give one task at a time. Read it out, or show it on a card. **Don't mention any button names.**

**Task 1: real gift.**

> "Think of a real person you'll need a gift for soon. Use this site to find a gift idea for them."

Stop when they say they've found one, or give up (maximum 4 minutes).

**Task 2: colleague farewell.**

> "A colleague is leaving next week. Your team has about €60 to spend together. Find something suitable."

**Task 3: change your mind.**

> "Now imagine the team only has €30. Find ideas for that instead."

(This checks whether they find "Change answers".)

**Task 4: buy it.**

> "Pick the idea you like most from any task, and show me where you'd buy it."

Count the clicks from the gift card to a product they could actually buy. Note whether it was within their budget.

## 4. Debrief questions (about 5 minutes)

1. **Overall, how easy or difficult was it to find a gift idea?**
   Scale: 1 = very difficult, 7 = very easy. This is the Single Ease Question ([MeasuringU](https://measuringu.com/seq10/)).
2. Of the ideas you saw, is there one you would really buy? Which one, and why?
3. Did any idea feel wrong for the person? Which, and why?
4. Did you read the yellow "Why it feels special" boxes? Did they change your choice?
5. Which matters more to you, staying under budget or not looking cheap? Where's the line?
6. Would you want fewer, stronger ideas or more ideas to browse?
7. What would you change first?
8. Would you use this again, or recommend it? Why or why not?

## 5. Note sheet (one per tester)

| Item                                                     | Notes |
| -------------------------------------------------------- | ----- |
| Tester # / age range / country / phone type              |       |
| Warm-up: last gift problem                               |       |
| Task 1: found a gift they'd buy? (yes / no / partly)     |       |
| Task 1: time taken, where they hesitated                 |       |
| Task 2: found something? Did the results fit?            |       |
| Task 3: found "Change answers"? How?                     |       |
| Task 4: clicks to a buyable product; within budget?      |       |
| Scrolled past the welcome section or used "Find a gift"? |       |
| Skipped or used the interest question?                   |       |
| Noticed "Best match" / tags / "Why it feels special"?    |       |
| Ease score (1–7)                                         |       |
| Best quote                                               |       |
| Biggest problem                                          |       |

## 6. After all 5 sessions

1. For each problem, count how many testers had it (e.g. "3 of 5 didn't notice the tags").
2. Mark each problem as **blocking** (couldn't finish a task), **slowing** (finished, but struggled) or **cosmetic**.
3. Paste your note sheets to Claude with this prompt:

> "Here are notes from 5 user tests of the gift generator: [paste]. Group them into themes, count how many
> testers hit each problem, rank them by impact, and propose one small milestone that fixes the top issues.
> Don't build anything yet."

**Success bar:** at least 4 of 5 testers find a gift they'd buy (Task 1), with an average ease score of 5 or more.
If you fall short, the notes will tell you whether the problem is the **gift list** (ideas don't fit), the **flow**
(people get lost), or the **shop link** (can't find it to buy).
