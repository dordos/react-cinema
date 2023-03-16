// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { movieDetailType, movieType } from '../types/movieType';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DB_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
//현재 로그인한 유저
export let currentUser: string | undefined = auth.currentUser?.uid;

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
    callback(user);
  });
}

export async function addMovies(movieList: any) {
  const myObject: { [key: number]: movieType } = {};
  movieList.forEach((item: any) => {
    myObject[item.id] = item;
  });
  return set(ref(database, `movies/`), {
    ...myObject,
  });
}

export async function getMovies() {
  return get(ref(database, 'movies')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

// //firebase set data
export async function setPickDB(
  movieId: number,
  movieDetail: movieDetailType | undefined,
  state: boolean
) {
  return set(ref(database, `admins/${currentUser}/${movieId}`), {
    ...movieDetail,
    userMovieState: {
      ...movieDetail?.userMovieState,
      pick: state,
    },
  });
}

export async function setCart(movieId: number, movieDetail: movieDetailType | undefined) {
  return set(ref(database, `admins/${currentUser}/${movieId}`), {
    ...movieDetail,
    userMovieState: {
      ...movieDetail?.userMovieState,
      cartState: true,
    },
  });
}

// export async function pickList(params: type) {
//   return get(ref(database, `admins/${currentUser}/${movieId}`), {});
// }
