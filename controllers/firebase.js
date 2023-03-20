  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC2bIAKW875XN_9qGlbt4jznFO7ywYCyG0",
    authDomain: "goodnotes-6f850.firebaseapp.com",
    projectId: "goodnotes-6f850",
    storageBucket: "goodnotes-6f850.appspot.com",
    messagingSenderId: "360866241443",
    appId: "1:360866241443:web:67d6cc678ea2738cb4d816",
    measurementId: "G-TST6PDTV23"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
console.log('Hello World FireBase');