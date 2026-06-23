# Design Doc — Working title: **Alongside**
*(placeholder name — the idea is "connection happens shoulder-to-shoulder, alongside someone, doing a thing")*

**Status:** Draft v0.1 — living document
**Author:** Jason
**Date:** 2026-06-22

---

## 0. Origin / Why this exists

This started from the commentary in *Trolls* — the Bergens who only let themselves be happy one day a year, by **consuming** a troll. The insight that hit home: modern life trains us to treat happiness (and connection) as something you *acquire from outside yourself*, rationed and deferred, instead of something you *generate*.

Dating apps are the purest example of that model. Connection is rationed (limited likes), gamified into a grind, and the business is structured so the "festival day" never quite arrives — because a satisfied user is a churned user.

## 0a. Definition of success (READ FIRST — recontextualizes the whole business section)

**This is NOT built to profit-MAXIMIZE. It's built so the author can be a USER of it — and to be sustainable (cover infra + a fair modest margin).** A fair flat fee (~$8) that covers costs, pays the builder a little for the 6pm–1am hours, and leaves a small margin is GREAT — that's a healthy business, not a compromise.

The corrupting force was never *profit* — it's profit *maximization.* Restaurant vs casino: both make money; only the casino is engineered to trap and extract. The difference is whether the business is allowed to say **"this is enough."** An app allowed to make *enough and stop* is free to be honest; an app that must grow profit forever is *forced* into dark patterns. **Refusing the maximization treadmill is what protects the North Star** — and a literal zero-margin project is actually worse (fragile, quietly resentful, subsidizing strangers with the builder's time). Sustainability includes paying the builder.

Consequences: scale is irrelevant (don't need millions, need *my people in my city*); cold-start reframes to "seed a real local community / be user #1"; competition with incumbents is moot. **"Break even" must also count the AUTHOR'S energy/time, not just infra $** — build it small, low-maintenance, sustainable for one person who works 6pm–1am, so it never becomes another shift.

**The North Star for every decision in this product:**
> Does this feature make connection something you *consume*, or something you *generate together*?

If a feature makes the app feel like eating a troll, cut it. If it makes two people *sing together*, build it.

---

## 1. The Problem

**Current dating apps turn connection into an interview.**

- Two strangers are dropped into an empty text box and asked to manufacture chemistry on demand, from nothing.
- That's not how humans bond. We bond **shoulder-to-shoulder doing a thing**, not face-to-face interrogating each other. Chemistry is a *byproduct* of shared activity, not the activity itself.
- The result: conversations go stale fast. "What do you do? Hobbies? Haha nice." Dead thread. Both people blame themselves or each other, when the real culprit is the format.
- The business model quietly *depends* on this failure. Friction = engagement = subscription revenue.

**Symptoms users feel:**
- Burnout / "the ick" with the whole category
- Conversations that die in 3 messages
- Feeling like a product being shopped, not a person being met
- No idea if there's a real spark until an awkward, high-stakes first date

---

## 2. Positioning (explicit constraints)

This is **NOT a hookup app.** Two acceptable modes — pick one to launch, possibly toggle later:

- **Find a Friend** — platonic connection, new-in-town, hobby buddies, "I want people to do things with."
- **Intentional Dating** — for people seeking a real relationship, not a swipe-dopamine loop.

Both share the same engine. The difference is framing, prompts, and intent-matching. The brand and tone must signal *intentional, warm, low-pressure* — the opposite of the slot-machine aesthetic of existing apps.

---

## 3. The Thesis / Core Mechanic

**Replace the interview with a shared activity.** You don't talk *about* yourselves to a stranger — you *do something* with them, and who you are leaks out naturally in how you play, move, and react.

Three concentric pillars (build inner-out):

| Pillar | What it is | Risk | Build order |
|---|---|---|---|
| **1. Activity-as-conversation** | Jackbox-style games, co-op prompts, light challenges *inside the app*. Kills the interview. | Low — fully in our control | **FIRST** |
| **2. Shared real-world activity** | Strava-style "go for a run with me," hobby matching, async shared challenges | Medium — depends on integrations | Second |
| **3. Meeting "in the wild"** | Discover others nearby who are open to meeting in person, in real time | **HIGH — safety-critical** | Last, and only if 1 proves out |

---

## 4. The Seam to build first — "The First Five Minutes"

The heart of the entire product is what happens **the moment two people match**. Today: empty text box. Ours: the app says *"don't interview each other — do this instead,"* and drops them into a short, low-stakes shared activity.

Design goals for the first-five-minutes experience:
- Fun within 30 seconds, no "so what do you do?" required
- Reveals personality, humor, and pace *through play* rather than self-description
- Low pressure — it's a game, not a date; nobody's being evaluated (even though they are)
- Leaves a natural conversational thread when it ends ("okay your answer to round 3 was unhinged, explain yourself")

**Open question for our next session:** what is that first activity? (Candidates: a 2-player Jackbox-style prompt round, a "would you rather" with a twist, a collaborative drawing/guessing game, a tiny co-op puzzle, a hot-take debate with playful scoring.)

---

## 5. Safety / Threat Model (Pillar 3 — read before building it)

Pillar 3 — real-time location of single people, disproportionately women — is a **stalking and personal-safety problem before it is a dating feature.** "Find My Friends, but single" is a great *vibe* and a lethal *literal implementation.* The safety design **IS** the product here, not a bolt-on.

**Display model (decided v0.1):** Show a **heat map of density**, never individual tracking dots. The unit on screen is "this area has energy right now," not "here is a person you can go to." Ambient, not a hunt.

Non-negotiable design constraints if/when we build it:
- **No live GPS dot.** Never broadcast a person moving down a street. Heat map only.
- **Fuzz to a fixed ~1/4-mile grid (snap-to-grid, NOT random jitter).** Random noise around a true point can be averaged out over repeated samples to recover the real location; a fixed geohash-style cell can't. Same person, same place → always the same cell. The grid *is* the privacy boundary.
- **Minimum-density threshold (k-anonymity).** Never render a cell unless ≥ N broadcasting users are in it (start N=4–5, tune later). Below threshold the cell shows cold/empty — never "1 person." A lone hot spot *is* an identifiable individual; we'd rather show an empty map than out someone.
- **No animation / coarse time buckets.** Update in 15–30 min buckets (or just "tonight"); never animate movement, so no one can infer a path by watching.
- **Venue / check-in based**, not continuous — "I'm at this bar tonight," expires automatically.
- **Opt-in per person**, revocable instantly, never default-on.
- **No reverse lookup** — you can't pin where someone *lives* from repeated signals.
- Block, report, and "panic hide" must be first-class, not buried in settings.

Get this wrong and nothing else about the app matters — it gets people hurt and gets pulled from the store. Get it right and it's the highest-ceiling feature in the product.

---

## 6. Why "do it together, not consume each other" wins

- It's the genuinely **new** thing. Anyone can clone a swipe screen; almost nobody has nailed "two strangers having real fun in the first five minutes."
- It's **defensible** — the activity layer is content + craft, harder to copy than a UI.
- It's **honest** — the business succeeds when users *connect*, not when they churn in frustration. That alignment is rare in this category and is itself a marketing story.

---

## 7. MVP scope (proposed — to refine together)

**In:**
- Pillar 1 only: matching + the first-five-minutes shared activity
- One mode to start (Find a Friend *or* Intentional Dating — decide together)
- 2–3 polished in-app activities, not ten mediocre ones
- Basic profiles, intent-matching, block/report

**Out (for now):**
- All location features (Pillar 3)
- Third-party integrations like Strava (Pillar 2)
- Anything that smells like a hookup loop or a slot machine

---

## 8b. Intentionality Mechanics (proposals — capturing as we ideate)

These are opinionated mechanics aimed at the dating app's two original sins: **endless texting** and **the roster / optionality**. All are *proposals*, not settled, but all are strongly on-thesis (push connection toward *generated in person*, away from *consumed through a screen*).

### Mechanic A — "Meet or it rests" (softened self-destruct)
- **Original idea:** if both parties haven't met in person within 50 messages, auto-unmatch. Only a mutual "we met" tap lets the conversation continue.
- **NO visible counter (revised):** same disease/cure as Mechanic D — never show "37 messages until unmatch." Drive off momentum/silence signals, not a gameable integer. (See Mechanic D's product-wide principle.)
- **Status: hard-block version REJECTED** — a hard guillotine punishes the cautious (esp. women vetting for safety) and fights our own safety ethos (Section 5). It would block users who are slow-but-alive.
- **Kept / softened version:**
  - At the threshold, *prompt* both people ("Ready to meet, or need more time?") instead of auto-killing.
  - Both want more time → granted quietly. Mismatch → surfaced gently as signal.
  - Cutoff only fires on *silence* (dead pen-pal threads), which is the real target.
  - **Soft expiry, not hard delete** — lapsed match "rests" with a revive option.
  - No doom-clock UI ("37 messages left!!" = slot-machine anxiety, rejected). Frame as warmth.
  - "We met" button is gameable and that's fine — only cheats themselves. Optional v2 verification falls out of Pillar 3 for free (both phones in same grid cell = privacy-preserving "you were together").
  - **Open call:** limit by messages (50) or time (~2 weeks)? Lean: time, or whichever-first. Time is gentler and matches real dating pace.

### Mechanic B — Connection cap (anti-roster)
- **Idea:** cap the thing that actually costs — live connections — not the cheap signal of liking.
  - **Liking is unlimited** — express interest in as many people as you want; it's low-cost signal.
  - **Active connections/matches are capped** (~3 at a time). You can be interested in the whole room, but only *hold* a few real threads.
- **Reinforces Mechanic A:** capped slots + "meet or it rests" = a living funnel. Slots are precious → you're pushed to move a connection toward meeting in person, or let it rest and free the slot. *Don't hoard, don't stall — invest or release.* The cap creates the pressure; the meet-mechanic gives it somewhere to go.
- **Open design question:** when slots are full and a new mutual like lands — what happens? Not "invisible / tough luck." Lean toward a gentle nudge: *"You're at your limit — someone new is waiting. Ready to free a slot?"* Turns the cap into an intentional choice, not a dead end.
- **Why it works:** attacks optionality / paradox of choice — the thing that makes people treat humans as replaceable tabs and never invest.
- **Bonus:** quietly fixes the gender asymmetry — caps force men to be selective (vs spray-and-pray) and stop women from drowning in 40 threads they must triage.
- **THE NON-NEGOTIABLE RULE:** *never monetize the cap.* No "pay to unlock more likes." Hinge/Bumble cap likes too — but as a paywall lever (artificial scarcity sold back to you = pure Bergen). Ours is a **values statement**: focus is the product, no money unlocks more. Same mechanic as theirs, opposite intent. Monetizing it = the app dies.

### Mechanic C — Intentional onboarding + compatibility recommender (one connected feature)
These are the same feature: the onboarding is *where the compatibility signal is collected*, and the recommender *feeds on it*.

**Onboarding ORDER (revised — credit: outside review): tiny → demo → deep.** Don't front-load the long onboarding (bleeds people before they feel value). Order: **tiny onboarding** (intent + just enough to run a *generic* demo) → **demo the First Five Minutes** (feel the thesis) → **deep onboarding** (now invested → ask for effort) → preview who's waiting → door. The deep onboarding keeps BOTH its jobs (intent/scam filter + overlap data) — and the filter gets *stronger*, since effort now self-selects on real desire, not patience.

**Onboarding as filter (~5–10 min, done AFTER the demo):**
- Deliberately longer setup to filter out low-intent / quick-sign-on users and to gather matching data. Friction-as-filter (cf. eHarmony's long questionnaire — the filter *was* the product, and it doubled as the data source).
- Psychological bonus (anti-Bergen): effort up front → users *value what they built* (IKEA effect / effort justification). They treat the app as something they're invested in, not a slot machine.
- **Sharpening:** make it filter for the *right* thing. A long *boring form* filters by patience, not intent — screens out busy-but-serious people. Make the 5–10 min feel *meaningful*: thoughtful, slightly-fun reflective prompts that give a first taste of the app's values. Effort should be *revealing*, not just *long*. (Ideal: onboarding itself carries the "different kind of app" feeling.)

**Compatibility recommender — coarse filter, NOT an oracle:**
- **Philosophical fork (flagged):** a strong "we computed your soulmate" algorithm is the *opposite* of our activity-first thesis ("you can't know from a profile; chemistry emerges by doing something together"). If the algorithm becomes the main gate, it undercuts the activity layer.
- **Resolution:** the recommender's only job is to **reduce noise** — put plausible people in the same room. The **First Five Minutes activity is the real chemistry test.** Algorithm gets you to the table; the activity tells you if there's a spark. Never let the algorithm pose as a verdict.
- **Match on what profiles actually predict:** self-reported preferences are poor predictors of in-person attraction, but decent for *values / lifestyle / life-stage / intent* alignment — which is what sustains relationships. Weight the recommender toward those; let the activity handle spark. That division of labor *is* the thesis.

### Mechanic D — Blind until you've talked (the keystone)
The purest expression of the thesis — and it ties the other three together.

- **The idea:** no photos up front. You do the questionnaire (can state looks-preferences). Photos stay hidden until a real conversation has actually happened; you *unlock looks through real conversation.*
- **NO visible threshold number (revised — credit: outside review).** A visible "25 messages" gets gamed (fire off 25 "hi"s to hit the unlock). Tie the reveal to engagement *quality*, not message *count*. BUT fuzzy ≠ invisible: humans hate *arbitrary* gates AND *opaque* ones equally — **show momentum, hide the formula** (photo visibly warms/sharpens, "you two are clicking"), no exploitable integer behind it. **Weight behavioral signals** (reciprocal participation, activity completion — concrete, hard to fake) over NLP "conversation depth" (hard to build, easy to game/bias — weak garnish only). Optional: signals *unlock the ability* to reveal; a mutual "ready?" tap *triggers* it (agency + no gaming).
- **PRINCIPLE (applies product-wide):** every threshold = momentum, NOT a counter. Same cure applies to Mechanic A's meet-or-rest cutoff — no visible "37 messages until unmatch" either.
- **Why it's the keystone:** a photo in a swipe app is the purest act of *consuming a person* — judging a whole human in 0.3s on an image. Blind-until-talked makes the face the **reward earned through connection**, not the entry ticket. North Star at max volume.
- **Synergy (this is why it matters):** the blind period *is* the First Five Minutes window — the activity is *how* you rack up the messages. It also stacks with the connection cap (you spend a precious slot on someone you haven't even *seen*). All four mechanics converge on one moment.

**Three known tensions (blind-date apps have a graveyard — S'More etc.):**
1. **Stated looks-preference + staying blind = backend filter.** Preferences quietly filter who surfaces (your type + whose type you fit) without showing the photo. **ETHICS LANDMINE:** filtering on physical preference is where these systems launder bias — OkCupid data showed brutal racial skew in "looks" filters. A "type" filter can become a discrimination engine. Tread carefully: broad attributes only, deliberately avoid anything mapping to race. Decide this consciously.
2. **The reveal cliff is the killer.** A binary big-reveal at msg 25 = sunk cost + "don't be shallow" pressure + high-stakes anxiety. That moment is where blind apps die. **Fix: progressive un-blur** — photo gradually sharpens as the conversation deepens. No single terrifying moment; "earning" felt continuously. Strongly preferred over binary unlock.
3. **Don't pretend looks don't matter (keeps it from being naive/preachy).** Attraction is a real component of romantic compatibility; denying it traps people. The claim is NOT "looks don't matter" — it's **"looks shouldn't be the first and only filter."** Honor attraction (backend filter + reveal); just deny it the snap-judgment gate.
- **Per-mode flex:** Find-a-Friend → looks barely matter, full-blind is great. Intentional Dating → attraction is real, use progressive reveal.

### Mechanic E — Match on shared overlaps / serendipity (the soil)
The thing every other mechanic needs: *something to be about.* Matches arrive WITH their reason ("you both flagged this book," "you're both going to Oaxaca in 2027") — the icebreaker is built into the match, so the blind 25-message period is survivable (you pull an existing thread instead of manufacturing chemistry from nothing).

**Two distinct overlap types — the matcher should hunt BOTH:**
- **Shared sameness** (same book, both go to church, both going to Mexico) → *resonance / "you get me."* Values & lifestyle alignment. Feeds the compatibility recommender.
- **Complementary difference** (she sings, he plays guitar) → *fit, not sameness.* Jigsaw pieces. Arguably MORE powerful: pure sameness gets boring; complementarity creates **a reason to do something together** (singer + guitarist = make music = a shared activity waiting to happen). Runs straight into the "alongside, doing a thing" thesis. Most apps only do sameness — the complementarity hunt is novel.

**What it locks into place:**
1. **Closes the loop on the long onboarding (Mechanic C)** — the overlaps (books, bands, faith, travel plans) are exactly the data collected in those 5–10 min. Onboarding isn't a tax; it's where serendipity fuel is mined.
2. **Feeds the First Five Minutes** — the activity is *generated from the overlap* (same book → a thing about the book; singer+guitarist → a creative prompt). The shared thing *becomes* the game.
3. **Shared FUTURE overlaps** ("both going to Mexico in 2027") = built-in, zero-pressure reason to **meet in person.** Feeds the load-bearing meet feature for free.

**Caveats:** rare/magical overlaps need a *big user base* to fire — early launch yields coarse overlaps ("both like hiking"); serendipity scales with the crowd (don't misread a thin early launch as failure). Keep overlaps as *conversation seeds / tie-breakers*, NOT the deep compatibility verdict (that's still values, per Mechanic C). Overlaps = texture; values = substrate.

### Mechanic F — Friend "bubbles" / activity clubs (possibly the WEDGE, not a side mode)
Non-dating intent: find people with shared goals — a new running group, frisbee club, hiking buddy.

**Reframe — this may be the main event, not a secondary feature:**
- **Friendship is the PUREST expression of the thesis.** "Connection is generated by doing things together" — dating *borrowed* this; friendship *is* this (nobody swipes their way to a friend; you show up to the thing). Zero translation needed.
- **None of dating's baggage:** no reveal-cliff (full-blind trivially fine), no creep-factor, lower stakes → people actually show up → the load-bearing meet-in-person feature fires far more easily ("come to a Saturday run" vs "meet a romantic stranger").
- **Solves cold-start structurally** (the #1 social-app killer): a club feels alive with far fewer people than a dating pool; activity clubs are local & self-seeding; "join my hiking group" is shareable/non-cringe (free viral growth) where "I'm on a dating app" is not.
- **Huge underserved market:** adults can't make friends post-college; loneliness epidemic; incumbent (Meetup) is clunky/tired. Nobody built the warm intentional version.
- **Possible strategy: LEAD WITH FRIENDS, let dating ride the same rails once density exists.** Friend mode builds the crowd; dating monetizes it later. (Strategic fork — sit with it, don't decide impulsively.)

**Two things that genuinely change (groups break 1:1 machinery):**
1. **A "club" is a NEW object — dating mechanics don't all port.** Two distinct things: (a) 1:1/small **buddy match** (hiking buddy); (b) N-person persistent **club** (running group). A club doesn't expire after 50 messages — it's ongoing community + events. Connection cap & meet-or-rest were built for 1:1 dating; clubs need their OWN ruleset (in a few clubs; a club has many members; "we met" → "the run happened"). Sibling system, not a toggle.
2. **Hard intent separation = the safety rule.** Ambiguity ("is this person hiking or hitting on me?") poisons BOTH modes — makes friends creepy, makes dating confusing. The "bubble" must be **unambiguously platonic.** A person may use both modes, but any given bubble is clearly ONE or the other, never blurred.

**Bonus:** clubs are a perfect fit for experience-commerce (8d) — groups spend together (race entries, field rental, guided trips). Caveat: people pay for *dating* more readily than *friend-finding* (Meetup monetizes organizers, not attendees) → friend mode may be the cheap growth engine, dating the margin.

---

## 8c. Emergent property — Abuse-resistance by design

Not a designed feature — it *fell out of* the intentionality system for free. This is defense by **economics + physics**, not by an ML detection arms race. It's a real selling point AND a design constraint (don't add features that re-open these holes).

Scams (romance / pig-butchering) are a **scale business**: cheap stolen photo as hook → wide net → automate opener → work hundreds of marks in parallel → pivot to crypto/gift-card. Our mechanics break every input:
- **No photos** → kills the #1 scammer asset (stolen photos / catfishing).
- **Effortful onboarding** → raises cost-per-fake-account.
- **Connection cap (~3)** → destroys **scale** — the scammer's whole economy is mass parallelism. This is the biggest lever.
- **Meet-in-person + "we met"** → unforgeable proof-of-human a remote actor cannot satisfy.

**Critical correction (post-LLM threat model):** "no bot would bother with 25 messages" is FALSE in 2026 — an LLM sustains charming conversation at near-zero cost. **Conversation is no longer a human-proof.** Do NOT lean the anti-bot claim on chat effort.

**Lean it on what bots / remote scammers structurally CANNOT do:**
1. Can't scale past the cap (3 slots).
2. Can't show up in person (meet gate = physical proof-of-human).
3. Can't reuse a stolen face (no photos; make the reveal live/verifiable).

→ Reframed claim: not *"bots can't talk"* but ***"bots can't scale, can't show up, can't borrow a face."*** Survives modern AI; stronger than the original.

**Residual risk:** patient *human* scammer rings (pig-butchering invests weeks of real human chat) pass the conversation filter — but still can't beat the cap or the in-person gate. ⇒ **The meet-in-person requirement is the load-bearing security feature**, not the conversation. (Same conclusion as the whole thesis: get them into the real world.)

---

## 8d. Business Model — "Monetize the win, not the suffering"

**Principle:** legacy apps monetize the user's *pain* (sell relief from manufactured scarcity = the Bergen paywall). We monetize the *win* — revenue that grows when we SUCCEED at the mission (getting people off the app, into the real world), never when we exploit failing at it.

**1. Paid door — flat fee, NO feature-gating (do now; covers infra).**
- Modest subscription (~$5–10/mo) or one-time "founding member" fee just to *be on the app*.
- **Hard rule:** money buys access, NEVER advantages over other users. No pay-to-unlock-connections, pay-to-message, pay-to-see-who-liked-you.
- On-thesis: the paywall is itself an **intentionality + anti-scam filter** (serious people pay; scammers can't afford 500 paid accounts). Not rationing joy *between* users — charging admission to a better room. (Precedent: The League, eHarmony.)

**2. Real-world experience commerce — the actual business (build toward).**
- The ONLY model that earns *exactly when the mission succeeds.* App pushes people to meet & do a thing → monetize the thing.
- Venue/experience partnerships, booking/affiliate fees when a match books a real date (cooking class, climbing gym, café, concert, jam space). "Meet at this partner spot, first round's on us."
- Earns *when the connection goes offline* = literally the "win when the user leaves" alignment as revenue. No competitor can do this cleanly — their users never leave the chat.
- **Bonus:** ticketed real-world *Alongside events* in a city double as the **cold-start fix** (seed the density that heat map + overlaps need). Revenue + growth from one lever.

**3. Allowed extras — only if they improve YOU, never your access to PEOPLE.**
- ✅ More/better activity content, conversation coaching, "travel mode" (match in a destination before a trip — facilitates real meeting).
- ❌ Anything that raises the cap / surfaces more people / buys an edge over others = Bergen paywall in costume = app dies.
- ❌ Ads (incentivizes keeping people ON the app — anti-mission; wrecks the calm vibe). ❌ Selling data.

**Free tier — "the courtyard is free, the building is paid."**
Can't sell a *feeling* to someone who hasn't felt it — the product is an experience, not a feature list, so a free taste is the ONLY path to conversion. Draw the line wrong and it breaks two ways: too generous → nobody pays AND free users spend paid users' scarce connection slots (cannibalizes the paid experience); too stingy → charging for a promise = the Bergen move.

**Courtyard (free) = the full taste, no real humans yet (ORDER: tiny → demo → deep → preview → door):**
1. **Tiny onboarding** — intent pick + just enough to run a generic demo. Low friction at the door.
2. A **demo of the First Five Minutes** — play a sample activity vs a scripted/demo partner. Delivers the "aha" (the fun no screenshot conveys) at zero real-user inventory cost. *Feel the thesis BEFORE being asked for effort.*
3. The **deep intentional onboarding** (Mechanic C) — now they're invested (IKEA effect primes payment); reveals the app's values; gathers overlap data + acts as intent/scam filter.
4. A **locked preview of who's waiting** — "14 people share your bookshelf," "someone's also going to Oaxaca 2027." Real, teased/blurred → desire, not manipulation.

**Building (paid) = connecting with actual humans.** Crossing into a real connection is the door.
- **Why it doesn't violate the North Star:** the wall isn't *manufactured* friction (Tinder throttling likes it could give free). The building is a genuinely different REAL good (human connection), and the courtyard *honestly shows what's inside before you pay.* Bright line between an honest door and a Bergen toll: **is the scarcity real, and did you show it to them first?** Yes and yes.
- **Protection:** keep real connection strictly behind the door so free users never occupy paying users' capped slots. (Optional later: a separate **trial pool** where trial users meet *each other* — never spending a committed user's slot. Launch with demo-only courtyard; add trial pool if conversion needs juice.)
- Funnel is honest all the way down: feel the vibe → feel the fun → see real people waiting → walk in when ready. No dark patterns.

**Cost reality (reassurance):** this design is unusually CHEAP to run — no photo-first feed = no massive image CDN (Tinder's #1 cost, designed out); capped connections = low message volume; fewer matches = less compute. A few thousand intentional users on managed Postgres + a small server is pocket change; a flat fee from a small serious base covers it many times over. **The lean/anti-consumption architecture is what buys the freedom to monetize ethically instead of desperately.**

---

## 8. Open Questions / Parking Lot

- Final name + brand tone
- Find-a-Friend vs Intentional Dating — launch with which? Or let user pick on signup?
- What's the *first* activity (Section 4)?
- How do people match *before* the activity — interest tags? availability? Or do we minimize pre-match friction and let the activity do the filtering?
- Monetization that doesn't betray the North Star (i.e. NOT "pay to undo the friction we created")
- Async vs live activities (timezones, schedules, low-population early days)

---

*Next session: design the First Five Minutes (Section 4). That's the seam. Everything else is downstream of whether that experience is genuinely fun.*

---

## 9. Design-Mockup Prompt (copy-paste into Claude / design tool)

**How to use:** paste **PART A (the context header) EVERY time**, then paste **ONE batch** from PART B underneath it. Don't ask for all screens at once — batches produce far better results. Suggested order: Batch 1 → 2 → 3 → 4 → 5.

---

### PART A — Context header (paste this above every batch)

```
You are designing a high-fidelity, clickable prototype for a connection app called "Alongside" (placeholder name).

PHILOSOPHY (drives every pixel):
Most apps treat connection as something you CONSUME — judge a face in 0.3 seconds, swipe, hoard a roster, text forever, never meet. "Alongside" treats connection as something you GENERATE by doing things together. Its success metric is how fast it gets people OFF the app and into real life. It has two intents the user picks between: DATING (intentional, real relationships — NOT hookups) and FRIENDS (find people for shared activities — a running group, frisbee club, hiking buddy).

CORE MECHANICS that show up in the UI:
- No photo-first judging. People are BLIND to each other's photos at first; the photo gradually UN-BLURS as a real conversation deepens (earned, not given). Looks are never the entry gate.
- Matches arrive WITH their reason — a shared overlap ("you both flagged this book," "you're both going to Oaxaca in 2027") or a complementary fit ("she sings, he plays guitar"). The icebreaker is built in.
- After a match, you are NOT dropped in an empty chat box. You're dropped into a short, playful SHARED ACTIVITY (a 2-player Jackbox-style mini-game) that reveals personality through play. This is the hero of the product.
- Connections are CAPPED (~3 active at once). Likes are unlimited; live connections are scarce and precious.
- The app gently pushes people to MEET IN PERSON; a mutual "We Met" is a celebrated graduation, not a chore.
- Friends mode uses "bubbles"/clubs — clearly platonic, never blurred with dating.

AESTHETIC DIRECTION (critical — this is the anti-slot-machine app):
- Warm, calm, human, tactile. Soft palette, rounded forms, generous whitespace. A cozy living room, NOT a neon casino.
- Grown-up playful — users are adults in their 30s+ tired of the swipe grind.
- ABSOLUTELY AVOID: infinite swipe feeds, red urgency badges, dopamine-bait counters, hot-or-not photo grids, gamified addiction patterns, anything that feels like gambling.
- Every screen should feel intentional, safe, and unhurried.

Deliver real (sample) content, not lorem ipsum — write actual prompts, real overlap examples, real activity content so the screens can be FELT. Make it clickable where possible.
```

---

### PART B — Screen batches

**BATCH 1 — Onboarding & Courtyard (the free taste):**
```
Design these screens (ORDER MATTERS — feel the thesis BEFORE asking for effort):
1. Welcome / landing — communicates "this is a different kind of app" in one warm breath.
2. Intent picker — choose DATING or FRIENDS (two clear, distinct doors).
3. TINY onboarding — just intent + minimal info, low friction, enough to run a generic demo next.
4. Demo of the "First Five Minutes" activity — a guided sample so a new user FEELS the fun FIRST, before any heavy lifting.
5. DEEP intentional onboarding (multi-step, 5–10 min in feel) — warm, reflective prompts about values, interests, goals, what you're looking for (incl. a tasteful looks-preference step used invisibly for filtering). Comes AFTER the demo, when the user is invested. Effort should feel meaningful, not like a tax.
6. "Who's waiting" preview — real, teased/blurred matches and overlaps ("14 people share your bookshelf"). Creates desire honestly.
7. The "enter the building" screen — a warm, transparent paywall showing exactly what's inside. The courtyard is free; the building is paid.
```

**BATCH 2 — Dating core loop (the heart):**
```
Design these screens:
7. Discovery — a FEW curated, overlap-based recommendations (NOT a swipe feed). Photos blurred/blind. Each card leads with the shared reason.
8. The match moment — arrives WITH its overlap seed ("you both...").
9. ★ The First Five Minutes activity screen ★ (the hero) — a 2-player Jackbox-style mini-game with REAL sample content; fun within 30 seconds; reveals personality through play.
10. Conversation/chat — shows the gradually UN-BLURRING photo, the overlap thread it opened with, warm and unhurried.
11. Connections manager — your ~3 active connections, slot status, and a gentle "free a slot?" nudge when full.
12. "Ready to meet?" prompt + the celebrated "We Met" graduation moment.
```

**BATCH 3 — Friends / Bubbles mode:**
```
Design these screens:
13. Friend discovery — browse activity bubbles & clubs (running group, frisbee club) and 1:1 buddy matches, by shared goal. Clearly platonic in tone.
14. Club/bubble detail — members, the activity, upcoming real-world events.
15. Create-a-bubble flow — start your own club/buddy search around a goal.
16. Club coordination — group chat + event scheduling for a real-world meetup.
```

**BATCH 4 — Safety & "in the wild":**
```
Design these screens:
17. The "in the wild" HEAT MAP — ambient density of activity nearby. CRITICAL: show density/warmth of AREAS, never individual dots or live tracking. Coarse, fuzzed, calm.
18. Safety controls — opt-in location, block/report, and a prominent "panic hide." First-class, not buried.
```

**BATCH 5 — Real-world & system:**
```
Design these screens:
19. Real-world experience suggestions — partner venues/experiences for a date or club outing (the cooking class, café, climbing gym). This is where connection goes offline.
20. Own profile — values & overlaps forward; photo shown as "earned/revealed."
21. Settings — intent switching, subscription, privacy.
```

---

## 10. Session 2 decisions (2026-06-22, evening) — the connection engine + the wild map

*Captured live. Some of this supersedes/sharpens earlier sections; noted where it does.*

### 10.1 The reveal, resolved — welded to the game (supersedes the standalone Mechanic D)
The blind-photo idea is NOT a separate gated feature anymore. It is **fused into the First Five Minutes**:
- You start **blind** — the partner is a flat colour dot.
- As you BOTH answer ~5 light "would you rather" rounds, the photo **progressively resolves** (blur→clear), stopping at **~85%**.
- Then a **match / no-match** decision. **Full 0-blur reveal only on mutual match.**
- **Reframe that defuses the S'More death:** it is no longer "a blind dating app" (the scary, adverse-selecting frame). It's *"play a 2-min game; the face is the reward for playing."* The willingness-to-start cliff softens (the ask is "play," not "date blind"); the reveal-cliff dies (resolution is gradual, a byproduct of fun, never a binary big-reveal).
- **Honest caveat (per Visionary):** this defuses the *reveal-cliff*, not the *adverse-selection* supply skew. We ACCEPT a skewed pool because the skew points toward our actual customer (people tired of being judged on a photo). Do not call it "solved"; call it a trade we chose. Test before prod: would 5 conventionally-attractive people play it *twice*?
- Built + working as `first-five-minutes.html`.

### 10.2 Question design — threads, not nouns
- **Rule:** a question must surface a **thread** (a story / value / small confession you have to *explain*), never a **noun** ("you like music? me too!" = dead end).
- Grounded in **self-disclosure reciprocity** (Aron's "36 Questions"). The app is a **disclosure ramp**, not an interest-matcher.
- **Core principle / candidate tagline: "Nobody has to carry the conversation."** People happily answer interview-type questions IF they're rapid-fire and they are NOT the one hosting. **The app is the host so neither human has to be.** The moment a screen asks a user to *generate* text instead of *react*, the magic is lost.

### 10.3 Deep rounds — learning, not scoring
- Post-connection deep questions (1–6 values scale) are **not a compatibility %.** They teach you *who the person is and how they handle conflict.*
- Difference is framed as **"a rhythm you'd learn,"** never a demerit. Turns values-questions from a filter/gate into a **relationship skill.** (Best single idea of the session per Visionary; also sidesteps the bias landmine in Mechanic D, tension #1.)

### 10.4 Positioning + brand spine
- **Spine:** *"a community where you're seen, known, and heard."* (Direct antidote to the origin insight in Section 0.)
- **Lead tagline:** *"Nobody has to carry the conversation."* (Preferred over "matched on how deeply you want to be known" — the latter risks recruiting the *exhausted/depleted*, who are bad at the vulnerability the app needs.)
- **Match on depth-willingness, not interests** — but **inferred from behaviour in the First Five, never self-reported** (everyone claims "deep"; self-report collapses to noise).

### 10.5 Flow + the depth dial (trims the over-built version)
- **Flow:** mandatory First Five (framed as *the experience/demo*, not a form) → match → deepening conversation → open chat unlocks LAST (so nobody ever faces an empty text box; free chat is the *reward*, not the test).
- **Depth is a temperature, not a visible staircase.** Keep tiers as an *internal* model for which questions surface; the user must NEVER see "rung 2 of 3" (that re-creates a score).
- **Pulling back is silent, free, and invisible** — implemented as a property of the conversation (it just *cools*; no event fires; never shows who pulled back), NOT a per-rung "bail" button (a visible bail button advertises danger and teaches a high-stakes climb).
- **Sunk-cost guardrail:** the First Five investment (IKEA effect) makes people more willing to go deeper — good. But it must create **willingness, not obligation.** Quitting must stay genuinely cheap (a soft landing). *"Engagement engine and ethics are the same lever pointed opposite directions; keep quitting cheap."*

### 10.6 The model — served concierge, not a browse marketplace
- **No discovery feed.** The app is a **matchmaker that serves you** a daily queue of blind First Fives — you're never shown an empty room because you're never shown the room.
- **Async First Fives** (you answer your 5, they answer theirs whenever; dot resolves when both halves complete). Async is what makes a daily drip ("~10/day" aspirational) work without coincident presence — and it defuses the cold-start *timing* problem. (Sync "play live now" mode is a later add once density exists.)

### 10.7 Cold-start — honest light pool, no bots (the stance)
- **Every connection app has a seed problem unless it blitzes major cities.** So don't hide it — wear it.
- **Be honest with early users: the pool is light, and every person is REAL.** *"We will never pad it with bots, fake profiles, or ghosts."* This is the **inverse of the industry's faked-liquidity** (Match Group's fake-profile lawsuits, universal bot-seeding) — a trust position incumbents can't copy. Makes the Section 8c anti-bot architecture into a *marketing line.*
- **Honesty buys patience, not liquidity.** Pair it with **concentration:** light-but-dense in ONE place/community beats light-spread-thin everywhere. A friends-club / singles-event is the densest seed atom.

### 10.8 Acquisition + monetization — events + the wild map
- **Seed via real in-person singles events** (concentrated, dense, honest). This is the structural cold-start answer (the denominator, not just the numerator).
- **North-Star feature: "approach in public — not the app experience."** The app's job is to dissolve into real life. Get people OFF the app, into a real moment.
- **Monetization (at launch):** flat **pay-to-date access** (never pay-per-match / pay-to-see-people = Bergen paywall) + partner-venue experience commerce.
- **The wild map is NOT a launch pillar.** It is a **post-density consequence** — it can only be non-empty once events have created standing density, and its k-anonymity floor *guarantees a blank/cold map until then.* A cold-everywhere map broadcasts emptiness (the exact "empty room" wound the served-concierge model removes). So the map ships *after* the core proves out and density exists (consistent with 10.9 sequencing and original Section 5 "build last"); it is a someday-reward and a later revenue layer, never an early lever. **Resolves the 10.8↔10.9 contradiction flagged in review #3.**

### 10.9 The wild map — SAFETY-CRITICAL spec (sharpens Section 5)
Decided model: **density of PLACES, never identity of PEOPLE.** "This venue is alive tonight," never "that single is here."
- **Venue-anchored check-in (2010 Facebook Places / Foursquare model):** you check into a curated list of **public** venues — you do NOT broadcast raw GPS. **Home is not a checkable place** → you structurally cannot broadcast from your couch. (Borrow Places' venue-list + check-in UX; fix its sins: **self-only** — no one can check *you* in; **ephemeral** — no location history.)
- **k-anonymity density floor at EVERY zoom:** never render a cell with fewer than ~5 broadcasting people; below threshold shows **cold/empty even if someone's there.** Cap max zoom so the smallest cell is a *neighbourhood/venue, never a street corner.* The zoom is the attack — a blob you can zoom into until it's 1 person is a pin. **This floor also makes home-broadcast pointless** (residential cells never hit 5) → safety mechanism and product goal are the SAME mechanism (map only warms where crowds already gather: bars, parks, events).
- **Opt-in, proximity-anchored, auto-off:** turn on at a venue; **auto-off when you leave (~1-mile radius);** expiring, not continuous. No trail, no reverse-lookup to where you live.
- **Approach-preferences stay OFF the public map.** "How I want to be approached" is a *personal* signal revealed only **in person / on mutual consent** — never painted over geography (that draws a target, not an invitation). The map gets you *to the room;* the *how* happens *in* the room, on their terms.
- **No animation, coarse time buckets** — never let anyone watch a blob move and infer a path.
- **Sequencing:** even the safe version ships **after** events + First Five prove out (per original Section 5: highest risk, build last). Let events seed the density, THEN light up the (density-only) map.

#### 10.9a Live mode refinements (added 2026-06-22) — "a SIGNAL, not a profile"
The single clearest articulation of why the wild map is safe. **Live is a presence *signal* for people already out in the world — never a window into a person.**

- **Two distinct modes for two states:** (a) **Core app** — you're at home, you want to be *matched & served*, depth-first, async; profile + First Five + deepening live here, behind the earned reveal. (b) **Live** — you're *already out and open*, you want a lightweight ambient "there's energy here, come say hi." Deliberately thin: no profiles, no photos, no names — only *energy + one optional trait*.
- **Why it's structurally safe (the load-bearing argument):** a stalking tool requires **identity + precise location + persistence.** Live is designed to have **none of the three** — *aggregate not identity* (you're "someone here," never findable), *fuzzed not location* (¼-mile grid, never a point), *ephemeral not persistent* (duration-based, auto-off, no trail). Remove all three and the feature is *structurally incapable* of being a stalk tool. That's what makes it safe for the woman already outside.
- **The data-exposure inversion:** normal apps make you build a rich, permanent, stalk-able profile just to *maybe* meet someone. Live lets you meet someone with **near-zero data exposure** — "I'm out, I'm open, here's one optional thread." For someone already at the lake and open to it, it's the *lowest-exposure* way to be approachable that exists — less exposed than swiping, not more.
- **GPS-derived venue list:** the check-in list is generated from **public POIs near your actual GPS** (parks/trails/cafés/bars/gyms/events — *residential categories filtered out*). **Raw coordinates never leave the device** (GPS in → venue out; only the chosen, already-public, already-fuzzed venue is shared). Safety feature, not just UX: home is never in the list → home-broadcast impossible by construction; sparse spots simply stay cold (k-anonymity). Example (founder at Folsom Lake): list = Beals Point / lake walkway / trailhead / Granite Bay beach.
- **Trait-as-icebreaker = the load-bearing social design:** the optional exposed trait is shown at the **area/aggregate level** ("*someone* here is training for a marathon"), never attached to an identifiable person. It converts the in-person approach from *"I'm interested in your body"* → *"I'm interested in your thing."* Effects: (1) **discreet & dignified** — "Are you training for a marathon?" is askable by anyone of anyone, never reads as a come-on; (2) **consented** — they chose to expose the trait, so being approached about it is *invited* (vs. judged on looks they didn't put forward); (3) **no-fault / deniable** — no spark → it stays about the marathon, both walk away clean, no rejection sting (this deniability is what makes people brave enough to approach); (4) **de-risks women's safety** — strips sexual intent out of the cold approach, the single biggest reason someone opts into being findable-as-energy; (5) you're given *a reason to talk to anyone*, NOT a target — the right person self-identifies when asked. It's "nobody has to carry the conversation," extended into real life.

### 10.10b Two more decisions (2026-06-22, post review #3)
- **DATING-FIRST, not friends-first (DECIDED).** Reverses the Visionary's "lead with friends" wedge. Rationale: it's the product the founder actually wants and will use (user #1 is here to date). **Eyes-open trade:** friends-mode was the *structural* cold-start solution (denser, shareable, lower-stakes); choosing dating-first means the seeding burden falls **entirely on events + distribution**, with no friends-wedge cushion. Accepted because the founder has no network to run a friends-seed through anyway, and is committed to build-it-then-seed via the app itself. Friends-mode stays on the roadmap as a *later* density engine, not the launch.
- **Free first, charge after ~a few months (DECIDED).** Launch **free** (don't charge admission to an empty/light room — §10.7); introduce the flat pay-to-date access fee only once there's real density/value to pay for. Correct sequencing: monetize the *win*, after the room is worth entering. No feature-gating ever (§8d hard rule still holds).

### 10.10 Open / unresolved after this session
- **Sync vs async First Five — DECIDED (2026-06-22): sync-first, async fallback.** Live co-play is the soul ("shoulder-to-shoulder, in real time" = the thing that makes it not an interview). The seed channel supplies sync's only missing ingredient *for free*: a singles **event is a room of people present at the same time**, so co-presence is trivial there. Default = play LIVE together now; **async is the graceful-degrade fallback** ("they're not online — leave your answers, it resolves when they play"), never the default. This avoids letting the supply problem pick the product. (Earlier draft leaned async for liquidity; reversed after review #3 — events solve sync's coincident-presence weakness without a city-wide always-on pool.)
- **Do you have a specific real seed community/city?** (The knockout card for the cold-start debate — still unanswered.)
- **The supply test, not another design session:** can you get ~20 real intended-users to ONE in-person event you host? That's the next move; everything tonight was supply-*quality*, not supply-*existence*. Bottleneck was never the First Five Minutes — it's the First Fifty People.

