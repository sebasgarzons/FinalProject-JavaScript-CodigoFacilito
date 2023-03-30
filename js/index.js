import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { auth } from '../controllers/firebase.js'

import '../controllers/firebase.js'
import '../js/signup.js'
import '../js/signin.js'
import '../js/google_login.js'
import './facebook_login.js'


onAuthStateChanged(auth, async (user) => {
    console.log(user.uid)

})

console.log('Hello World');