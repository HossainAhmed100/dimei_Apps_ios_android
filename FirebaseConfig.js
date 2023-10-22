import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsd8lhxZoAua6_b2WXzyLwoK5irTS3gtc",
  authDomain: "gima-john-auth.firebaseapp.com",
  projectId: "gima-john-auth",
  storageBucket: "gima-john-auth.appspot.com",
  messagingSenderId: "969145634713",
  appId: "1:969145634713:web:1066e7bef871b43a3e0d08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage = getStorage(app);

export { auth, storage };
