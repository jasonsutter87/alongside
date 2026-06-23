import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { C, F } from '../theme';

type Props = {
  intent: 'dating' | 'friends';
  setIntent: (i: 'dating' | 'friends') => void;
  onOpenSafety: () => void;
  onSignOut: () => void;
};

export default function Settings({ intent, setIntent, onOpenSafety, onSignOut }: Props) {
  return (
    <ScrollView contentContainerStyle={s.pad}>
      <Text style={s.h1}>Settings</Text>

      <Text style={s.label}>WHAT YOU’RE HERE FOR</Text>
      <View style={s.seg}>
        <Pressable style={[s.segOpt, intent === 'dating' && s.segOn]} onPress={() => setIntent('dating')}>
          <Text style={[s.segText, intent === 'dating' && { color: C.white }]}>Dating</Text>
        </Pressable>
        <Pressable style={[s.segOpt, intent === 'friends' && s.segOn]} onPress={() => setIntent('friends')}>
          <Text style={[s.segText, intent === 'friends' && { color: C.white }]}>Friends & clubs</Text>
        </Pressable>
      </View>
      <Text style={s.fine}>Two separate worlds. We never mix who you meet for dating with who you meet for friends. Your Discover tab follows this.</Text>

      <Text style={s.label}>MEMBERSHIP</Text>
      <View style={s.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={s.cardTitle}>Inside the building</Text>
          <View style={s.tag}><Text style={s.tagText}>Active</Text></View>
        </View>
        <Text style={[s.sub, { marginBottom: 8 }]}>$14/mo · founding rate, locked in</Text>
        <Text style={s.cardBody}>We earn only when you leave for a real date — not when you scroll. Pause anytime; no win-back tricks.</Text>
      </View>

      <Text style={s.label}>PRIVACY & SAFETY</Text>
      <Pressable style={s.row} onPress={onOpenSafety}><Text style={s.rowIcon}>🛡️</Text><Text style={s.rowText}>Safety & location controls</Text><Text style={s.chev}>›</Text></Pressable>
      <Pressable style={s.row}><Text style={s.rowIcon}>🗺️</Text><Text style={s.rowText}>Live & heat map</Text><Text style={s.chev}>›</Text></Pressable>
      <Pressable style={s.row}><Text style={s.rowIcon}>🔔</Text><Text style={s.rowText}>Notifications</Text><Text style={s.chev}>›</Text></Pressable>

      <Text style={s.label}>YOUR DATA IS YOURS</Text>
      <Pressable style={s.row}><Text style={s.rowIcon}>📦</Text><Text style={s.rowText}>Export everything (.pfm)</Text><Text style={s.chev}>›</Text></Pressable>

      <Pressable style={{ marginTop: 14, padding: 14, alignItems: 'center' }} onPress={onSignOut}>
        <Text style={{ fontFamily: F.sansMed, fontSize: 15, color: C.inkSoft }}>Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  pad: { paddingHorizontal: 26, paddingTop: 14, paddingBottom: 24 },
  h1: { fontFamily: F.serif, fontSize: 30, color: C.ink, marginBottom: 16 },
  label: { fontFamily: F.sansSemi, fontSize: 11, letterSpacing: 2, color: C.inkSoft, marginTop: 18, marginBottom: 9 },
  fine: { fontFamily: F.sans, fontSize: 12.5, color: C.inkSoft, marginTop: 8, lineHeight: 18 },
  sub: { fontFamily: F.sans, fontSize: 13, color: C.inkSoft },
  seg: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 4, gap: 4 },
  segOpt: { flex: 1, alignItems: 'center', paddingVertical: 11, borderRadius: 11 },
  segOn: { backgroundColor: C.terra },
  segText: { fontFamily: F.serif, fontSize: 15, color: C.inkSoft },
  card: { backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 16 },
  cardTitle: { fontFamily: F.serif, fontSize: 17, color: C.ink },
  cardBody: { fontFamily: F.serifItalic, fontSize: 13, color: C.ink, lineHeight: 19 },
  tag: { backgroundColor: C.sage, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10 },
  tagText: { fontFamily: F.sansSemi, fontSize: 11, color: C.sageInk },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 15, marginBottom: 9 },
  rowIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  rowText: { fontFamily: F.serif, fontSize: 15, color: C.ink, flex: 1 },
  chev: { color: C.inkSoft, fontSize: 16 },
});
