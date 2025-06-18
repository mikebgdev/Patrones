type Env = Record<string, string | undefined>;
const env: Env =
  typeof import.meta !== 'undefined' && (import.meta as unknown as { env: Env }).env
    ? (import.meta as unknown as { env: Env }).env
    : (process.env as Env);

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: `${env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: env.VITE_FIREBASE_APP_ID,
};


