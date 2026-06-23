---
title: "From a crisis to a dating app"
description: "I had a Friday that spiraled. By Sunday night it was a deployed product. Here's the honest version."
date: 2026-06-22
day: 1
---

I had a crisis last Friday. It sounds stupid to admit where it came from, so I'll just say it: it was the Bergens, from the DreamWorks *Trolls* movie.

If you don't know — the Bergens are good all year and they're miserable, and they only let themselves feel happy one day a year, and only by *consuming* a Troll. That's the whole joke. And it landed in me harder than a kids' movie has any right to. Because that's how I'd been living. Rationing it. Waiting for permission. Telling myself I'd be allowed to feel okay once some condition got met.

The condition, when I actually looked at it, was small and brutal: my birthday. The one day people might text me and prove they care. The rest of the year I was just guessing, and the guess always defaulted to the worst answer.

That's the crisis. Not very glamorous. But it spiraled, and the spiral didn't go anywhere dark — it went *philosophical*. I started seeing the Bergen thing everywhere. Especially in dating apps, which are the purest version of the disease: connection sold back to you as something you *consume*, rationed into likes, gamified into a grind, engineered so the festival day never quite arrives — because a satisfied user is a churned user.

So I did what I do when I can't sleep. I spent about seven hours brainstorming, and by the end I had the bones of an app. This log is me building it in public. No highlight reel.

## The one idea

Here's the whole thing in one sentence:

> Most apps treat connection as something you **consume** — judge a face in 0.3 seconds, swipe, hoard a roster, text forever, never meet. Alongside treats connection as something you **generate** by doing a thing together.

The North Star I wrote at the top of the design doc, the question every feature has to answer:

> *Does this make connection something you consume, or something you generate together?*

If a feature feels like eating a Troll, it's cut.

## What that actually looks like

A few mechanics fall out of it, and the one I care about most:

**You don't get dropped into an empty text box.** When two people match, the app doesn't say "good luck manufacturing chemistry from nothing." It drops you into a tiny, two-minute game — rapid-fire *would-you-rathers* — and who you are leaks out through how you play. The single best thing I figured out this whole weekend: **nobody has to carry the conversation, because the app is the host.** People will happily answer questions when they're not the one stuck running the interview.

**You earn the face.** No photos up front. Your match starts as a flat colored dot, and their photo slowly comes into focus *as you play* — never fully, until you both decide to match. The face is the reward for paying attention, not the ticket to entry. (This is the part everyone told me was risky. More on that in a second.)

**No bots. Ever.** The industry's dirty secret is that the rooms are padded with fakes to look busy. Mine won't be. If the pool's small, I'll tell you it's small — and that every person in it is real.

## I let a skeptic tear it apart. Twice.

The thing I'm weirdly proud of isn't the idea. It's that I didn't fall in love with it. I ran the whole thing past a brutal critic — twice — whose entire job was to find where it dies.

It found real things. The blind-photo mechanic has a *graveyard* behind it (S'More and that whole 2018 cohort). The critic's sharpest line: I'd picked the harder version on purpose and was telling myself it was the easier one. It was right. So I didn't shelve the idea — I welded it to the game instead of making it a scary separate gate, which kills the part that actually killed those apps.

And the thing it kept hammering, that I still haven't solved: **the bottleneck was never the first five minutes. It's the first fifty people.** No amount of beautiful design makes strangers show up. That's tomorrow's problem, and every-day-after-that's problem.

## The plot twist

Halfway through, I realized I'd already built most of the hard parts — months ago, for other reasons, without knowing they were for this.

A hand-rolled realtime server whose own docs literally list "Jackbox buzzer" as a use case. A passwordless auth server. A verifiable file format for letting people own and export their data. A local-first AI for the small matching tasks that never sends your most intimate answers to someone else's cloud.

I didn't start a company this weekend. I found out the infrastructure I'd been building alone, on nights and weekends, had been quietly pointing here the whole time.

## What shipped

By the end of the night there was a complete, clickable, deployed prototype — the whole loop, front to back. Onboarding, the served matches, the first-five game with the face coming into focus, the reveal, the deeper questions (framed as *learning who someone is*, not scoring them), a friends-and-clubs mode, and a "live" map for meeting in person that's built density-first, identity-never — because the safety design *is* the product there, especially for the person most at risk.

The critic looked at the actual built thing and called the core mechanic "the kind of thing you build a company around." Coming from something whose whole job was to talk me out of it, I'll take it.

## Where this leaves me

It's a cool app. It's also missing real things — verification to back up the no-bots promise, the "we met" moment, the whole question of how people come back without me becoming the slot machine I'm trying to replace. I can live with that list, because it's a *known* list.

And the business model is a tomorrow problem, on purpose. You can't price a thing nobody's used yet.

The next move isn't building. It's the unglamorous one: get five real humans to play the first five minutes and watch their faces. That's the only test that turns "cool" into "true."

But here's the part I keep coming back to. The whole app is made of the crisis. I walked in feeling unseen, and I spent the day building the exact antidote — *seen, known, heard.* Nobody has to carry the conversation. A face you earn by paying attention. The Bergens thought happiness was something you consume one day a year. I think I just spent a weekend answering the movie.

Day 1.
