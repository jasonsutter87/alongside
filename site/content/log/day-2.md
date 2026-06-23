---
title: "An airport, no sleep, and a real app in my hand"
description: "Day 2: the site went live in the morning, then I built the native app at an airport gate — and two APKs landed on my phone."
date: 2026-06-23
day: 2
---

Short night — in bed by eleven, up at four. Not a lot of sleep, but a real bed and a few hours, which after Day 1 felt like plenty. I got the morning going early, and the real work of the day didn't start until I was sitting at an airport gate around eleven.

So this is two stretches in one entry: the morning, and the airport.

## The morning: making it public

First thing, I stood up the front door — a marketing site and this dev blog, on a Hugo template I already had. The site you're reading now. Home page, the build log, and a `/demo` that embeds the actual prototype so anyone can click through the whole thing.

I want to be honest about *why* the blog exists, because it's not vanity. The hardest problem this whole project has isn't the design — it's the **first fifty people**. A connection app with nobody in it is just a nice-looking empty room. Building in public is one of the few ways someone with no network grows one: people follow the build, and the people who follow the build become the first users. The blog isn't a diary. It's the front of the funnel.

One small structural thing I'm weirdly happy about: the whole project is now one repo, one deploy. The marketing site, the blog, and the playable demo all ship together; the app folds in as a sub-path. Push, and it's live.

## The airport: starting the real thing

Then I was at the airport with three hours to kill, and I decided to stop polishing prototypes and start building the *real* app. Android APK only, for now.

I figured I'd use Flutter. I let the machine talk me out of it, and it was right: Flutter wasn't even installed, and downloading a gigabyte of SDK on airport wifi is a great way to burn three hours and ship nothing. Meanwhile my whole stack is already JavaScript — the realtime server, the auth server, the prototype itself. So: **Expo / React Native.** One language, reuse everything, and — the part that actually mattered at a gate — it can build the APK in the cloud and preview on my phone without a heavy local toolchain.

And then I just… built it. At a gate, around eleven, with a coffee and a boarding group I was ignoring.

The hardest single thing to port was the one that makes the whole app: the face that comes into focus as you play. On the web it's a CSS blur. There's no such thing in React Native, so it's a blur layer whose intensity recedes round by round, plus a warm veil that fades — same "oh, there you are" beat, different machinery. Got that working, and then it was just momentum: the onboarding wizard, the served matches, a real tab bar, the profile, settings, the safety screen, and the live map — disclaimer first, because there the safety design *is* the product.

By the end of the session the native app covered most of the experience, front to back. Not a mockup. A real app, in the real runtime, that I could hold.

## The APK saga

I wanted an actual installable `.apk` in my hand, dropped into a folder that syncs to my phone. The cloud build queue, on the free tier, was jammed — thirty minutes and it hadn't even *started.* So I pivoted to a local build instead: generate the native project, run Gradle, five minutes, done.

Two APKs landed in the sync folder almost together — the local one (the full app I'd just built) and the cloud one (an earlier snapshot that finally cleared the queue). I installed it. The thing runs, native, in my hand, at an airport.

From `flutter (MISSING)` to a real app on my phone in one afternoon.

## Where this leaves me

I want to keep the honesty rule from Day 1, so: it's still scripted. Single-player. No backend, no real second human, no verification yet — and that last one is the load-bearing gap, because "no bots, every person is real" is a promise with nothing enforcing it. Those are the next sessions.

But the foundation is real and it's in my pocket now: the palette, the fonts, the reveal mechanic, the whole front-to-back flow, and a build pipeline that turns a commit into an app on my phone. The web prototype is the *map* of the whole thing. The native app is the *real build*, started at the most important screen and grown outward in a single sitting.

Day 1 I answered a movie. Day 2 I put the answer in my pocket.
