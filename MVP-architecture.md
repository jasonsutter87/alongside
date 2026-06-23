# Alongside — MVP Architecture & Build Plan

**Status:** Scoping draft v0.1 — 2026-06-22
**Goal:** the thinnest *real* slice you can point seeding at — a **live, 2-player First Five** two strangers can play on two devices, plus the spine to grow into the served-concierge app. See `dating-app-design-doc.md` Section 10 for product decisions (sync-first decided; no-bots; honest light pool).

---

## 0. Constraints shaping every choice (from design doc §0a)
- **Solo builder, 6pm–1am.** Favor batteries-included, managed services. Minimize servers to babysit.
- **Cheap at small scale.** Dozens→hundreds of users must cost ~nothing (free tiers).
- **Web-first / PWA, not native (at first).** Seeding needs a *link a stranger taps and plays instantly* — the app store is a wall between you and the 20 strangers. Installable PWA gives an app-like feel + home-screen icon without store friction. Native iOS/Android comes later, after the web hook works. (Your mockups were iOS frames — the *design* ports fine; the *delivery* should be web first.)
- **Sync-first (decided).** The realtime layer is core, not optional.

---

## 1. Stack — DECIDED (2026-06-22): roll-your-own server

Founder calls: **(1) web/PWA first, (2) own server (not a BaaS like Supabase), (3) Next.js, (4) player's choice — anonymous play allowed, optional sign-in to save.**

| Layer | Choice | Why |
|---|---|---|
| **Frontend** | **Next.js (React), installable PWA** | Chosen. Your prototype is HTML/CSS/JS → React is a small step. |
| **App server** | **TWO processes (not one): (1) Next.js app, (2) `partyparrot` realtime service — separate.** | Corrected per Senior Dev review: do NOT embed partyparrot in the Next.js process. Run partyparrot as the standalone Bun service it's built to be; the Next.js client connects to it over **native WebSocket** (NOT Socket.IO — partyparrot is native `ws`, they're incompatible). Two deploy units on Fly/Railway. |
| **Realtime game room** | **`partyparrot` — ALREADY BUILT** (`~/Documents/Companies/werbosLLM/partyparrot`) | Founder's own hand-rolled Bun realtime **room + presence + soft-lock** server. Zero-dep, in-memory rooms, HMAC ticket auth, rate limiting, empty-room GC, backpressure, graceful drain, 46 tests, Docker/Fly deploy. Its own use-cases list "Jackbox buzzer" and "trivia first-to-buzz / locked answer" — i.e. the First Five. **Run it as the standalone service it is; Alongside is a CLIENT of it.** ⚠️ **TWO CORRECTIONS from Senior Dev source review:** (1) **partyparrot SILENTLY DROPS unknown message types** (`server.ts` ~line 672, `default: // unknown type dropped`) — you CANNOT just "add message types"; you must **fork it to add one `game-event` handler** (~30–60 min, one switch case + handler). (2) **Do NOT model answers as soft-locks** — the 5s lock TTL fights round-gating. Instead: custom `game-event`, server is authority for "both answered → advance → resolutionLevel"; clients render the server-computed blur level (can't cheat the round count). |
| **Database** | **Postgres + Prisma ORM** — managed Postgres (Neon / Railway / Render / Fly) or local in dev | You own it, no lock-in. Prisma = typed, migration-driven, solo-friendly. **Not needed in Phase 1** (see below). |
| **Auth** | **`gatekeep` — ALREADY BUILT** (`~/Documents/Companies/gatekeep/gatekeep`) | Founder's own Bun auth server — **passwordless** (magic-link + WebAuthn/passkeys), JWT with key rotation, SQLite, rate limiting, full crypto test suite, Caddy deploy. Already follows the "never store a password / never invent crypto" guardrails. **Phase 1: anonymous** (light partyparrot ticket, no gatekeep needed yet). **Later: optional accounts** = wire gatekeep; anonymous→identity upgrade keeps the session and attaches a gatekeep subject. Run it as the standalone service it is. |
| **Hosting** | **A persistent host — Fly.io / Railway / Render** (NOT Vercel serverless for the socket process) | Websockets need an always-on process. One small instance is pennies at this scale. |

**Net:** TWO processes — Next.js app (native-WS client) + standalone partyparrot service — plus Postgres later, on Fly/Railway. You own the whole stack. **No Socket.IO anywhere** (stale reference removed; partyparrot is native `ws`).

**Phase 1 needs NO Postgres — BUT it needs a tiny room-persistence layer (Senior Dev catch).** partyparrot rooms are **in-memory and tied to connected users** — an empty room is GC'd. So a *shareable link for an absent second player dies if the creator closes the tab.* Fix: one trivial store (a single SQLite table `room_id, game_state_json, created_at`, or a fork tweak to GC) so the room survives until B arrives. *"This is the thing that will break your first demo."* The game *history* still needs no DB in Phase 1; only room *durability* does.

**Two of the three hard pieces are ALREADY BUILT (founder's own, hardened + tested):** `partyparrot` (realtime) and `gatekeep` (auth). They run as **standalone Bun services**; Alongside is a client of both. What's actually left for Phase 1:
1. **First Five game logic on partyparrot's transport** — round protocol, "both answered → advance," dot-resolution state, match/pass, server-gated reveal (§2).
2. **Next.js client** — adapted from `first-five-minutes.html`, speaks partyparrot's WS protocol (`docs/protocol/v1.md`).
3. **Shareable-link room creation + join** (anonymous, via partyparrot ticket).

**Runtime note:** both services are **Bun**. Decide whether the Alongside app also runs on Bun (one runtime everywhere; Bun can run Next.js) or Node. Leaning Bun for consistency with your existing stack. Confirm.

---

## 2. The reveal is a SERVER-SIDE gate, not a CSS blur (critical)
The prototype blurs the photo in CSS. **That is not real privacy** — the full image is in the page source; anyone can open devtools and grab it. For the real app:
- Store the original photo privately (Supabase Storage, not public).
- **Serve progressively-resolved versions** (e.g. pre-generate tiny/blurred derivatives, or resize-on-the-fly) keyed to round progress. The client only ever *receives* the resolution it has earned.
- **Full-resolution image is released only on mutual match** (server checks both `decision = match` before signing a URL to the full file).
- This makes the "earned reveal" a real guarantee, not a decoration. It's also a selling point: *the face genuinely cannot be scraped early.*

---

## 3. Data model (core tables)
```
users            id, auth_id, display_name, photo_path (private),
                 intent (dating|friends), depth_signal (computed), created_at
questions        id, kind (light|deep), prompt, options[] / scale_labels[],
                 tags[] (what it probes), active
game_rooms       id, player_a, player_b, status (waiting|playing|decided|closed),
                 current_round, created_at, mode (live|async)
answers          room_id, round_idx, question_id, player_id, choice/value, answered_at
decisions        room_id, player_id, decision (match|pass), decided_at
connections      id, user_a, user_b, depth_temp (int, internal), status, created_at
messages         id, connection_id, sender_id, body, created_at   -- unlocks LAST
checkins         id, user_id, venue_id, expires_at   -- wild map, LATER (post-density)
venues           id, name, lat, lng, ...             -- wild map, LATER
```
**Reveal level** is derived, not stored per-frame: `resolution = f(rounds_both_answered)`, capped at ~85% until a row in `decisions` shows mutual match.
**Connection cap (~3)** = enforced by counting active `connections` rows per user.
**Depth = temperature** (§10.5): `connections.depth_temp` is internal; never render it as "tier N/3".

---

## 4. Realtime game-room protocol (sync First Five)
1. Two players join a room (via shared link in MVP; via matchmaking queue later).
2. Room channel carries: `player_ready`, `answer_submitted`, `round_advanced`, `decision_made`.
3. **Round advances only when BOTH have answered** — needs an authority so neither client can desync/cheat. Two ways:
   - *Simple:* a Supabase Edge Function (or the room row + a DB trigger) arbitrates: writes both answers, flips `current_round` when count == 2, broadcasts.
   - *Cleaner if it hurts:* PartyKit durable object holds authoritative room state.
4. Dot resolution is computed client-side **from the shared round count** (safe — it's just how much blur to show; the actual pixels are gated server-side per §2).
5. **Async fallback (§10):** if player B never joins live, persist player A's answers; B plays later; resolve on completion. Same tables, `mode=async`.

---

## 4b. Seed & test data (and how it stays honest)
Needed for development, QA, and the solo onboarding demo. **Three distinct things — only the boundary between them matters:**

1. **Dev/test fixtures** — a roster of fake users + a question bank + scriptable game runs.
   - `prisma/seed.ts` (once Postgres lands) populates a dev/staging DB: ~20 fake profiles (varied photos, intents, depth signals) + the full `questions` table.
   - A **scripted partner runner** so you can play the *live* First Five solo against a bot that auto-answers (test sync/round-advance/reveal without a second human). Lives behind a dev flag.
   - **Hard rule: fixtures load ONLY in dev/staging.** Gate on `NODE_ENV !== 'production'`. A prod seed script should refuse to run, or only seed the `questions` table (real content), never fake users.

2. **Onboarding demo partner ("Sam")** — a *scripted* opponent for the courtyard solo taste (design doc §10 / Batch 1 demo). A **product feature**, allowed in prod, but:
   - **Must be unmistakably labeled "demo"** in the UI (your prototype already says "a demo partner"). Never appears in matchmaking, never counts toward the live pool, can never be "matched" as a real person.

3. **Production pool integrity (the §10.7 promise)** — every profile shown as a *real potential match* is a real, present human.
   - **The line:** fixtures & demo partners may never be counted, surfaced, or matched as if they were real members. Honest = "this is a labeled demo." Dishonest = a fake slipped into the pool to fake liquidity. Same data, opposite ethics.
   - Optional integrity guard: tag seeded/demo rows (`is_synthetic = true`) and assert in the matchmaker that no synthetic row is ever served as a real match.

## 4c. Data layers — Postgres for live state, PFM for export (DECIDED)
Founder's own `pfm` format (`~/Documents/Companies/werbosLLM/pfm` — universal verifiable container: UUID, timestamp, checksum, indexed sections) is used as the **artifact / portability layer, NOT the operational store.**
- **Postgres = source of truth** for all queryable live state (users, matches, queue, connections, cap, wild-map density). PFM cannot do indexed queries / transactions / concurrent writes — don't make flat `.pfm` files the database.
- **PFM = data export & portability.** Decided scope: **a user can export their data as a `.pfm`** — their answers, journey, connections — checksummed, human-readable, portable, theirs.
  - **Brand fit (genuinely strategic):** every incumbent traps your data; Alongside hands it back in a verifiable container. "We don't own your connections — here's the file." On-thesis with *seen/known/heard* + anti-exploitation + no-bots (§10.7), and uncopyable by extract-everything competitors. Dogfoods the founder's own format.
- **(Optional later, same format):** completed First Five → a `.pfm` record (chain = rounds, content = result, checksum = tamper-evidence); feeds "we met" provenance + the no-bots proof-of-real story. Not Phase 1.
- **Guardrail:** §0a "build what I love" makes it tempting to use PFM everywhere because it's yours — resist. PFM where provenance/portability/readability earn it; Postgres where you need to *query*.

## 4d. Inference layer — `werbos` / `mmm` (local-only AI) — DECIDED, Phase 3
Founder's own local-first AI (`~/Documents/Companies/werbosLLM/werbos`; `mmm` = forest of tiny specialists + conductor). **Open-weight, local via Ollama/MLX — makes NO hosted-LLM call, ever.**
- **Use it for the small tasks** (all "tiny specialist" shaped, not frontier-shaped):
  - **Depth-signal inference** — read depth-tolerance from First Five *behaviour* (§10.4), not self-report.
  - **Overlap + complementarity detection** (Mechanic E) — shared book / "she sings, he plays guitar."
  - **Coarse recommender** (Mechanic C) — reduce noise, put plausible people in the same room.
  - **Question routing** — which question surfaces next given the conversation's depth temperature.
  - **First-pass moderation** — flag abuse for human review (never auto-act on safety alone).
- **Why it's the right fit (technical + brand):** tasks are small/cheap/fast = local model territory; AND users' intimate disclosures get processed on **hardware the founder owns, never a third-party cloud** — the data-ownership story (PFM export) extended to the *intelligence* layer. No incumbent can claim this. Werbos's *"can only claim what it can verify / a thin oracle ABSTAINS"* discipline **IS** Mechanic C's "coarse filter, never an oracle."
- **Guardrails:** (1) **coarse filter, never the gate** — algorithm gets people to the table, the *activity* is the chemistry test; (2) **bias is NOT auto-solved by being local** (Mechanic D tension #1 / OkCupid skew) — match on values/lifestyle/depth, audit deliberately using werbos's inspectable graders; (3) **Phase 3, not Phase 1** — the shareable First Five needs zero matching; don't build the brain before the hook works.

**The full self-owned stack:** `partyparrot` (realtime) + `gatekeep` (auth) + `pfm` (data container/export) + `werbos`/`mmm` (local inference). Alongside is the capstone app on top of infrastructure the founder already owns end-to-end — a real moat (no vendor data leakage, cheap to run, fully his).

## 5. Build phases (ship each before starting the next)

**Phase 1 — The seedable hook (the only thing that matters first)**
- Installable PWA. No accounts yet (or anonymous/magic-link only).
- "Start a game" → generates a **shareable room link**.
- Two people open the link on two phones → play the 5 light rounds **live**, dot resolving together → match/pass → reveal.
- *This is the artifact you put in front of strangers.* Everything below waits.

**Phase 2 — Identity & persistence**
- Real auth (magic link / Apple / Google). Profiles. Private photo storage + the server-side reveal gate (§2).
- Save game history; the post-match "Connected" hub (already prototyped).

**Phase 3 — The served concierge**
- Matchmaking queue (Presence-based waiting pool → pair two waiting users).
- Daily served drip; connection cap (~3); deep rounds (learning-not-scoring); open chat unlock.

**Phase 4 — Later (only after density exists)**
- Wild map (venue check-in, k-anonymity floor — see §10.9). Singles-event tooling. Native apps.

---

## 6. Decisions only you can make (before I build)
1. **Web/PWA first, native later?** (Strongly recommended — seeding needs a tappable link. Confirm.)
2. **Supabase vs. roll-your-own?** (Recommended: Supabase, for solo speed. Alt: a Node/Postgres server you own — more control, more ops.)
3. **Next.js vs. SvelteKit** for the frontend? (Next.js = bigger ecosystem; Svelte = lighter/closer to your vanilla prototype.)
4. **Phase-1 accounts:** fully anonymous shareable-link games to start, or require sign-in from day one? (Anonymous = lowest friction for strangers; recommended for the hook.)

---

*Next action after these are settled: build Phase 1 — the live 2-player shareable First Five. That's the thing the whole seeding strategy points at.*
