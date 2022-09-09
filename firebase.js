import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAnZz28tilzTDG-oiwq0I_a03UjWFgSu0s",
  authDomain: "e-clone-2e11a.firebaseapp.com",
  projectId: "e-clone-2e11a",
  storageBucket: "e-clone-2e11a.appspot.com",
  messagingSenderId: "942093745581",
  appId: "1:942093745581:web:5f41f747fd219348f23524"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export default db;