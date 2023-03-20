import { FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { auth } from '../controllers/firebase.js'
import { showToast } from "../controllers/toastify.js"

const facebkBttn = document.querySelector('#facebk_log')

facebkBttn.addEventListener('click', async () => {
    console.log('click!')
    const provider = new FacebookAuthProvider();

    try {
        const credentialsFacebook = await signInWithPopup(auth, provider);
        console.log(credentialsFacebook);
        setTimeout(() => {
            window.location.href = '/index.html'
        }, 3000);
        showToast('Bienvenido!. En un momento serás redireccionado a la página principal')
    }catch(error){
        console.log(error)
    }
})