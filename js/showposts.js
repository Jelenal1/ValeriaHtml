import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, query, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

const firebaseConfig = {

    apiKey: "AIzaSyAkFW4Nfj-YA0q_bH-a_iuDZstF-3RK_8c",

    authDomain: "hompage-vm23.firebaseapp.com",

    projectId: "hompage-vm23",

    storageBucket: "hompage-vm23.appspot.com",

    messagingSenderId: "982548238273",

    appId: "1:982548238273:web:8afb07a667bba716dea940"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getData() {
    const q = query(collection(db, "posts"));
    onSnapshot(q, (querySnapshot) => {
        const alldocsdata = [];
        querySnapshot.forEach((doc) => {
            alldocsdata.push({
                id: doc.id,
                titel: doc.data().titel,
                content: doc.data().content,
                datum: doc.data().datum
            })
            return alldocsdata;
        })
        RenderList(alldocsdata)
    });



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
        wrapper.append(h1);
        wrapper.append(DateOfCreation)
        wrapper.append(li);
        listOfToDoItems.append(wrapper);
    });
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

document.addEventListener('DOMContentLoaded', () => {
    getData()
})