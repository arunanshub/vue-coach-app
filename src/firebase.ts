import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

export const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

export const db = getDatabase(app)
// Why the fuck does this program work when I store the auth object here?! I
// can't understand why it stops working when I try to call it for signup/login.
// And that's not it. I can log in and register a coach, and it works fine. But
// the moment I refresh the fucking page, it stops working. However, when I
// call this function before pushing data to the database, it suddenly works.
// The worst part is, I haven't been able to find any documentation regarding
// this mindfucking behavior.
export const auth = getAuth(app)
