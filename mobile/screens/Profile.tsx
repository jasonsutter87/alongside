import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { C, F } from '../theme';

const ABOUT = ['Curious over certain', 'Shows up early', 'Bad singer, sings anyway', 'Plans the trip', 'First-pancake person'];
const OVERLAPS = ['📚 Reads the same ten books', '🏃 Marathon training', '✈️ Oaxaca, spring', '🎸 Wants to learn guitar'];

export default function Profile({ intent }: { intent: 'dating' | 'friends' }) {
  return (
    <ScrollView contentContainerStyle={s.pad}>
      <Text style={s.brand}>YOU</Text>
      <View style={s.head}>
        <View style={s.avatar} />
        <View><Text style={s.name}>Jason, 36</Text><Text style={s.sub}>{intent === 'friends' ? 'Friends · within your city' : 'Dating · within your city'}</Text></View>
      </View>

      <View style={s.why}>
        <Text style={s.whyText}>
          New matches see a soft blur of you that sharpens as you play — the same earn you give them.
          Looks are never the first filter.
        </Text>
      </View>

      <Text style={s.label}>WHAT YOU’RE ABOUT</Text>
      <View style={s.pillWrap}>{ABOUT.map((t) => <View key={t} style={s.pill}><Text style={s.pillText}>{t}</Text></View>)}</View>

      <Text style={s.label}>OVERLAPS YOU CARRY</Text>
      <View style={s.pillWrap}>{OVERLAPS.map((t) => <View key={t} style={s.pill}><Text style={s.pillText}>{t}</Text></View>)}</View>

      {intent === 'friends' && (
        <>
          <Text style={[s.label, { color: C.sageInk }]}>ALSO HERE FOR FRIENDS</Text>
          <View style={[s.why, { backgroundColor: 'rgba(221,228,211,0.4)', borderColor: '#cfd9c0' }]}>
            <Text style={[s.sub, { marginBottom: 9 }]}>One profile — we just add what friends should know.</Text>
            <View style={s.pillWrap}>{['🏃 Long-run partner', '🧗 Climbing buddy', '☕ New in town'].map((t) => <View key={t} style={s.pill}><Text style={s.pillText}>{t}</Text></View>)}</View>
          </View>
        </>
      )}

      <Text style={s.label}>A PROMPT YOU ANSWERED</Text>
      <View style={s.why}>
        <Text style={s.prompt}>The meal you make when you need to feel okay —</Text>
        <Text style={s.answer}>Grilled cheese, slightly burnt, eaten standing up at the counter. No notes.</Text>
      </View>

      <Pressable style={s.editBtn}><Text style={s.editText}>Edit your profile</Text></Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  pad: { paddingHorizontal: 26, paddingTop: 14, paddingBottom: 24 },
  brand: { fontFamily: F.sansSemi, letterSpacing: 3, fontSize: 12, color: C.terraDeep },
  head: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 14, marginBottom: 16 },
  avatar: { width: 74, height: 74, borderRadius: 37, backgroundColor: '#cdb78f' },
  name: { fontFamily: F.serif, fontSize: 22, color: C.ink },
  sub: { fontFamily: F.sans, fontSize: 14, color: C.inkSoft },
  why: { backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 14, marginBottom: 4 },
  whyText: { fontFamily: F.sans, fontSize: 13.5, color: C.inkSoft, lineHeight: 19 },
  label: { fontFamily: F.sansSemi, fontSize: 11, letterSpacing: 2, color: C.inkSoft, marginTop: 18, marginBottom: 9 },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 13 },
  pillText: { fontFamily: F.serifReg, fontSize: 13, color: C.ink },
  prompt: { fontFamily: F.serifItalic, fontSize: 13, color: C.terraDeep, marginBottom: 7 },
  answer: { fontFamily: F.sans, fontSize: 14, color: C.ink, lineHeight: 20 },
  editBtn: { marginTop: 16, borderRadius: 16, padding: 15, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.55)', borderWidth: 1, borderColor: C.line },
  editText: { fontFamily: F.sansMed, fontSize: 15, color: C.ink },
});
