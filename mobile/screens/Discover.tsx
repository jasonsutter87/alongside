import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { C, F } from '../theme';
import { MATCHES } from '../data';

type Props = { onPick: (name: string) => void };

export default function Discover({ onPick }: Props) {
  return (
    <SafeAreaView style={s.fill}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={s.pad}>
        <Text style={s.brand}>ALONGSIDE</Text>
        <Text style={[s.h2, { marginTop: 12 }]}>We found {MATCHES.length} people{'\n'}for you.</Text>
        <Text style={[s.sub, { marginTop: 6, marginBottom: 16 }]}>
          All real. No bots, ever. You meet them through play — their face comes into focus as you go.
        </Text>

        {MATCHES.map((m) => (
          <Pressable key={m.name} style={s.card} onPress={() => onPick(m.name)}>
            <View style={s.dot} />
            <View style={{ flex: 1 }}>
              <Text style={s.name}>{m.name}<Text style={s.waiting}>  · waiting to play</Text></Text>
              <Text style={s.reason}>{m.reason}</Text>
            </View>
            <Text style={s.chev}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.paper },
  pad: { paddingHorizontal: 26, paddingTop: 12, paddingBottom: 30 },
  brand: { fontFamily: F.sansSemi, letterSpacing: 3, fontSize: 12, color: C.terraDeep },
  h2: { fontFamily: F.serif, fontSize: 24, color: C.ink, lineHeight: 29 },
  sub: { fontFamily: F.sans, fontSize: 14, color: C.inkSoft, lineHeight: 21 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line,
    borderRadius: 16, padding: 14, marginBottom: 10,
  },
  dot: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#e0c79c' },
  name: { fontFamily: F.serif, fontSize: 16, color: C.ink, marginBottom: 3 },
  waiting: { fontFamily: F.sans, fontSize: 13, color: C.inkSoft },
  reason: { fontFamily: F.sans, fontSize: 12.5, color: C.inkSoft, lineHeight: 17 },
  chev: { fontSize: 18, color: C.inkSoft },
});
