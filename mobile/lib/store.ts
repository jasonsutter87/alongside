import AsyncStorage from '@react-native-async-storage/async-storage';

// On-device persistence. Later this becomes the thing that SYNCS to the server DB,
// not something we throw away — same shape, just a local cache for now.

export type Profile = {
  onboarded: true;
  intent: 'dating' | 'friends';
  name: string;
  age: string;
  job: string;
  city: string;
  quirks: string[];
  different: string;
};

const KEY = 'alongside.profile.v1';

export async function saveProfile(p: Profile): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // non-fatal — worst case the user is asked to onboard again
  }
}

export async function loadProfile(): Promise<Profile | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return p && p.onboarded ? (p as Profile) : null;
  } catch {
    return null;
  }
}

export async function clearProfile(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
