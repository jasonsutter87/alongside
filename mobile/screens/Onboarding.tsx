import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { C, F } from '../theme';
import { Profile } from '../lib/store';

type Props = { onComplete: (profile: Profile) => void; onBack: () => void };

const QUIRKS = [
  'Curious over certain', 'Shows up early', 'Sings badly, loudly', 'Plans the whole trip',
  'Overthinks texts', 'First-pancake person', 'Quiet until comfortable', 'Will debate you for fun',
];

export default function Onboarding({ onComplete, onBack }: Props) {
  const [intent, setIntent] = useState<'dating' | 'friends' | null>(null);
  const [step, setStep] = useState(0); // 0 intro … 6 photos, 7 done
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [city, setCity] = useState('');
  const [quirks, setQuirks] = useState<string[]>([]);
  const [diff, setDiff] = useState('');
  const [photos, setPhotos] = useState<boolean[]>([false, false, false, false, false, false]);

  const toggleQuirk = (q: string) =>
    setQuirks((p) => (p.includes(q) ? p.filter((x) => x !== q) : [...p, q]));

  // ---------- INTENT ----------
  if (!intent) {
    return (
      <SafeAreaView style={s.fill}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={s.pad}>
          <Pressable onPress={onBack}><Text style={s.back}>‹</Text></Pressable>
          <Text style={s.brand}>ALONGSIDE</Text>
          <Text style={[s.h1, { marginTop: 14 }]}>What brings{'\n'}you here?</Text>
          <Text style={[s.sub, { marginBottom: 22, marginTop: 6 }]}>
            Switch anytime. We never mix who you meet for dating with who you meet for friends.
          </Text>
          <Pressable style={[s.card, { backgroundColor: C.rose }]} onPress={() => setIntent('dating')}>
            <View style={s.cardHead}><View style={[s.blob, { backgroundColor: C.terra }]} /><Text style={s.cardTitle}>Dating</Text></View>
            <Text style={s.cardDesc}>Intentional, and real. For a relationship — not a roster. Never a hookup app.</Text>
          </Pressable>
          <View style={{ height: 12 }} />
          <Pressable style={[s.card, { backgroundColor: C.sage }]} onPress={() => setIntent('friends')}>
            <View style={s.cardHead}><View style={[s.blob, { backgroundColor: C.sageInk }]} /><Text style={s.cardTitle}>Friends & clubs</Text></View>
            <Text style={s.cardDesc}>People to actually do things with — a run group, a climbing buddy, a Sunday hike.</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const Bar = () => (
    <View style={s.barRow}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <View key={n} style={[s.barSeg, n <= step && { backgroundColor: C.terra }]} />
      ))}
    </View>
  );
  const next = () => setStep((x) => x + 1);
  const prev = () => setStep((x) => Math.max(0, x - 1));

  // ---------- WIZARD ----------
  let body: React.ReactNode = null;

  if (step === 0) {
    body = (
      <>
        <Text style={s.brand}>ALONGSIDE</Text>
        <Text style={[s.h1, { marginTop: 14 }]}>Let’s build{'\n'}your corner.</Text>
        <Text style={[s.sub, { marginTop: 6 }]}>
          A couple of minutes. Not a form — a few real questions, the kind we’ll always ask here. The more
          you put in, the more we have to go on.
        </Text>
      </>
    );
  } else if (step === 1) {
    body = (
      <>
        <Bar />
        <Text style={s.h2}>First — what should{'\n'}people call you?</Text>
        <Field label="Name" value={name} onChangeText={setName} placeholder="Jason" autoFocus />
      </>
    );
  } else if (step === 2) {
    body = (
      <>
        <Bar />
        <Text style={s.h2}>A little about{'\n'}your days.</Text>
        <View style={{ flexDirection: 'row', gap: 11 }}>
          <View style={{ width: 110 }}><Field label="Age" value={age} onChangeText={setAge} placeholder="36" keyboardType="number-pad" /></View>
          <View style={{ flex: 1 }}><Field label="What you do" value={job} onChangeText={setJob} placeholder="Builds things at night" /></View>
        </View>
      </>
    );
  } else if (step === 3) {
    body = (
      <>
        <Bar />
        <Text style={s.h2}>Where’s your{'\n'}corner of the world?</Text>
        <Field label="City" value={city} onChangeText={setCity} placeholder="Sacramento, CA" />
        <Text style={s.fine}>We keep it close — you meet people you could actually run into.</Text>
      </>
    );
  } else if (step === 4) {
    body = (
      <>
        <Bar />
        <Text style={s.h2}>Now the good part —{'\n'}your quirks.</Text>
        <Text style={[s.sub, { marginBottom: 14 }]}>Pick the ones that are actually true. These become how we introduce you.</Text>
        <View style={s.pillWrap}>
          {QUIRKS.map((q) => {
            const on = quirks.includes(q);
            return (
              <Pressable key={q} onPress={() => toggleQuirk(q)}
                style={[s.pill, on && { backgroundColor: C.terra, borderColor: C.terra }]}>
                <Text style={[s.pillText, on && { color: C.white }]}>{q}</Text>
              </Pressable>
            );
          })}
        </View>
      </>
    );
  } else if (step === 5) {
    body = (
      <>
        <Bar />
        <Text style={s.h2}>One thing that{'\n'}makes you, you.</Text>
        <Text style={[s.sub, { marginBottom: 12 }]}>A small true thing nobody would guess. This is the thread someone pulls first.</Text>
        <Field label="The one thing" value={diff} onChangeText={setDiff}
          placeholder="I keep a list of strangers’ dogs I’ve met and named." multiline />
      </>
    );
  } else if (step === 6) {
    body = (
      <>
        <Bar />
        <Text style={s.h2}>A few photos.</Text>
        <Text style={[s.sub, { marginBottom: 14 }]}>
          Here’s what’s different: nobody sees these up front. They come into focus as someone plays with you —
          earned, never given.
        </Text>
        <View style={s.photoGrid}>
          {photos.map((on, i) => (
            <Pressable key={i} onPress={() => setPhotos((p) => p.map((v, j) => (j === i ? !v : v)))}
              style={[s.tile, on && { borderStyle: 'solid', borderColor: C.terra, backgroundColor: C.creamDeep }]}>
              <Text style={s.tileMark}>{on ? '🔒' : '＋'}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={s.fine}>The blur you see is exactly the blur a new match sees at the start.</Text>
      </>
    );
  } else {
    body = (
      <View style={s.center}>
        <Text style={{ fontSize: 40 }}>🌿</Text>
        <Text style={[s.h1, { marginTop: 8, textAlign: 'center' }]}>You’re in{name ? `, ${name}` : ''}.</Text>
        <Text style={[s.sub, { marginTop: 8, textAlign: 'center', maxWidth: 280 }]}>
          Your corner is set. No swiping waiting for you — we’ve already found a few people worth meeting.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={s.fill}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={[s.pad, { flexGrow: 1 }]} keyboardShouldPersistTaps="handled">
        {step > 0 && step < 7 && <Pressable onPress={prev}><Text style={s.back}>‹</Text></Pressable>}
        <View style={{ flex: 1 }}>{body}</View>
        <View style={{ marginTop: 24 }}>
          {step < 7
            ? <Btn label={step === 0 ? 'Start' : step === 6 ? 'Done' : 'Continue'} onPress={next} />
            : <Btn label="See who’s waiting" onPress={() => onComplete({ onboarded: true, intent, name, age, job, city, quirks, different: diff })} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field(props: any) {
  const { label, ...rest } = props;
  return (
    <View style={s.field}>
      <Text style={s.fieldLabel}>{label?.toUpperCase()}</Text>
      <TextInput placeholderTextColor="#c3b6a2" style={s.input} {...rest} />
    </View>
  );
}

function Btn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.btn, pressed && { opacity: 0.85 }]}>
      <Text style={s.btnText}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.paper },
  pad: { paddingHorizontal: 26, paddingTop: 10, paddingBottom: 24, minHeight: '100%' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  back: { fontSize: 26, color: C.inkSoft, marginBottom: 6 },
  brand: { fontFamily: F.sansSemi, letterSpacing: 3, fontSize: 12, color: C.terraDeep },
  h1: { fontFamily: F.serif, fontSize: 30, color: C.ink, lineHeight: 34 },
  h2: { fontFamily: F.serif, fontSize: 22, color: C.ink, lineHeight: 27, marginBottom: 14 },
  sub: { fontFamily: F.sans, fontSize: 14, color: C.inkSoft, lineHeight: 21 },
  fine: { fontFamily: F.sans, fontSize: 12.5, color: C.inkSoft, marginTop: 8, lineHeight: 18 },
  card: { borderRadius: 20, padding: 20 },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 5 },
  cardTitle: { fontFamily: F.serif, fontSize: 21, color: C.ink },
  cardDesc: { fontFamily: F.sans, fontSize: 13.5, color: C.inkSoft, lineHeight: 19 },
  blob: { width: 26, height: 26, borderRadius: 13 },
  barRow: { flexDirection: 'row', gap: 5, marginBottom: 22 },
  barSeg: { flex: 1, height: 4, borderRadius: 3, backgroundColor: C.line },
  field: { backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 13, marginBottom: 11 },
  fieldLabel: { fontFamily: F.sans, fontSize: 10.5, letterSpacing: 1.5, color: C.inkSoft, marginBottom: 5 },
  input: { fontFamily: F.serifReg, fontSize: 18, color: C.ink, padding: 0 },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: C.line, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14 },
  pillText: { fontFamily: F.serifReg, fontSize: 13, color: C.ink },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: { width: '30%', aspectRatio: 1, borderRadius: 14, borderWidth: 1.5, borderColor: C.line, borderStyle: 'dashed', backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center' },
  tileMark: { fontSize: 22, color: C.inkSoft },
  btn: { borderRadius: 18, padding: 17, alignItems: 'center', backgroundColor: C.terra },
  btnText: { fontFamily: F.sansSemi, fontSize: 16, color: C.white },
});
