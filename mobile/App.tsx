import React, { useState } from 'react';
import {
  View, Text, Image, Pressable, StyleSheet, SafeAreaView, ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import {
  useFonts,
  Fraunces_400Regular, Fraunces_500Medium, Fraunces_400Regular_Italic,
} from '@expo-google-fonts/fraunces';
import {
  Inter_400Regular, Inter_500Medium, Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { C, F } from './theme';
import { ROUNDS, PARTNER } from './data';

type Screen = 'welcome' | 'game' | 'decision' | 'reveal' | 'nomatch';

// ---- the resolving dot: gold veil + blur that recede as `resolve` (0..1) rises ----
function Dot({ size, resolve }: { size: number; resolve: number }) {
  const veilOpacity = Math.max(0, 1 - resolve);
  const blur = Math.round((1 - resolve) * 90);
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden',
      backgroundColor: '#caa86a' }}>
      <Image source={{ uri: PARTNER.photo }} style={{ width: size, height: size }} />
      {blur > 1 && (
        <BlurView intensity={blur} tint="light" style={StyleSheet.absoluteFill} />
      )}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#caa86a', opacity: veilOpacity }]} />
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_400Regular, Fraunces_500Medium, Fraunces_400Regular_Italic,
    Inter_400Regular, Inter_500Medium, Inter_600SemiBold,
  });

  const [screen, setScreen] = useState<Screen>('welcome');
  const [round, setRound] = useState(0);
  const [echo, setEcho] = useState('');
  const [locked, setLocked] = useState(false);

  if (!fontsLoaded) {
    return <View style={[s.fill, s.center]}><ActivityIndicator color={C.terra} /></View>;
  }

  const resolveForRound = (r: number) => Math.min(0.85, r * 0.17);

  function startGame() {
    setRound(0); setEcho(''); setLocked(false); setScreen('game');
  }

  function pick(side: 'a' | 'b') {
    if (locked) return;
    setLocked(true);
    const r = ROUNDS[round];
    setEcho((side === r.her ? r.echo.agree : r.echo.dis).replace('NAME', PARTNER.name));
    setTimeout(() => {
      if (round + 1 < ROUNDS.length) {
        setRound(round + 1); setEcho(''); setLocked(false);
      } else {
        setScreen('decision');
      }
    }, 1600);
  }

  if (screen === 'welcome') {
    return (
      <SafeAreaView style={s.fill}>
        <StatusBar style="dark" />
        <View style={[s.pad, s.center, { flex: 1 }]}>
          <Text style={s.brand}>ALONGSIDE</Text>
          <Text style={[s.h1, { textAlign: 'center', marginTop: 18 }]}>
            Connection isn’t{'\n'}something you{'\n'}swipe for.
          </Text>
          <Text style={[s.sub, { textAlign: 'center', marginTop: 14, maxWidth: 290 }]}>
            It’s something you make — shoulder to shoulder, doing a thing together.
            Nobody has to carry the conversation alone.
          </Text>
        </View>
        <View style={s.pad}>
          <Btn label="Come in" onPress={startGame} />
          <Text style={[s.cap, { textAlign: 'center', marginTop: 12 }]}>Seen · known · heard</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'game') {
    const r = ROUNDS[round];
    return (
      <SafeAreaView style={s.fill}>
        <StatusBar style="dark" />
        <View style={[s.pad, { flex: 1 }]}>
          <View style={s.partner}>
            <Dot size={46} resolve={resolveForRound(round)} />
            <Text style={[s.cap, { flex: 1, marginLeft: 12 }]}>
              A quick taste with <Text style={{ fontFamily: F.sansSemi, color: C.ink }}>{PARTNER.name}</Text>.
              You’re getting to know each other by playing — not interviewing.
            </Text>
          </View>

          <View style={s.rowTop}>
            <Text style={s.roundLabel}>ROUND {round + 1} OF {ROUNDS.length}</Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {ROUNDS.map((_, i) => (
                <View key={i} style={[s.pip, i <= round && { backgroundColor: C.terra }]} />
              ))}
            </View>
          </View>

          <Text style={s.prompt}>{r.q}</Text>

          <Pressable style={[s.opt, { backgroundColor: C.rose }]} onPress={() => pick('a')}>
            <Text style={s.optText}>{r.a}</Text>
          </Pressable>
          <View style={s.orWrap}><Text style={s.orText}>or</Text></View>
          <Pressable style={[s.opt, { backgroundColor: C.sage }]} onPress={() => pick('b')}>
            <Text style={s.optText}>{r.b}</Text>
          </Pressable>

          {!!echo && <Text style={s.echo}>{echo}</Text>}
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'decision') {
    return (
      <SafeAreaView style={s.fill}>
        <StatusBar style="dark" />
        <View style={[s.pad, s.center, { flex: 1 }]}>
          <Dot size={140} resolve={0.85} />
          <Text style={[s.heart, { marginTop: 14 }]}>5 ROUNDS IN</Text>
          <Text style={[s.h2, { marginTop: 4 }]}>So — that was {PARTNER.name}.</Text>
          <Text style={[s.sub, { textAlign: 'center', marginTop: 8, maxWidth: 280 }]}>
            You know how she argues, what makes her laugh, that she takes the first pancake.
            You almost know her face.
          </Text>
        </View>
        <View style={s.pad}>
          <Btn label={`Match with ${PARTNER.name}`} onPress={() => setScreen('reveal')} />
          <Btn label="Not this time" ghost onPress={() => setScreen('nomatch')} />
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'reveal') {
    return (
      <SafeAreaView style={s.fill}>
        <StatusBar style="dark" />
        <View style={[s.pad, s.center, { flex: 1 }]}>
          <Dot size={150} resolve={1} />
          <Text style={[s.heart, { marginTop: 14 }]}>IT’S A MATCH</Text>
          <Text style={[s.h1, { marginTop: 4 }]}>Hi, {PARTNER.name}.</Text>
          <Text style={[s.sub, { textAlign: 'center', marginTop: 8, maxWidth: 280 }]}>
            You earned the whole picture. Now go pull the thread you started — that pancake debate isn’t over.
          </Text>
        </View>
        <View style={s.pad}>
          <Btn label="Play again" onPress={startGame} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.fill}>
      <StatusBar style="dark" />
      <View style={[s.pad, s.center, { flex: 1 }]}>
        <View style={{ width: 140, height: 140, borderRadius: 70, backgroundColor: C.creamDeep,
          alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: F.serifItalic, color: C.inkSoft }}>— quietly closed</Text>
        </View>
        <Text style={[s.h2, { marginTop: 18 }]}>No hard feelings.</Text>
        <Text style={[s.sub, { textAlign: 'center', marginTop: 8, maxWidth: 280 }]}>
          {PARTNER.name} never sees a rejection — just that the round wrapped. The face stays unrevealed.
        </Text>
      </View>
      <View style={s.pad}>
        <Btn label="Meet someone new" onPress={startGame} />
      </View>
    </SafeAreaView>
  );
}

function Btn({ label, onPress, ghost }: { label: string; onPress: () => void; ghost?: boolean }) {
  return (
    <Pressable onPress={onPress}
      style={({ pressed }) => [s.btn, ghost ? s.btnGhost : s.btnPrimary, pressed && { opacity: 0.85 }]}>
      <Text style={[s.btnText, ghost && { color: C.inkSoft, fontFamily: F.sansMed }]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.paper },
  center: { alignItems: 'center', justifyContent: 'center' },
  pad: { paddingHorizontal: 26, paddingBottom: 10 },
  brand: { fontFamily: F.sansSemi, letterSpacing: 3, fontSize: 12, color: C.terraDeep },
  h1: { fontFamily: F.serif, fontSize: 32, color: C.ink, lineHeight: 36 },
  h2: { fontFamily: F.serif, fontSize: 23, color: C.ink },
  sub: { fontFamily: F.sans, fontSize: 14, color: C.inkSoft, lineHeight: 21 },
  cap: { fontFamily: F.sans, fontSize: 12.5, color: C.inkSoft, lineHeight: 18 },
  partner: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 12, marginTop: 6, marginBottom: 20 },
  rowTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34 },
  roundLabel: { fontFamily: F.sansSemi, letterSpacing: 2, fontSize: 11.5, color: C.terraDeep },
  pip: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.line },
  prompt: { fontFamily: F.serifItalic, fontSize: 22, color: C.terraDeep, textAlign: 'center', marginBottom: 26 },
  opt: { borderRadius: 20, padding: 22 },
  optText: { fontFamily: F.serifReg, fontSize: 19, color: C.ink, lineHeight: 25 },
  orWrap: { alignItems: 'center', marginVertical: 12 },
  orText: { fontFamily: F.serifItalic, fontSize: 14, color: C.inkSoft },
  echo: { fontFamily: F.serifItalic, fontSize: 14, color: C.inkSoft, textAlign: 'center', marginTop: 24 },
  heart: { fontFamily: F.sansSemi, letterSpacing: 2, fontSize: 12, color: C.terraDeep },
  btn: { borderRadius: 18, padding: 17, alignItems: 'center', marginTop: 10 },
  btnPrimary: { backgroundColor: C.terra },
  btnGhost: { backgroundColor: 'transparent' },
  btnText: { fontFamily: F.sansSemi, fontSize: 16, color: C.white },
});
