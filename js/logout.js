import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { auth } from '../controllers/firebase.js'

const log_out = document.querySelector('#log_out');

log_out.addEventListener('click', async () => {
    await signOut(auth);
    console.log('sali usuario');
    window.location.href = 'index.html';
})

