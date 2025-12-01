import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX_obKV258mttNSbcaR5pmbjVqjnrnf_0",
  authDomain: "medellin-tranquila-app.firebaseapp.com",
  projectId: "medellin-tranquila-app",
  storageBucket: "medellin-tranquila-app.appspot.com",
  messagingSenderId: "950673334524",
  appId: "1:950673334524:web:120ecf06ba0f3caa387779",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
