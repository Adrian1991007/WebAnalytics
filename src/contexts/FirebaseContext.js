/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// action - state management
import { LOGIN, LOGOUT, SET_WEBSITE, UPDATE_PROFILE } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  updatePassword
} from 'firebase/auth';

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// firebase initialize
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// const
const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  isInitialized: false,
  isWebsiteInitiate: localStorage.getItem('isWebsiteInitiate'),
  user: null,
  isProfileUpdated: false,
  website: null
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const disp = useDispatch();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestoreDatabase = getFirestore(app);
  const storage = getStorage(app);
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const firebaseEmailPasswordSignIn = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    getWebsite(result?.user.uid);
  };

  const firebaseGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    getWebsite(result?.user.uid);
  };

  const firebaseTwitterSignIn = () => {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseRegister = async (values) => {
    const { displayName, email, password, website } = values;
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    addWebsite(user.uid, website);
  };

  const updateDisplayName = async (displayName) => {
    await updateProfile(state.user, { displayName });
    dispatch({
      type: UPDATE_PROFILE
    });
  };

  const updatePhoto = async (photoURL) => {
    await updateProfile(state.user, { photoURL });
    dispatch({
      type: UPDATE_PROFILE
    });
  };

  const changePassword = async (oldPassword, newPassword) => {
    await signInWithEmailAndPassword(auth, state.user.email, oldPassword);
    await updatePassword(state.user, newPassword);
  };

  const updatePhotoURL = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${state.user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        disp(
          openSnackbar({
            open: true,
            message: <FormattedMessage id="lbl.upload_progress" values={{ progress: progress }} />,
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          disp(
            openSnackbar({
              open: true,
              message: <FormattedMessage id="lbl.upload_progress_success" />,
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
          updatePhoto(downloadURL);
        });
      }
    );
  };

  const logout = () => {
    auth.signOut();
    websiteDispatch(setWebsite(null));
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const confirmResetPassword = async (code, newPassword) => {
    await confirmPasswordReset(auth, code, newPassword);
  };

  const getWebsite = async (userId) => {
    try {
      if (userId) {
        const userRef = doc(firestoreDatabase, 'websites', userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const website = userData.website;

          dispatch({
            type: SET_WEBSITE,
            payload: { website }
          });
          return website;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error('Eroare la obținerea informației despre website:', error);
      return null;
    }
  };

  const addWebsite = async (userId, website) => {
    try {
      if (userId) {
        const userRef = doc(firestoreDatabase, 'websites', userId);
        await setDoc(userRef, { website });
        console.log('Informația despre website a fost adaugata cu success.');
        dispatch({
          type: SET_WEBSITE,
          payload: { website }
        });
      }
    } catch (error) {
      console.error('Eroare la actualizarea informației despre website:', error);
    }
  };

  const updateWebsite = async (website) => {
    try {
      const userId = state.user.uid;
      const userRef = doc(firestoreDatabase, 'websites', userId);
      await setDoc(userRef, { website });
      console.log('Informația despre website a fost adaugata cu success.');
      dispatch({
        type: SET_WEBSITE,
        payload: { website }
      });
    } catch (error) {
      console.error('Eroare la actualizarea informației despre website:', error);
    }
  };

  useEffect(() => {
    if (!state.website && state.user) {
      getWebsite(state.user.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        firebaseRegister,
        firebaseEmailPasswordSignIn,
        login: () => {},
        firebaseGoogleSignIn,
        firebaseTwitterSignIn,
        firebaseFacebookSignIn,
        logout,
        updateWebsite,
        getWebsite,
        resetPassword,
        confirmResetPassword,
        updateDisplayName,
        changePassword,
        updatePhotoURL
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node
};

export default FirebaseContext;
