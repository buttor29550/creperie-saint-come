import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-HhkycS1HXiMqJ9U5g8t7rfVRz93knWE",
  authDomain: "gestionnaire-reservation.firebaseapp.com",
  projectId: "gestionnaire-reservation",
  storageBucket: "gestionnaire-reservation.appspot.com",
  messagingSenderId: "973130775891",
  appId: "1:973130775891:web:a643e3d81db1b6158df5a6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
