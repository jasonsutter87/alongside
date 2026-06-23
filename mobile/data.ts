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
