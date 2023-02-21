
// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyAkFW4Nfj-YA0q_bH-a_iuDZstF-3RK_8c",

    authDomain: "hompage-vm23.firebaseapp.com",

    projectId: "hompage-vm23",

    storageBucket: "hompage-vm23.appspot.com",

    messagingSenderId: "982548238273",

    appId: "1:982548238273:web:8afb07a667bba716dea940"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Form = document.getElementById('signin-desktop');
const SignOutButton = document.getElementById('logout')

Form.addEventListener('submit', e => {
    e.preventDefault()
    const EmailInput = document.getElementById('email');
    const PasswordInput = document.getElementById('password');
    async function login() {
        try {
            await signInWithEmailAndPassword(auth, EmailInput.value, PasswordInput.value);
        } catch (error) {
            console.log(error)
        }
    }
    login()
    EmailInput.value = '';
    PasswordInput.value = '';
})

SignOutButton.addEventListener('click', e => {
    async function logout() {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    logout()
})
