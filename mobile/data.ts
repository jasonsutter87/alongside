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
