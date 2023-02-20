// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
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
        h1.append(editButton(value.id));
        h1.append(deleteButton(value.id))
        wrapper.append(h1);
        wrapper.append(DateOfCreation)
        li.append(editButton(value.id));
        li.append(deleteButton(value.id));
        wrapper.append(li);
        listOfToDoItems.append(wrapper);
    });
}

function deleteButton(ItemToDeleteId) {
    const deletebutton = document.createElement("button");
    deletebutton.innerText = "🗑️";
    deletebutton.addEventListener("click", () => {
        async function deleteLi(ItemToDeleteId) {
            await deleteDoc(doc(db, "posts", `${ItemToDeleteId}`));
            console.log(ItemToDeleteId)
            getData();
        }
        deleteLi(ItemToDeleteId);
    });
    return deletebutton;
}

function editButton(ItemToEditId) {
    const editbutton = document.createElement("button");
    editbutton.innerText = "✏️";
    editbutton.addEventListener("click", (e) => {
        const parentOfButton = e.target.parentElement;
        const input = document.createElement("input");
        console.log(parentOfButton);
        input.setAttribute("type", "text");
        // code from chat.openai.com
        input.value = parentOfButton.innerText.slice(0, parentOfButton.innerText.length - 5);
        parentOfButton.innerText = "";
        parentOfButton.appendChild(input);

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && input.value !== "") {
                const updatedValue = input.value;
                parentOfButton.removeChild(input);
                async function updateLi(ItemToEditId, updatedValue) {


                    getData();
                }
                updateLi(ItemToEditId, updatedValue);

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
    newH3.classList.add('date');
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

})