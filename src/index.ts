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
  apiKey: "AIzaSyDNR23F-IVyB_HJbnA6jP-CIKrm4EUQAJ8",
  authDomain: "tod0-bbccc.firebaseapp.com",
  projectId: "tod0-bbccc",
  storageBucket: "tod0-bbccc.appspot.com",
  messagingSenderId: "648642521628",
  appId: "1:648642521628:web:303ee81470ff76c8cfcdd9",
  measurementId: "G-DXRCX4L6CT",
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
