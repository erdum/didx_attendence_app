import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCoTKjhMVzbEj7S7aAD_uwhRRpr52gZ8c0",
  authDomain: "didx-attendance-portal.firebaseapp.com",
  projectId: "didx-attendance-portal",
  storageBucket: "didx-attendance-portal.appspot.com",
  messagingSenderId: "959420409278",
  appId: "1:959420409278:web:0e7255ac052481fd2ec5ef",
  measurementId: "G-QMMLQF5YQG"
};
const app = initializeApp(firebaseConfig);

export default app;
