// The First Five Minutes — round content. Echoes are honest:
// `agree` shows only if you pick the same side as your partner, `dis` otherwise.
// NAME is replaced with the partner's name at render time.

export type Round = {
  q: string;
  a: string;
  b: string;
  her: 'a' | 'b';
  echo: { agree: string; dis: string };
};

export const PARTNER = {
  name: 'Maya',
  photo: 'https://randomuser.me/api/portraits/women/22.jpg',
  reason:
    'You both flagged Tomorrow, and Tomorrow, and Tomorrow — and you’re both marathon-training this spring.',
};

// the served queue — blind until you play; cards lead with the REASON, never the face.
export const MATCHES = [
  { name: 'Maya', reason: 'You both flagged Tomorrow, and Tomorrow, and Tomorrow — and you’re both marathon-training this spring.' },
  { name: 'Priya', reason: 'You both quit the city for a year and came back. Different reasons. Same itch.' },
  { name: 'Robin', reason: 'She plays cello; you said you’ve always wanted to learn an instrument. A jigsaw fit.' },
  { name: 'Sloane', reason: 'You’re both going to Oaxaca next spring — three weeks apart.' },
  { name: 'Wren', reason: 'Both of you cook when you’re stressed. Neither of you follows the recipe.' },
  { name: 'Noa', reason: 'You both chose “get pleasantly, completely lost” before you ever met.' },
];

// ---- friends & clubs (the green world) ----
export type Bubble = {
  name: string; kind: string; n: number; led: string;
  blurb: string; next: string; long: string; runs: [string, string, string, string][];
};
export const BUBBLES: Bubble[] = [
  {
    name: 'Dawn Patrol Runners', kind: 'Running bubble · Portland', n: 24, led: 'Renee',
    blurb: 'Easy 5–8k, three mornings a week. No-drop, all paces welcome.',
    next: 'Sat 7am · Eastbank Esplanade',
    long: 'Three mornings a week we meet before work and run an easy 5–8k along the river. No-drop, all paces, coffee after for whoever’s not rushing off.',
    runs: [['SAT', '7a', 'Riverside long run', 'Eastbank Esplanade · 8k easy · 11 going'], ['TUE', '6a', 'Hill repeats (optional)', 'Mt Tabor · bring water · 6 going']],
  },
  {
    name: 'Tuesday Pickup Frisbee', kind: 'Ultimate bubble · Portland', n: 17, led: 'Marcus',
    blurb: 'Casual ultimate, every level. We keep the score loose and the vibe looser.',
    next: 'Tue 6pm · Irving Park',
    long: 'Every Tuesday, casual ultimate at Irving Park. Every level welcome — we keep score loosely and the vibe looser. Stick around for tacos after.',
    runs: [['TUE', '6p', 'Pickup game', 'Irving Park · all levels · 14 going']],
  },
];
export const BUDDIES = [
  { name: 'Jordan, 35', blurb: 'Training for the same half-marathon. Wants a long-run partner.' },
  { name: 'Sam, 38', blurb: 'At the bouldering gym twice a week. Looking for a regular climbing partner.' },
];

// ---- deeper questions (post-match): LEARNING who she is, not scoring compatibility ----
export type Deep = {
  tag: string; q: string; lo: string; hi: string; her: number;
  herInsight: string; levels: string[];
};
export const DEEP: Deep[] = [
  {
    tag: 'Going deeper · 1',
    q: 'When you and someone close land on opposite sides of a moral or political line — how do you want to move through it?',
    lo: 'Open to difference', hi: 'Need alignment', her: 3,
    herInsight: "Maya can sit with disagreement — but only where she feels respected. Push without that, and she’ll close the door.",
    levels: [
      'We can talk about anything — difference is genuinely interesting to me.',
      'I love a good debate. Disagreeing well brings me closer.',
      'I can hold space for it, as long as there’s real respect.',
      'Some topics I’d rather we tread lightly around.',
      'I’d honestly rather those conversations didn’t come up.',
      'I’d only feel at home with someone who feels what I feel.',
    ],
  },
  {
    tag: 'Going deeper · 2',
    q: 'When things get hard between two people, what do you reach for first?',
    lo: 'Talk it out now', hi: 'Need space first', her: 2,
    herInsight: "Maya wants to mend things early and calmly — she won’t let a rift set. Silence reads to her as the problem getting worse.",
    levels: [
      'Talk it out immediately — I can’t rest until we’re okay.',
      'Address it soon, calmly, before it sets.',
      'A short pause, then we talk.',
      'I need real space before I can say anything useful.',
      'I retreat for a while; pushing makes it worse.',
      'I go quiet and sort it out on my own.',
    ],
  },
];

// chat starters — pulled from the game, so nobody ever faces an empty box.
export const STARTERS = [
  { chip: 'Defend round 3 📚', say: 'Okay, defend it — rereading the same ten books forever. Go.' },
  { chip: 'The Oaxaca overlap ✈️', say: 'Wait — you’re going to Oaxaca too? When? We’re three weeks apart.' },
  { chip: 'Your unhinged round-2 answer', say: 'I need you to explain your round-2 answer because it was unhinged and I respect it.' },
  { chip: 'First pancake solidarity 🥞', say: 'First-pancake people unite. Perfectionists are exhausting.' },
];

export const ROUNDS: Round[] = [
  {
    q: 'A night that drifts till 2am, or home by ten?',
    a: 'A night that drifts till 2am at a diner',
    b: 'Home by ten with tea and a good book',
    her: 'b',
    echo: {
      agree: 'You both picked the quiet night in. A pair of homebodies — dangerous.',
      dis: 'You said the 2am diner; NAME picked the book. Someone has to drag the other out.',
    },
  },
  {
    q: 'Know every road, or get lost?',
    a: 'Know every road on the map',
    b: 'Get pleasantly, completely lost',
    her: 'b',
    echo: {
      agree: 'You both chose lost. Suspicious.',
      dis: 'You’d keep the map; NAME wants to get lost. Opposites — could be fun.',
    },
  },
  {
    q: 'The same ten books, or only new ones?',
    a: 'Reread the same ten books forever',
    b: 'Only new books — some you’ll hate',
    her: 'a',
    echo: {
      agree: 'You both reread the same ten books. Comfort people.',
      dis: 'Split — you chase new, NAME rereads. This’ll be a good argument.',
    },
  },
  {
    q: 'Sing badly and loud, or hum to yourself?',
    a: 'Sing badly and loudly',
    b: 'Hum perfectly, to yourself',
    her: 'a',
    echo: {
      agree: 'You both sing badly and loudly. The neighbours are doomed.',
      dis: 'You hum to yourself; NAME belts it out. She said she’d harmonise anyway.',
    },
  },
  {
    q: 'First pancake, or wait for the perfect one?',
    a: 'The first pancake, slightly wrong',
    b: 'Wait for the perfect one',
    her: 'a',
    echo: {
      agree: 'You both took the first pancake. Basically a personality match.',
      dis: 'You’d wait for the perfect pancake; NAME grabs the first. Patience vs. go.',
    },
  },
];
