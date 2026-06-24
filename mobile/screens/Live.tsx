import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { nearbyPlaces } from '../lib/places';
import OsmHeatMap from '../components/OsmHeatMap';
import { C, F } from '../theme';

type LocState = 'idle' | 'asking' | 'granted' | 'denied' | 'error';

type Phase = 'intro' | 'set' | 'map';
const SPOTS = ['Beals Point', 'The lake walkway', 'Folsom Lake trailhead', 'Granite Bay beach'];
const DURS = ['1 hour', '2 hours', 'Until sunset'];
const TRAITS = ['Marathon training', 'Reads the same ten books', 'Wants to learn guitar', 'Always brings the dog'];

const SAFETY = [
  ['⏱️', 'Duration-based, never always-on', 'You set how long. It switches itself off — no lingering signal, no trail.'],
  ['📍', 'Public places only', 'You check into a venue — a café, a trail, an event. Never your home. Never a street corner.'],
  ['🌫️', 'Fuzzed to a ¼-mile grid', 'Your exact spot is never shared — only a soft sense of “around here.”'],
  ['🔥', 'A heat map of energy, never people', 'You see where it’s warm — never who’s there, never a dot, never a path.'],
  ['🙈', 'You’re a blur in a crowd', 'We never light up an area with too few people. If it’s just you, the map stays cold.'],
];

function Blob({ left, top, size }: { left: number; top: number; size: number }) {
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left, top, width: size, height: size }}>
      <View style={[s.blobLayer, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#9b2f7a', opacity: 0.5 }]} />
      <View style={[s.blobLayer, { width: size * 0.66, height: size * 0.66, borderRadius: size, top: size * 0.17, left: size * 0.17, backgroundColor: '#ef8a2a', opacity: 0.7 }]} />
      <View style={[s.blobLayer, { width: size * 0.34, height: size * 0.34, borderRadius: size, top: size * 0.33, left: size * 0.33, backgroundColor: '#ffe24d', opacity: 0.95 }]} />
    </View>
  );
}

export default function Live({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [spot, setSpot] = useState(SPOTS[0]);
  const [dur, setDur] = useState(DURS[1]);
  const [trait, setTrait] = useState<string | null>(null);
  const [loc, setLoc] = useState<LocState>('idle');
  const [area, setArea] = useState<string>('');
  const [spots, setSpots] = useState<string[]>(SPOTS); // curated fallback until real places load
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  async function findMe() {
    setLoc('asking');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { setLoc('denied'); return; }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      // reverse-geocode to a coarse, human area name — we never store or show the precise point
      const geo = await Location.reverseGeocodeAsync(pos.coords);
      const g = geo[0];
      const label = g ? [g.city || g.subregion, g.region].filter(Boolean).join(', ') : 'your area';
      setArea(label || 'your area');
      // real PUBLIC places near you, from OpenStreetMap (no key); falls back to curated list on failure
      try {
        const nearby = await nearbyPlaces(pos.coords.latitude, pos.coords.longitude);
        if (nearby.length) { setSpots(nearby.map((n) => n.name)); setSpot(nearby[0].name); }
      } catch { /* keep curated fallback */ }
      setLoc('granted');
    } catch {
      setLoc('error');
    }
  }

  // ask for location when the user lands on the "set" step
  useEffect(() => {
    if (phase === 'set' && loc === 'idle') findMe();
  }, [phase]);

  if (phase === 'intro') {
    return (
      <ScrollView contentContainerStyle={s.pad}>
        <Pressable onPress={onBack}><Text style={s.back}>‹ Settings</Text></Pressable>
        <Text style={[s.brand, { color: '#d9534f' }]}>● LIVE</Text>
        <Text style={s.h1}>Out in the{'\n'}real world.</Text>
        <Text style={[s.sub, { marginBottom: 16 }]}>
          Let nearby people know there’s energy where you are — and go meet someone in person, tonight.
          Before you do, read how we keep this safe. This part isn’t fine print.
        </Text>
        <View style={s.card}>
          {SAFETY.map(([ic, t, d], i) => (
            <View key={i} style={[s.safeRow, i === SAFETY.length - 1 && { marginBottom: 0 }]}>
              <Text style={s.safeIcon}>{ic}</Text>
              <View style={{ flex: 1 }}><Text style={s.safeTitle}>{t}</Text><Text style={s.sub}>{d}</Text></View>
            </View>
          ))}
        </View>
        <Btn label="I understand — go live" onPress={() => setPhase('set')} />
        <Btn label="Not now" ghost onPress={onBack} />
      </ScrollView>
    );
  }

  if (phase === 'set') {
    return (
      <ScrollView contentContainerStyle={s.pad}>
        <Pressable onPress={() => setPhase('intro')}><Text style={s.back}>‹</Text></Pressable>
        <Text style={s.h2}>Where are you,{'\n'}and for how long?</Text>
        <Text style={[s.sub, { marginBottom: 14 }]}>Your phone found the public places around you. Pick one — we anchor your signal to the place, not to you.</Text>
        {loc === 'asking' && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <ActivityIndicator color={C.terra} />
            <Text style={s.sub}>Finding public places near you…</Text>
          </View>
        )}
        {(loc === 'denied' || loc === 'error') && (
          <View style={s.locOff}>
            <Text style={[s.sub, { marginBottom: 10 }]}>
              {loc === 'denied'
                ? 'Location is off. Turn it on so we can show the public places around you — we only ever use a rough area, never your exact spot.'
                : 'Couldn’t read your location. Want to try again?'}
            </Text>
            <Pressable style={s.smallBtn} onPress={findMe}><Text style={s.smallBtnText}>Enable location</Text></Pressable>
          </View>
        )}
        {loc === 'granted' && (
          <>
            <Text style={s.label}>📍 PUBLIC PLACES NEAR {area ? area.toUpperCase() : 'YOU'}</Text>
            <Pills options={spots} value={spot} onPick={setSpot} />
            <Text style={s.fine}>Your exact location never leaves your phone — only the place you pick (public, fuzzed to ¼ mile) is shared.</Text>
          </>
        )}
        <Text style={s.label}>HOW LONG</Text>
        <Pills options={DURS} value={dur} onPick={setDur} />
        <Text style={s.label}>SHOW ONE TRAIT TO THE AREA · OPTIONAL</Text>
        <Pills options={TRAITS} value={trait} onPick={(t) => setTrait(t === trait ? null : t)} />
        <Btn label="Go live" onPress={() => setPhase('map')} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.pad}>
      <Pressable onPress={() => setPhase('set')}><Text style={s.back}>‹</Text></Pressable>
      <View style={s.banner}>
        <View style={s.liveDot} />
        <View style={{ flex: 1 }}>
          <Text style={s.bannerTitle}>You’re live near {spot}</Text>
          <Text style={s.sub}>{dur} left · auto-off · {trait ? `showing: ${trait}` : 'no trait shown'}</Text>
        </View>
      </View>

      <View style={s.map}>
        {coords ? (
          <OsmHeatMap lat={coords.lat} lng={coords.lng} />
        ) : (
          <>
            <Blob left={40} top={60} size={150} />
            <Blob left={180} top={30} size={110} />
            <Blob left={170} top={150} size={130} />
            <View style={s.youRing} />
          </>
        )}
      </View>

      <View style={s.sheet}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={s.sheetTitle}>Around {spot}</Text>
          <View style={s.warmTag}><Text style={s.warmTagText}>🔥 warm now</Text></View>
        </View>
        <Text style={[s.sub, { marginBottom: 10 }]}>About 7 people open to meeting near here right now · 2 share an overlap with you.</Text>
        <Text style={s.sheetWhy}>
          {trait ? `Someone here is also into “${trait}.” ` : 'Someone here is also training for a marathon. '}
          We won’t say who — but now you’ve got a way in: a shared interest beats “hey, you’re cute” every time.
        </Text>
        <Text style={s.fine}>No names. No dots. No exact spot. Just a reason to say hi.</Text>
      </View>
      <Btn label="Go dark" ghost onPress={onBack} />
    </ScrollView>
  );
}

function Pills({ options, value, onPick }: { options: string[]; value: string | null; onPick: (v: string) => void }) {
  return (
    <View style={s.pillWrap}>
      {options.map((o) => {
        const on = o === value;
        return (
          <Pressable key={o} onPress={() => onPick(o)} style={[s.pill, on && { backgroundColor: C.terra, borderColor: C.terra }]}>
            <Text style={[s.pillText, on && { color: C.white }]}>{o}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Btn({ label, onPress, ghost }: { label: string; onPress: () => void; ghost?: boolean }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.btn, ghost ? s.btnGhost : s.btnPrimary, pressed && { opacity: 0.85 }]}>
      <Text style={[s.btnText, ghost && { color: C.inkSoft }]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  pad: { paddingHorizontal: 26, paddingTop: 14, paddingBottom: 24 },
  back: { fontFamily: F.sans, fontSize: 15, color: C.inkSoft, marginBottom: 10 },
  brand: { fontFamily: F.sansSemi, letterSpacing: 2, fontSize: 12, color: C.terraDeep },
  h1: { fontFamily: F.serif, fontSize: 30, color: C.ink, lineHeight: 34, marginTop: 6, marginBottom: 10 },
  h2: { fontFamily: F.serif, fontSize: 22, color: C.ink, lineHeight: 27, marginBottom: 14 },
  sub: { fontFamily: F.sans, fontSize: 12.5, color: C.inkSoft, lineHeight: 18 },
  fine: { fontFamily: F.sans, fontSize: 12, color: C.inkSoft, marginTop: 8, lineHeight: 17 },
  label: { fontFamily: F.sansSemi, fontSize: 11, letterSpacing: 1.5, color: C.inkSoft, marginTop: 16, marginBottom: 8 },
  card: { backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 16, marginBottom: 6 },
  safeRow: { flexDirection: 'row', gap: 12, marginBottom: 13 },
  safeIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  safeTitle: { fontFamily: F.serif, fontSize: 14, color: C.ink, marginBottom: 1 },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14 },
  pillText: { fontFamily: F.serifReg, fontSize: 13, color: C.ink },
  banner: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(217,139,107,0.12)', borderWidth: 1, borderColor: C.terra, borderRadius: 14, padding: 12, marginBottom: 12 },
  liveDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#d9534f' },
  bannerTitle: { fontFamily: F.serif, fontSize: 14, color: C.ink },
  map: { height: 300, borderRadius: 18, borderWidth: 1, borderColor: C.line, backgroundColor: '#e8e1d1', overflow: 'hidden', position: 'relative' },
  blobLayer: { position: 'absolute' },
  youRing: { position: 'absolute', left: 70, top: 100, width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: C.terraDeep, borderStyle: 'dashed', backgroundColor: 'rgba(217,139,107,0.1)' },
  hot: { position: 'absolute', borderRadius: 60 },
  sheet: { backgroundColor: 'rgba(255,255,255,0.72)', borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 15, marginTop: 12 },
  sheetTitle: { fontFamily: F.serif, fontSize: 17, color: C.ink },
  sheetWhy: { fontFamily: F.serifItalic, fontSize: 13, color: C.ink, lineHeight: 19, marginBottom: 10 },
  warmTag: { backgroundColor: C.rose, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10 },
  warmTagText: { fontFamily: F.sansSemi, fontSize: 11, color: C.roseInk },
  locOff: { backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 15, marginTop: 10 },
  smallBtn: { backgroundColor: C.terra, borderRadius: 12, paddingVertical: 11, alignItems: 'center' },
  smallBtnText: { fontFamily: F.sansSemi, fontSize: 14, color: C.white },
  btn: { borderRadius: 18, padding: 16, alignItems: 'center', marginTop: 10 },
  btnPrimary: { backgroundColor: C.terra },
  btnGhost: { backgroundColor: 'transparent' },
  btnText: { fontFamily: F.sansSemi, fontSize: 16, color: C.white },
});
