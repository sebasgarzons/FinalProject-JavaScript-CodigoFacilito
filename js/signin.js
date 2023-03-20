import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { auth } from '../controllers/firebase.js'
import { showToast } from "../controllers/toastify.js";

const signinform = document.querySelector('#sign_in_form');

signinform.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuario_mail = signinform['usuario'].value;
        const usuario_passw = signinform['contraseña'].value;

        
        try{
            const credentials = await signInWithEmailAndPassword(auth, usuario_mail, usuario_passw)
            console.log(credentials)

            console.log('pasé')
            setTimeout(() => {
                window.location.href = '/index.html'
            }, 3000);
            showToast("Bienvenido. En unos momentos serás redireccionado a la página principal.")
        }catch(error){
            if(error.code === 'auth/wrong-password')
            {
                showToast('Wrong Password', 'error');
            }else if(error.code === 'auth/user-not-found'){
                showToast('That user dont exists', 'error')
            }else if (error.code){
                showToast('Something gone wrong', 'error')
            }
        }
})


