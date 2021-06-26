import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3emFc4YjCUjhRlOeMjJz3Cr3O9X-PU-0",
  authDomain: "food-bank-app-9f088.firebaseapp.com",
  databaseURL: "https://food-bank-app-9f088.firebaseio.com",
  projectId: "food-bank-app-9f088",
  storageBucket: "food-bank-app-9f088.appspot.com",
  messagingSenderId: "107457046502",
  appId: "1:107457046502:web:f140dc7d96b7437fed5827",
  measurementId: "G-GN3YV3GPV1",
};

/*
const firebaseConfigProd = {
  apiKey: "AIzaSyDsnRLF39dbyMnkH9rOU-_duNzEwzvq96k",
  authDomain: "the-pantry-12913.firebaseapp.com",
  databaseURL: "https://the-pantry-12913-default-rtdb.firebaseio.com",
  projectId: "the-pantry-12913",
  storageBucket: "the-pantry-12913.appspot.com",
  messagingSenderId: "541800016203",
  appId: "1:541800016203:web:da90d5cee07292498fa0ce",
  measurementId: "G-68K311GYM0",
};
*/

function initApp() {
  let app = firebase.initializeApp(firebaseConfig);
  app.auth().signInAnonymously();
  //firebase.analytics(app);
  //firebase.analytics();
  return app;
}

export default !firebase.apps.length ? initApp() : firebase.app();
