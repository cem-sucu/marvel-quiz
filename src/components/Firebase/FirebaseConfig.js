import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
    apiKey: "AIzaSyC_g7_zMz59EQbiwJVTXgTf1KgRxyFYvSE",
    authDomain: "marvel-quiz-ae730.firebaseapp.com",
    projectId: "marvel-quiz-ae730",
    storageBucket: "marvel-quiz-ae730.appspot.com",
    messagingSenderId: "79774977280",
    appId: "1:79774977280:web:d7c06dced1e350c40437e5",
};

const app = initializeApp(config);
export const auth = getAuth(app);
