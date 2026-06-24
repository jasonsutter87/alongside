import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { C, F } from '../theme';
import Discover from './Discover';
import Profile from './Profile';
import Settings from './Settings';
import Safety from './Safety';
import Live from './Live';

type Tab = 'discover' | 'profile' | 'settings';
type Sub = 'none' | 'safety' | 'live';
type Props = { onStartGame: () => void; onSignOut: () => void };

const TABS: { key: Tab; icon: string; label: string }[] = [
  { key: 'discover', icon: '✦', label: 'Discover' },
  { key: 'profile', icon: '◍', label: 'You' },
  { key: 'settings', icon: '⚙', label: 'Settings' },
];

export default function MainShell({ onStartGame, onSignOut }: Props) {
  const [tab, setTab] = useState<Tab>('discover');
  const [sub, setSub] = useState<Sub>('none');
  const [intent, setIntent] = useState<'dating' | 'friends'>('dating');

  if (sub === 'safety' || sub === 'live') {
    return (
      <SafeAreaView style={s.fill}>
        <StatusBar style="dark" />
        {sub === 'safety' ? <Safety onBack={() => setSub('none')} /> : <Live onBack={() => setSub('none')} />}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.fill}>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        {tab === 'discover' && <Discover onPick={onStartGame} />}
        {tab === 'profile' && <Profile intent={intent} />}
        {tab === 'settings' && (
          <Settings intent={intent} setIntent={setIntent} onOpenSafety={() => setSub('safety')} onOpenLive={() => setSub('live')} onSignOut={onSignOut} />
        )}
      </View>

      <View style={s.tabbar}>
        {TABS.map((t) => {
          const on = tab === t.key;
          return (
            <Pressable key={t.key} style={s.tab} onPress={() => setTab(t.key)}>
              <Text style={[s.tabIcon, on && { color: C.terraDeep }]}>{t.icon}</Text>
              <Text style={[s.tabLabel, on && { color: C.terraDeep, fontFamily: F.sansSemi }]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.paper },
  tabbar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.line, backgroundColor: C.paper, paddingTop: 8, paddingBottom: 6 },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  tabIcon: { fontSize: 18, color: C.inkSoft },
  tabLabel: { fontFamily: F.sans, fontSize: 11, color: C.inkSoft },
});
