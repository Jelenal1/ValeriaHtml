// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getFirestore, doc, deleteDoc, collection, query, getDocs, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

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


async function getData() {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    const alldocsdata = [];
    querySnapshot.forEach((doc) => {
        alldocsdata.push({
            id: doc.id,
            titel: doc.data().titel,
            content: doc.data().content,
            datum: doc.data().datum
        })
    })
    RenderList(alldocsdata)

}


function RenderList(list) {
    const listOfToDoItems = document.getElementById("list");
    listOfToDoItems.innerText = "";
    if (list == undefined) return;
    list.forEach((value) => {
        const wrapper = document.createElement('div')
        wrapper.classList.add('postwrapper')
        const li = newLi(value);
        const h1 = newHeading(value);
        const DateOfCreation = dateOfCreation(value);
        h1.append(editButton(value.id, "titel"));
        h1.append(deleteButton(value.id))
        wrapper.append(h1);
        wrapper.append(DateOfCreation)
        li.append(editButton(value.id, "content"));
        li.append(deleteButton(value.id));
        wrapper.append(li);
        listOfToDoItems.append(wrapper);
    });
}

function deleteButton(ItemToDeleteId) {
    const deletebutton = document.createElement("button");
    deletebutton.innerText = "🗑️";
    onAuthStateChanged(auth, user => {
        if (!user) {
            deletebutton.classList.add('nonedisplay')
        } else {
            deletebutton.classList.remove('nonedisplay')
        }
    })
    deletebutton.classList.add('deletebutton');
    deletebutton.addEventListener("click", () => {
        async function deleteLi(ItemToDeleteId) {
            await deleteDoc(doc(db, "posts", `${ItemToDeleteId}`));
            getData();
        }
        deleteLi(ItemToDeleteId);
    });
    return deletebutton;
}

function editButton(ItemToEditId, FieldToEdit) {
    const editbutton = document.createElement("button");
    editbutton.innerText = "✏️";
    onAuthStateChanged(auth, user => {
        if (!user) {
            editbutton.classList.add('nonedisplay')
        } else {
            editbutton.classList.remove('nonedisplay')
        }
    })
    editbutton.classList.add('editbutton');
    editbutton.addEventListener("click", (e) => {
        const parentOfButton = e.target.parentElement;
        const input = document.createElement("textarea");
        const inputSubmit = document.createElement('button');
        input.setAttribute("name", "input");
        // code from chat.openai.com
        input.value = parentOfButton.innerText.slice(0, parentOfButton.innerText.length - 5);
        inputSubmit.innerText = '✓'
        parentOfButton.innerText = "";
        parentOfButton.appendChild(input);
        parentOfButton.appendChild(inputSubmit)

        inputSubmit.addEventListener("click", () => {
            if (input.value !== "") {
                const updatedValue = input.value;
                const updateRef = doc(db, "posts", ItemToEditId)
                parentOfButton.removeChild(input);
                async function updateLi(FieldToEdit, updatedValue) {
                    await updateDoc(updateRef, {
                        [FieldToEdit]: updatedValue,
                        datum: (new Date()).toLocaleDateString()
                    })

                    getData();
                }
                updateLi(FieldToEdit, updatedValue);

            }
        });
    });
    return editbutton;
}

function newLi(value) {
    const newItem = document.createElement("li");
    newItem.classList.add('content')
    newItem.id = value.titel + "li"
    newItem.innerText = value.content;
    return newItem;
}

function newHeading(value) {
    const newHeading = document.createElement('h1');
    newHeading.classList.add('heading');
    newHeading.id = value.titel + "h1";
    newHeading.innerText = value.titel;
    return newHeading;
}

function dateOfCreation(value) {
    const newH3 = document.createElement('h3');
    newH3.classList.add('datum');
    newH3.id = value.titel + "datum";
    newH3.innerText = value.datum;
    return newH3;
}

async function getNewItemsFromInput() {
    const getInputTitel = document.getElementById("titel");
    const getInputText = document.getElementById("inhalt");
    const date = new Date();
    if (getInputTitel.value === "" || getInputText.value === "") return;
    const data = {
        datum: date.toLocaleDateString(),
        content: getInputText.value,
        titel: getInputTitel.value
    }

    await setDoc(doc(db, "posts", date.toISOString()), data)
    getData();
    getInputTitel.value = "";
    getInputText.value = "";
}

document.addEventListener('DOMContentLoaded', () => {
    const NewItemInputForm = document.getElementById('postInput')
    getData()
    NewItemInputForm.addEventListener('submit', (e) => {
        e.preventDefault()
        getNewItemsFromInput()
    })
    onAuthStateChanged(auth, user => {
        if (!user) {
            NewItemInputForm.classList.add('nonedisplay')
        } else {
            NewItemInputForm.classList.remove('nonedisplay')
        }
    })

})