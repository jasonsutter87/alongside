import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { C, F } from '../theme';
import { DEEP, PARTNER } from '../data';

export default function Deepen({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const d = DEEP[idx];
  const last = idx === DEEP.length - 1;

  function next() {
    if (last) { onDone(); return; }
    setIdx(idx + 1); setPicked(null);
  }

  // ---------- RESULT ----------
  if (picked != null) {
    const gap = Math.abs(picked - d.her);
    const together =
      gap === 0 ? 'You move the same way here. Easy — just watch the blind spot you’d share.'
      : gap <= 1 ? 'Slightly different tempos. The kind of gap a little patience closes.'
      : picked < d.her ? 'You’d lean in; she’d want room. Not a clash — a rhythm you’d learn.'
      : 'She’d lean in; you’d want room. Knowing it now is the whole point.';
    return (
      <SafeAreaView style={s.fill}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={s.pad}>
          <Text style={s.tag}>{d.tag.toUpperCase()}</Text>
          <View style={s.why}><Text style={s.whyText}>{d.q}</Text></View>

          <View style={s.meter}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <View key={n} style={[s.seg,
                n === picked && n === d.her ? { backgroundColor: C.sageInk }
                : n === picked ? { backgroundColor: C.terra }
                : n === d.her ? { backgroundColor: C.sageInk } : null]} />
            ))}
          </View>
          <View style={s.legend}>
            <Text style={s.legendItem}><Text style={{ color: C.terra }}>●</Text> You · {picked}</Text>
            <Text style={s.legendItem}><Text style={{ color: C.sageInk }}>●</Text> {PARTNER.name} · {d.her}</Text>
          </View>

          <Text style={[s.label, { marginTop: 20 }]}>WHAT YOU LEARNED ABOUT HER</Text>
          <Text style={s.body}>{d.herInsight}</Text>
          <Text style={s.label}>HOW YOU’D MEET IT</Text>
          <Text style={s.body}>{together}</Text>

          <Pressable style={s.btn} onPress={next}><Text style={s.btnText}>{last ? `Back to ${PARTNER.name}` : 'Next question'}</Text></Pressable>
          <Pressable style={s.ghost} onPress={onDone}><Text style={s.ghostText}>Pause here</Text></Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ---------- QUESTION ----------
  return (
    <SafeAreaView style={s.fill}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={s.pad}>
        <View style={s.partner}>
          <View style={s.dot} />
          <Text style={[s.body, { flex: 1, fontSize: 12.5 }]}>
            Going deeper with <Text style={{ fontFamily: F.sansSemi, color: C.ink }}>{PARTNER.name}</Text>.
            No wrong answers — just where you each stand.
          </Text>
        </View>
        <Text style={s.tag}>{d.tag.toUpperCase()}</Text>
        <Text style={s.prompt}>{d.q}</Text>
        <View style={s.poles}><Text style={s.pole}>{d.lo.toUpperCase()}</Text><Text style={s.pole}>{d.hi.toUpperCase()}</Text></View>
        {d.levels.map((t, i) => (
          <Pressable key={i} style={s.lvl} onPress={() => setPicked(i + 1)}>
            <View style={s.num}><Text style={s.numText}>{i + 1}</Text></View>
            <Text style={s.lvlText}>{t}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.paper },
  pad: { paddingHorizontal: 26, paddingTop: 12, paddingBottom: 28 },
  partner: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 12, marginBottom: 16 },
  dot: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e0c79c' },
  tag: { fontFamily: F.sansSemi, fontSize: 11.5, letterSpacing: 2, color: C.terraDeep },
  prompt: { fontFamily: F.serifItalic, fontSize: 18, color: C.terraDeep, marginTop: 8, marginBottom: 14, lineHeight: 25 },
  poles: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  pole: { fontFamily: F.sans, fontSize: 11, letterSpacing: 1, color: C.inkSoft },
  lvl: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: 'rgba(255,255,255,0.42)', borderWidth: 1.5, borderColor: C.line, borderRadius: 15, padding: 13, marginBottom: 8 },
  num: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.cream, borderWidth: 1, borderColor: C.line, alignItems: 'center', justifyContent: 'center' },
  numText: { fontFamily: F.serif, fontSize: 15, color: C.inkSoft },
  lvlText: { fontFamily: F.serifReg, fontSize: 15, color: C.ink, flex: 1, lineHeight: 20 },
  why: { backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 14, marginTop: 10, marginBottom: 16 },
  whyText: { fontFamily: F.serifItalic, fontSize: 14.5, color: C.ink, lineHeight: 20 },
  meter: { flexDirection: 'row', gap: 5, justifyContent: 'center', marginBottom: 8 },
  seg: { width: 38, height: 8, borderRadius: 5, backgroundColor: C.line },
  legend: { flexDirection: 'row', gap: 18, justifyContent: 'center' },
  legendItem: { fontFamily: F.sans, fontSize: 12, color: C.inkSoft },
  label: { fontFamily: F.sansSemi, fontSize: 11, letterSpacing: 1.5, color: C.inkSoft, marginTop: 16, marginBottom: 6 },
  body: { fontFamily: F.sans, fontSize: 14, color: C.inkSoft, lineHeight: 20 },
  btn: { borderRadius: 18, padding: 16, alignItems: 'center', backgroundColor: C.terra, marginTop: 22 },
  btnText: { fontFamily: F.sansSemi, fontSize: 16, color: C.white },
  ghost: { padding: 14, alignItems: 'center' },
  ghostText: { fontFamily: F.sansMed, fontSize: 15, color: C.inkSoft },
});
