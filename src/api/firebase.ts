// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
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
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
}

export function onUserStateChange(callback: any) {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await pickDB(user) : null;
    callback(updateUser);
  });
}

export function loginUUID(user: string | undefined) {
  return user;
}

export async function pickDB(user: any) {
  return set(ref(database, `admins/${user.id}`), {
    ...user,
    difj: 'wefoij',
  }); //
}

// export async function pickDB(user: any) {
//   return get(ref(database, `admins${user.id}`))//
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       const admins = snapshot.val();
//       const isAdmin = admins.includes(user);
//     }
//   });
// }
