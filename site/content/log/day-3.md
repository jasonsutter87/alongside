---
title: "The day the fakes started turning real"
description: "Day 3: I built the friends side, then spent the day replacing faked things with real ones — real location, real places, a real map, real memory. Everything except real people."
date: 2026-06-24
day: 3
---

Day 2 ended with a native app in my pocket that *looked* like the real thing. Day 3 was about making more of it actually be the real thing. One faked piece at a time.

It started, as it should, with holding it. You only find certain bugs with the thing in your hand: the buttons sat *under* the Android nav bar, so tapping them did nothing. Tall screens didn't scroll. Classic edge-to-edge stuff — the app was drawing under the system bars. Fixed it with proper safe-area insets, and suddenly the thing felt like a real Android app instead of a web page in a frame.

Then I built the part that was still missing: **friends and clubs.** The whole green world — find your people, bubbles near you, club detail, start your own, the coordination chat with a vote-to-lock on the next run. It flips on from a toggle in Settings, and Discover quietly becomes a different app. Same engine, different intent, never blurred. That separation isn't a feature; it's a promise.

## Replacing the fakes

Here's the part I'm happiest about. I went down the list of things that were faked and started making them real.

**Real location.** Wired up GPS. The app actually asks for permission now, gets your position, and reverse-geocodes it to a real area name. It only ever reads a coarse position — never stores the precise point — but it's *your* location, not a placeholder.

**Real memory.** This one came from a small realization: if a profile already exists, why am I asking "dating or friends" every single launch? You don't need a whole backend for that — just on-device storage. So now the app remembers you. Onboard once, close it, reopen, and you land straight in your corner. Sign out wipes it. Small thing. Makes it feel like an app you *have*, not a demo you *visit*.

**Real places.** The Live map's venue list used to be hardcoded ("Beals Point, the lake walkway"). Now it pulls actual public places near you — cafés, parks, trails — live from OpenStreetMap. No API key, no billing. (It 406'd at first because the request needed a User-Agent header. One of those bugs that's invisible until you read the raw response.)

**A real map.** And then the map itself. It was a stylized box of colored blobs. Now it's an actual OpenStreetMap street map, centered on where you are, with a soft circle for your *approximate* area — never an exact pin, on purpose. Still no API key; it's Leaflet and OSM tiles in a webview. Real streets, real location.

**Real depth.** Last thing of the day: I ported the deeper questions. After you match, you can go deeper — a few values questions on a 1–6 scale, but the result isn't a compatibility score. It's *"here's what you learned about her, and here's the rhythm you two would have to learn."* Difference framed as something to navigate, not a demerit. That framing is the whole point, and it survived the port.

Oh, and a bug a real session caught: once you matched, there was no way back to Discover. You were just… stuck with your match. Fixed.

## Where this leaves it

So the native app now has: onboarding that persists, a working dating loop with a real way out of it, friends and clubs, real GPS, real nearby places, a real map, and the deeper questions. Each of those used to be faked. Now they're not.

The honest line, same as every day: there's still one big thing faked, and it's the one that matters most. **The other people.** Maya, the matches, the chat replies, the warmth on the map — all scripted. Every real thing I added yesterday is real *for one person*. Making it real for *two* is the backend, and that's the next mountain. The biggest one.

But I'll take it. Day 1 I answered a movie. Day 2 I put the answer in my pocket. Day 3 I started making the pocket-thing tell the truth.
