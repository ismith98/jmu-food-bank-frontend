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

function initApp() {
  let app = firebase.initializeApp(firebaseConfig);
  app.auth().signInAnonymously();
  return app;
}

export default !firebase.apps.length ? initApp() : firebase.app();
