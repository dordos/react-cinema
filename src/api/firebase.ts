// Import the functions you need from the SDKs you need
import { reverse } from 'dns';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DB_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);
//현재 로그인한 유저
let currentUser: string | undefined = auth.currentUser?.uid;

//로그인
export async function logIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
}

//로그아웃
export async function logOut() {
  signOut(auth)
    .then(() => null)
    .catch((error) => {
      console.log(error);
    });
}

export function onUserStateChange(callback: any) {
  onAuthStateChanged(auth, async (user) => {
    currentUser = user?.uid;
    // const updateUser = user ? await pickDB(user) : null;
    callback(user);
  });
}

export async function pickDB(user: any) {
  console.log(currentUser);
  return get(ref(database, `admins/${currentUser}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log(admins);
        // const isAdmin = admins.includes(user);
      }
    });
}

// export async function pickDB(user: any) {
//   return set(ref(database, `admins/`), {
//     ...user,
//     difj: 'wefoij',
//   }); //
// }
