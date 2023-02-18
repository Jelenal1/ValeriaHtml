// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getFirestore, doc, deleteDoc, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

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


function RenderList(list) {
    const listOfToDoItems = document.getElementById("list");
    listOfToDoItems.innerText = "";
    if (list == undefined) return;
    list.forEach((value) => {
        const li = newLi(value);
        li.append(deleteButton(value.id))
        li.append(editButton(value.id))
        listOfToDoItems.append(li);
    });
}

function deleteButton(ItemToDelete) {
    const deletebutton = document.createElement("button");
    deletebutton.classList.add("button");
    deletebutton.classList.add("borderblueviolet");
    deletebutton.classList.add("ms-2"); //code from getbootstrap.com
    deletebutton.innerText = "🗑️";
    deletebutton.addEventListener("click", () => {
        async function deleteLi(ItemToDelete) {
            const del = await deleteDoc(doc(db, "posts", ItemToDelete))
            getData();
        }
        deleteLi(ItemToDelete);
    });
    return deletebutton;
}

function editButton(ItemToEdit) {
    const editbutton = document.createElement("button");
    editbutton.classList.add("button");
    editbutton.classList.add("borderblueviolet");
    editbutton.innerText = "✏️";
    editbutton.addEventListener("click", () => {
        const li = document.getElementById(ItemToEdit);
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        // code from chat.openai.com
        input.value = li.innerText.slice(0, li.innerText.length - 5);
        li.innerText = "";
        li.appendChild(input);

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && input.value !== "") {
                const updatedValue = input.value;
                li.removeChild(input);
                async function updateLi(ItemToDelete, updatedValue) {
                    const update = await fetch(`http://localhost:3000/tasks`, {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: ItemToDelete,
                            title: updatedValue
                        })
                    });
                    getData("http://localhost:3000/tasks");
                }
                updateLi(ItemToEdit, updatedValue);

            }
        });
    });
    return editbutton;
}

function newLi(value) {
    const newItem = document.createElement("li");
    newItem.classList.add("list-group-item");   //code from getbootstrap.com
    newItem.classList.add("borderblueviolet");
    newItem.classList.add("fw-bold");   //code from getbootstrap.com
    newItem.id = value.id;
    newItem.innerText = value.title;
    return newItem;
}

async function getNewItemsFromInput(url) {
    const getInputElements = document.getElementById("addtodo");
    if (getInputElements.value == "") return;
    const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: getInputElements.value })
    });
    getData("http://localhost:3000/tasks");
}

async function getData() {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    })
    return querySnapshot;
}