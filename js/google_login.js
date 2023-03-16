import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { auth } from '../controllers/firebase.js'
import { showToast } from "../controllers/toastify.js"

const googBttn = document.querySelector('#googl_log')

googBttn.addEventListener('click', async () => {
    console.log('click!')
    const provider = new GoogleAuthProvider();

    try {
        const credentialsGoogle = await signInWithPopup(auth, provider);
        console.log(credentialsGoogle);
        setTimeout(() => {
            window.location.href = '/index.html'
        }, 3000);
        showToast('Bienvenido!. En un momento serás redireccionado a la página principal')
    }catch(error){
        console.log(error)
    }
})