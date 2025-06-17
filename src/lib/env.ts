const env = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env : process.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: `${env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: env.VITE_FIREBASE_APP_ID,
};


