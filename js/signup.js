import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { auth } from '../controllers/firebase.js'
import { showToast } from "../controllers/toastify.js";

console.log('Signup Hello World!!');

const signupform = document.querySelector('#sign_up_form');



signupform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario_mail = signupform['usuario-registro'].value;
    const usuario_passw = signupform['contraseña-registro'].value;
    console.log(usuario_mail, usuario_passw)

    try{
        const creds = await createUserWithEmailAndPassword(auth, usuario_mail, usuario_passw)
        console.log(creds)

        console.log('pasé')
        setTimeout(() => {
            window.location.href = '/main.html'
        }, 3000);
        showToast("Bienvenido. En unos momentos serás redireccionado a la página principal.")

    }catch (error) {

        if(error.code === 'auth/invalid-email')
        {
            showToast('invalid email', 'error');
        }else if(error.code === 'auth/weak-password'){
            showToast('Password is too weak', 'error')
        }else if(error.code === 'auth/email-already-in-use'){
            showToast('Email already in use', 'error')
        }else if (error.code){
            showToast('Something gone wrong', 'error')
        }
    }

})
