// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { movieDetailType } from '../types/movieType';
import { seriesDetailType } from '../types/seriesType';

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

export async function getCart() {
  return get(ref(database, `admins/${currentUser}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = Object.values<movieDetailType>(snapshot.val());
      const cartDB = data.filter((el) => el.userMovieState?.cartState === true);
      return cartDB;
    }
    return [];
  });
}

// add movieDetail Default
export async function addMovieDetailDefault(movieId: number, movieDetail: movieDetailType) {
  return set(ref(database, `admins/${currentUser}/${movieId}`), {
    ...movieDetail,
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

export async function setCart(
  movieId: number,
  movieDetail: movieDetailType | undefined,
  getUserState: any
) {
  return set(ref(database, `admins/${currentUser}/${movieId}`), {
    ...movieDetail,
    userMovieState: {
      ...getUserState,
      cartState: true,
    },
  });
}

export async function setMovieOrderList(movieDetail: movieDetailType[]): Promise<void> {
  const promises = movieDetail.map((item) => {
    return set(ref(database, `admins/${currentUser}/${item.id}`), {
      ...item,
      userMovieState: {
        ...item?.userMovieState,
        ordered: true,
        cartState: false,
      },
    });
  });
  await Promise.all(promises);
}

// ---------------------------------------------------------
// Series

export async function addSeriesDetailDefault(movieId: number, seriesDetail: seriesDetailType) {
  return set(ref(database, `admins/${currentUser}/${movieId}`), {
    ...seriesDetail,
  });
}

export async function getSeriesCart() {
  return get(ref(database, `admins/${currentUser}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = Object.values<seriesDetailType>(snapshot.val());
      const cartDB = data.filter((el) => el.userSeriesState?.cartState === true);
      return cartDB;
    }
    return [];
  });
}

export async function setSeriesCart(
  movieId: number,
  seriesDetail: seriesDetailType | undefined,
  getUserState: any
) {
  return set(ref(database, `admins/${currentUser}/${movieId}`), {
    ...seriesDetail,
    userSeriesState: {
      ...getUserState,
      cartState: true,
    },
  });
}

export async function setSeriesPickDB(
  movieId: number,
  seriesDetail: seriesDetailType | undefined,
  state: boolean
) {
  return set(ref(database, `admins/${currentUser}/${movieId}`), {
    ...seriesDetail,
    userSeriesState: {
      ...seriesDetail?.userSeriesState,
      pick: state,
    },
  });
}

export async function setSeriesOrderList(seriesDetail: seriesDetailType[]): Promise<void> {
  const promises = seriesDetail.map((item) => {
    return set(ref(database, `admins/${currentUser}/${item.id}`), {
      ...item,
      userSeriesState: {
        ...item?.userSeriesState,
        ordered: true,
        cartState: false,
      },
    });
  });
  await Promise.all(promises);
}
