import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { C, F } from '../theme';

function Toggle({ on, onPress }: { on: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[s.toggle, !on && s.toggleOff]}>
      <View style={[s.knob, !on && { left: 3 }, on && { right: 3 }]} />
    </Pressable>
  );
}

export default function Safety({ onBack }: { onBack: () => void }) {
  const [area, setArea] = useState(true);
  const [dist, setDist] = useState(true);
  const [hidden, setHidden] = useState(false);

  return (
    <ScrollView contentContainerStyle={s.pad}>
      <Pressable onPress={onBack}><Text style={s.back}>‹ Settings</Text></Pressable>
      <Text style={s.brand}>SAFETY & PRIVACY</Text>
      <Text style={s.h1}>You’re in control.{'\n'}Always.</Text>

      <View style={s.panic}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 10 }}>
          <Text style={{ fontSize: 20 }}>🚫</Text>
          <View><Text style={s.panicTitle}>Panic hide</Text><Text style={s.sub}>One tap and you vanish from the app entirely.</Text></View>
        </View>
        <Pressable style={s.panicBtn} onPress={() => setHidden(true)}>
          <Text style={s.panicBtnText}>{hidden ? 'You’re hidden. Welcome back anytime.' : 'Hide me now'}</Text>
        </Pressable>
      </View>

      <View style={s.row}>
        <View style={{ flex: 1 }}><Text style={s.rowTitle}>Share approximate area</Text><Text style={s.sub}>Powers the heat map. Neighborhood-level, never precise.</Text></View>
        <Toggle on={area} onPress={() => setArea((v) => !v)} />
      </View>
      <View style={s.row}>
        <View style={{ flex: 1 }}><Text style={s.rowTitle}>Hide my exact distance</Text><Text style={s.sub}>Show “nearby” instead of a number.</Text></View>
        <Toggle on={dist} onPress={() => setDist((v) => !v)} />
      </View>

      <Pressable style={s.linkRow}><Text style={s.linkIcon}>🚷</Text><Text style={s.linkText}>Block someone — they’ll never know, and never see you again</Text></Pressable>
      <Pressable style={s.linkRow}><Text style={s.linkIcon}>🚩</Text><Text style={s.linkText}>Report a problem — a real person reviews every report</Text></Pressable>

      <Text style={s.fine}>We’ll never sell your location or show you to anyone you’ve blocked.</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  pad: { paddingHorizontal: 26, paddingTop: 14, paddingBottom: 30 },
  back: { fontFamily: F.sans, fontSize: 14, color: C.inkSoft, marginBottom: 12 },
  brand: { fontFamily: F.sansSemi, letterSpacing: 2, fontSize: 12, color: C.terraDeep },
  h1: { fontFamily: F.serif, fontSize: 28, color: C.ink, lineHeight: 33, marginTop: 6, marginBottom: 16 },
  sub: { fontFamily: F.sans, fontSize: 12.5, color: C.inkSoft, lineHeight: 18 },
  fine: { fontFamily: F.sans, fontSize: 12, color: C.inkSoft, marginTop: 12, lineHeight: 18 },
  panic: { backgroundColor: C.rose, borderWidth: 1, borderColor: '#e3b0a6', borderRadius: 16, padding: 16, marginBottom: 14 },
  panicTitle: { fontFamily: F.serif, fontSize: 16, color: C.ink },
  panicBtn: { backgroundColor: '#d9534f', borderRadius: 14, padding: 15, alignItems: 'center' },
  panicBtnText: { fontFamily: F.sansSemi, fontSize: 15, color: C.white },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 15, marginBottom: 9 },
  rowTitle: { fontFamily: F.serif, fontSize: 15, color: C.ink, marginBottom: 2 },
  toggle: { width: 46, height: 28, borderRadius: 14, backgroundColor: C.sageInk, justifyContent: 'center' },
  toggleOff: { backgroundColor: C.line },
  knob: { position: 'absolute', width: 22, height: 22, borderRadius: 11, backgroundColor: C.white },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.55)', borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 15, marginBottom: 9 },
  linkIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  linkText: { fontFamily: F.serif, fontSize: 14, color: C.ink, flex: 1, lineHeight: 19 },
});
