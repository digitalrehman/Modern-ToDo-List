import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCDCBcJKSUpEI9x0q62Nm0fNyL2tqp7xEE",
  authDomain: "modern-todo-3fae3.firebaseapp.com",
  projectId: "modern-todo-3fae3",
  storageBucket: "modern-todo-3fae3.appspot.com",
  messagingSenderId: "850084499922",
  appId: "1:850084499922:web:b70086965c658e49d1380b",
  measurementId: "G-D2CL6E4H8H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let connect = collection(db, "ToDo_List");

let add_ToDo_task = async (todoS: { task: any }) => {
  const docRef = await addDoc(collection(db, "ToDo_List"), todoS);
  console.log(docRef);
};

export {
  connect,
  addDoc,
  add_ToDo_task,
  collection,
  db,
  getDocs,
  doc,
  deleteDoc,
};
