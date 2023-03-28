
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
// import { auth } from '../controllers/firebase.js'

// onAuthStateChanged(auth, async (user) => {
//     console.log(user.uid)
// })

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    deleteDoc,
    getDocs,
    updateDoc,
    onSnapshot,
    doc
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyC2bIAKW875XN_9qGlbt4jznFO7ywYCyG0",
    authDomain: "goodnotes-6f850.firebaseapp.com",
    projectId: "goodnotes-6f850",
    storageBucket: "goodnotes-6f850.appspot.com",
    messagingSenderId: "360866241443",
    appId: "1:360866241443:web:67d6cc678ea2738cb4d816",
    measurementId: "G-TST6PDTV23"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => {
    console.log(title, description);
    addDoc(collection(db, 'tasks'), {
        title,
        description
    })
}

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

export const deteleTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newfields) => updateDoc(doc(db, 'tasks', id), newfields)

alert('Go Crud')
console.log('Enter Works')