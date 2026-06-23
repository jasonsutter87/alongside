import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { C, F } from '../theme';
import { PARTNER, STARTERS } from '../data';

type Msg = { who: 'me' | 'them'; text: string };
type Props = { onBack: () => void };

const REPLIES = ['Oh it’s ON.', 'Ha — okay, you actually remembered.', 'See, this is why the game works.', 'Dangerous opening. I’m in.'];

export default function Chat({ onBack }: Props) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { who: 'them', text: 'So that pancake debate isn’t actually over, is it 🥞' },
  ]);

  function send(i: number) {
    setMsgs((m) => [...m, { who: 'me', text: STARTERS[i].say }, { who: 'them', text: REPLIES[i % REPLIES.length] }]);
  }

  return (
    <SafeAreaView style={s.fill}>
      <StatusBar style="dark" />
      <View style={s.header}>
        <Pressable onPress={onBack}><Text style={s.back}>‹</Text></Pressable>
        <View style={s.av} />
        <View>
          <Text style={s.name}>{PARTNER.name}</Text>
          <Text style={s.status}>here now</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.thread}>
        {msgs.map((m, i) => (
          <View key={i} style={[s.bubble, m.who === 'me' ? s.mine : s.theirs]}>
            <Text style={[s.bubbleText, m.who === 'me' && { color: C.white }]}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={s.starters}>
        <Text style={s.startersLabel}>STARTERS FROM YOUR GAME — TAP ONE</Text>
        <View style={s.chipWrap}>
          {STARTERS.map((st, i) => (
            <Pressable key={i} style={s.chip} onPress={() => send(i)}>
              <Text style={s.chipText}>{st.chip}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.paper },
  header: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 26, paddingVertical: 12 },
  back: { fontSize: 26, color: C.inkSoft, marginRight: 2 },
  av: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#e0c79c' },
  name: { fontFamily: F.serif, fontSize: 16, color: C.ink },
  status: { fontFamily: F.sans, fontSize: 12, color: C.inkSoft },
  thread: { paddingHorizontal: 26, paddingTop: 6, paddingBottom: 10, gap: 10 },
  bubble: { maxWidth: '82%', borderRadius: 16, paddingVertical: 11, paddingHorizontal: 15 },
  theirs: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.55)', borderWidth: 1, borderColor: C.line },
  mine: { alignSelf: 'flex-end', backgroundColor: C.terra },
  bubbleText: { fontFamily: F.serifReg, fontSize: 14.5, color: C.ink, lineHeight: 20 },
  starters: { paddingHorizontal: 26, paddingTop: 12, paddingBottom: 18, borderTopWidth: 1, borderTopColor: C.line },
  startersLabel: { fontFamily: F.sansSemi, fontSize: 10.5, letterSpacing: 1.5, color: C.inkSoft, marginBottom: 10 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: C.line, borderRadius: 20, paddingVertical: 9, paddingHorizontal: 13 },
  chipText: { fontFamily: F.serifReg, fontSize: 13, color: C.ink },
});
