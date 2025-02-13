import { create } from "zustand";
import {db} from '../../lib/firebaseConfig'
import {collection,updateDoc,addDoc,doc} from 'firebase/firestore'
const MyStore=create((set,get)=>({
    components:[],
    addComponent:async (newComponent)=>{
        const docRef=await addDoc(collection(db,'component'),newComponent)
        set((state)=>({
            components:[...state.components,{id:docRef.id,...newComponent}]
        }))
    }


}))