import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import "server-only";

const decodedKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64!, "base64").toString("utf-8");

export const firebasecert = cert ({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: decodedKey,
})

if(!getApps().length){
    initializeApp({
        credential: firebasecert,
    })

}

export const db = getFirestore();