import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDpe3-VskG9IbdtFmmOc9pVQAXWyXxEhao",
    authDomain: "lz-react-trello-boards.firebaseapp.com",
    databaseURL: "https://lz-react-trello-boards.firebaseio.com",
    projectId: "lz-react-trello-boards",
    storageBucket: "lz-react-trello-boards.appspot.com",
    messagingSenderId: "1051663817437",
    appId: "1:1051663817437:web:7031f0c907136b9ca31934"
}

firebase.initializeApp(config);

const db = firebase.firestore();

const boardsRef = db.collection('boards');

const listsRef = db.collection('lists');

const cardsRef = db.collection('cards');

export { boardsRef, listsRef, cardsRef } 