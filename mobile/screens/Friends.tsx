import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { C, F } from '../theme';
import { BUBBLES, BUDDIES, Bubble } from '../data';

type Phase = 'list' | 'club' | 'start' | 'coord';
const KINDS = ['Hiking', 'Running', 'Climbing', 'Cooking', 'Cycling'];

export default function Friends() {
  const [phase, setPhase] = useState<Phase>('list');
  const [bubble, setBubble] = useState<Bubble>(BUBBLES[0]);
  const [kind, setKind] = useState('Hiking');

  // ---------- LIST ----------
  if (phase === 'list') {
    return (
      <ScrollView contentContainerStyle={s.pad}>
        <Text style={[s.brand, { color: C.sageInk }]}>FOR YOU · FRIENDS & CLUBS</Text>
        <Text style={s.h1}>Find your people.</Text>
        <Text style={[s.sub, { marginTop: 6, marginBottom: 16 }]}>
          Purely platonic. Real groups doing real things — drop into a bubble or find one good buddy.
        </Text>

        <Text style={s.label}>BUBBLES NEAR YOU</Text>
        {BUBBLES.map((b) => (
          <Pressable key={b.name} style={s.card} onPress={() => { setBubble(b); setPhase('club'); }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
              <Text style={s.cardTitle}>{b.name}</Text>
              <View style={s.count}><Text style={s.countText}>{b.n} in</Text></View>
            </View>
            <Text style={[s.sub, { marginBottom: 8 }]}>{b.blurb}</Text>
            <Text style={s.nextText}>● Next: {b.next}</Text>
          </Pressable>
        ))}

        <Text style={s.label}>ONE GOOD BUDDY</Text>
        {BUDDIES.map((b) => <Buddy key={b.name} name={b.name} blurb={b.blurb} />)}

        <Pressable style={[s.card, { borderStyle: 'dashed', alignItems: 'center' }]} onPress={() => setPhase('start')}>
          <Text style={{ fontFamily: F.serif, fontSize: 15, color: C.sageInk }}>＋ Start your own bubble</Text>
        </Pressable>
      </ScrollView>
    );
  }

  // ---------- CLUB DETAIL ----------
  if (phase === 'club') {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={s.clubHead}>
          <Pressable onPress={() => setPhase('list')} style={s.chBack}><Text style={{ color: C.white, fontSize: 16 }}>‹</Text></Pressable>
          <Text style={s.clubKind}>{bubble.kind.toUpperCase()}</Text>
          <Text style={s.clubName}>{bubble.name}</Text>
        </View>
        <View style={{ paddingHorizontal: 26 }}>
          <Text style={[s.sub, { marginVertical: 14 }]}>{bubble.long}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <View style={{ flexDirection: 'row' }}>
              {['#c9734f', '#6f7e54', '#caa86a'].map((c, i) => (
                <View key={i} style={[s.miniAv, { backgroundColor: c, marginLeft: i ? -10 : 0 }]} />
              ))}
              <View style={[s.miniAv, { backgroundColor: C.creamDeep, marginLeft: -10, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={{ fontSize: 9, color: C.inkSoft }}>+{bubble.n - 3}</Text>
              </View>
            </View>
            <Text style={[s.sub, { fontSize: 13 }]}>{bubble.n} members · led by {bubble.led}</Text>
          </View>
          <Text style={s.label}>UPCOMING</Text>
          {bubble.runs.map((r, i) => (
            <View key={i} style={s.eventRow}>
              <View style={s.when}><Text style={s.whenD}>{r[0]}</Text><Text style={s.whenT}>{r[1]}</Text></View>
              <View style={{ flex: 1 }}><Text style={s.eventTitle}>{r[2]}</Text><Text style={[s.sub, { fontSize: 12 }]}>{r[3]}</Text></View>
            </View>
          ))}
          <GreenBtn label="Join the bubble" onPress={() => setPhase('coord')} />
        </View>
      </ScrollView>
    );
  }

  // ---------- START A BUBBLE ----------
  if (phase === 'start') {
    return (
      <ScrollView contentContainerStyle={s.pad}>
        <Pressable onPress={() => setPhase('list')}><Text style={s.back}>‹</Text></Pressable>
        <Text style={s.h2}>Start a bubble.</Text>
        <Text style={[s.sub, { marginBottom: 16 }]}>Name the thing you want to do regularly. We’ll surface it to people nearby who want the same.</Text>
        <Text style={s.label}>WHAT IS IT</Text>
        <View style={s.field}><TextInput placeholder="Sunday Slow Hikes" placeholderTextColor="#c3b6a2" style={s.input} /></View>
        <Text style={s.label}>KIND OF THING</Text>
        <View style={s.pillWrap}>
          {KINDS.map((k) => {
            const on = k === kind;
            return (
              <Pressable key={k} onPress={() => setKind(k)} style={[s.pill, on && { backgroundColor: C.sageInk, borderColor: C.sageInk }]}>
                <Text style={[s.pillText, on && { color: C.white }]}>{k}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={{ flexDirection: 'row', gap: 11, marginTop: 6 }}>
          <View style={{ flex: 1 }}><Text style={s.label}>HOW OFTEN</Text><View style={s.field}><TextInput placeholder="Weekly" placeholderTextColor="#c3b6a2" style={s.input} /></View></View>
          <View style={{ flex: 1 }}><Text style={s.label}>WHERE</Text><View style={s.field}><TextInput placeholder="Forest Park" placeholderTextColor="#c3b6a2" style={s.input} /></View></View>
        </View>
        <GreenBtn label="Create the bubble" onPress={() => setPhase('list')} />
      </ScrollView>
    );
  }

  // ---------- COORDINATION ----------
  return (
    <ScrollView contentContainerStyle={s.pad}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 14 }}>
        <Pressable onPress={() => setPhase('club')}><Text style={s.back}>‹</Text></Pressable>
        <View style={[s.miniAv, { width: 38, height: 38, borderRadius: 19, backgroundColor: C.sageInk, alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={{ fontFamily: F.serif, fontSize: 13, color: C.white }}>DP</Text>
        </View>
        <View><Text style={s.cardTitle}>{bubble.name}</Text><Text style={[s.sub, { fontSize: 12 }]}>{bubble.n} members · 5 here now</Text></View>
      </View>

      <View style={[s.card, { marginBottom: 8 }]}>
        <Text style={[s.label, { marginTop: 0, color: C.sageInk }]}>NEXT RUN · VOTE TO LOCK IT</Text>
        <Text style={[s.cardTitle, { fontSize: 18, marginBottom: 2 }]}>Saturday riverside 8k</Text>
        <Text style={[s.sub, { fontSize: 12.5, marginBottom: 12 }]}>Eastbank Esplanade · meet at the bridge</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <VoteBtn />
          <View style={s.cant}><Text style={{ fontFamily: F.sansMed, color: C.inkSoft }}>Can’t</Text></View>
        </View>
      </View>

      <Text style={[s.sub, { fontSize: 11, marginTop: 6, marginBottom: 3 }]}>Renee</Text>
      <View style={s.msgThem}><Text style={s.msgText}>bridge meetup at 6:55, we roll out at 7 sharp. coffee at Either/Or after for anyone free ☕</Text></View>
      <Text style={[s.sub, { fontSize: 11, marginTop: 8, marginBottom: 3 }]}>Marcus</Text>
      <View style={s.msgThem}><Text style={s.msgText}>in. bringing a friend who’s new to town, hope that’s ok</Text></View>
      <View style={s.msgMine}><Text style={[s.msgText, { color: C.white }]}>always! the more the better — see you at the bridge</Text></View>
    </ScrollView>
  );
}

function Buddy({ name, blurb }: { name: string; blurb: string }) {
  const [waved, setWaved] = useState(false);
  return (
    <View style={s.buddy}>
      <View style={s.buddyAv} />
      <View style={{ flex: 1 }}><Text style={[s.cardTitle, { fontSize: 15 }]}>{name}</Text><Text style={[s.sub, { fontSize: 12.5 }]}>{blurb}</Text></View>
      <Pressable style={[s.wave, waved && { opacity: 0.55 }]} onPress={() => setWaved(true)}>
        <Text style={s.waveText}>{waved ? 'Waved 👋' : 'Wave'}</Text>
      </Pressable>
    </View>
  );
}
function VoteBtn() {
  const [n, setN] = useState(11);
  const [inIt, setInIt] = useState(false);
  return (
    <Pressable style={[s.voteBtn]} onPress={() => { if (!inIt) { setN(12); setInIt(true); } }}>
      <Text style={s.voteText}>{inIt ? `You’re in (${n}) ✓` : `I’m in (${n})`}</Text>
    </Pressable>
  );
}
function GreenBtn({ label, onPress }: { label: string; onPress: () => void }) {
  return <Pressable style={s.greenBtn} onPress={onPress}><Text style={s.greenBtnText}>{label}</Text></Pressable>;
}

const s = StyleSheet.create({
  pad: { paddingHorizontal: 26, paddingTop: 14, paddingBottom: 28 },
  brand: { fontFamily: F.sansSemi, letterSpacing: 2, fontSize: 12, color: C.terraDeep },
  h1: { fontFamily: F.serif, fontSize: 30, color: C.ink, marginTop: 6 },
  h2: { fontFamily: F.serif, fontSize: 22, color: C.ink, marginVertical: 8 },
  sub: { fontFamily: F.sans, fontSize: 13.5, color: C.inkSoft, lineHeight: 19 },
  back: { fontSize: 26, color: C.inkSoft, marginBottom: 6 },
  label: { fontFamily: F.sansSemi, fontSize: 11, letterSpacing: 2, color: C.inkSoft, marginTop: 18, marginBottom: 9 },
  card: { backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 16, marginBottom: 10 },
  cardTitle: { fontFamily: F.serif, fontSize: 18, color: C.ink },
  count: { backgroundColor: C.sage, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 9 },
  countText: { fontFamily: F.sansSemi, fontSize: 11, color: C.sageInk },
  nextText: { fontFamily: F.sans, fontSize: 12.5, color: C.sageInk },
  buddy: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 13, marginBottom: 10 },
  buddyAv: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#9aa882' },
  wave: { backgroundColor: C.sage, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 17 },
  waveText: { fontFamily: F.sansSemi, fontSize: 13, color: C.sageInk },
  clubHead: { backgroundColor: '#6f7e54', paddingTop: 52, paddingHorizontal: 24, paddingBottom: 20 },
  chBack: { position: 'absolute', top: 12, left: 16, width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  clubKind: { fontFamily: F.sansSemi, fontSize: 11, letterSpacing: 2, color: 'rgba(255,255,255,0.85)', marginBottom: 4 },
  clubName: { fontFamily: F.serif, fontSize: 26, color: C.white },
  miniAv: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: C.paper },
  eventRow: { flexDirection: 'row', gap: 13, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 12, marginBottom: 9 },
  when: { width: 40, alignItems: 'center' },
  whenD: { fontFamily: F.sansSemi, fontSize: 10, letterSpacing: 1, color: C.sageInk },
  whenT: { fontFamily: F.serif, fontSize: 17, color: C.sageInk },
  eventTitle: { fontFamily: F.serif, fontSize: 15, color: C.ink },
  field: { backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 13, marginBottom: 4 },
  input: { fontFamily: F.serifReg, fontSize: 18, color: C.ink, padding: 0 },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14 },
  pillText: { fontFamily: F.serifReg, fontSize: 13, color: C.ink },
  greenBtn: { backgroundColor: C.sageInk, borderRadius: 18, padding: 16, alignItems: 'center', marginTop: 16 },
  greenBtnText: { fontFamily: F.sansSemi, fontSize: 16, color: C.white },
  voteBtn: { flex: 2, backgroundColor: C.sageInk, borderRadius: 12, padding: 12, alignItems: 'center' },
  voteText: { fontFamily: F.sansSemi, fontSize: 14, color: C.white },
  cant: { flex: 1, backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 12, alignItems: 'center' },
  msgThem: { alignSelf: 'flex-start', maxWidth: '82%', backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 12, marginBottom: 4 },
  msgMine: { alignSelf: 'flex-end', maxWidth: '82%', backgroundColor: C.sageInk, borderRadius: 16, padding: 12, marginTop: 6 },
  msgText: { fontFamily: F.serifReg, fontSize: 14, color: C.ink, lineHeight: 19 },
});
