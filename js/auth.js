
// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

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
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', (event) => {
    const mobileSigninButton = document.getElementById('mobile-signin-button');
    const desktopSigninButton = document.getElementById('desktop-signin-button');
    const desktopform = document.getElementById('signin-desktop');

    if (!desktopform.classList.contains('nonedisplay')) {
        desktopform.classList.add('nonedisplay')
    }
    mobileSigninButton.addEventListener('click', (e) => {
        desktopform.classList.toggle('nonedisplay');
    })
    desktopSigninButton.addEventListener('click', (e) => {
        desktopform.classList.toggle('nonedisplay');
    })

    desktopform.addEventListener('submit', (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, desktopform.children[0].value, desktopform.children[1].value)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential.user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    })

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
})