import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_bUQ1Dv_3ihLuYP-FOVv2eXDqCxTxBKQ",
  authDomain: "testing-c50d1.firebaseapp.com",
  projectId: "testing-c50d1",
  storageBucket: "testing-c50d1.appspot.com",
  messagingSenderId: "237706564533",
  appId: "1:237706564533:web:fd9f22929b5df77b813ffc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
