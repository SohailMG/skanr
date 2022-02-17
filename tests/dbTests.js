import {
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import { db } from "../firebase.js";

const placeDetails = {
  name: "test1",
  address: "example street",
};

const imageUri = "http://example.com";
const timestamp = new Date().getTime();

const uploadToRecents = async (user, placeData, outDoorImg) => {
  try {
    await setDoc(doc(db, "recents", "qTad8N7P5VZTP3dscO9ugkzXAaz2"), {
      id: user.uid,
      timestamp: serverTimestamp(),
      placeData: [
        {
          timestamp: new Date(),
          placeDetails: placeData,
          outDoorImg,
        },
      ],
    });
    console.log("[Database] => Place added to recents", err);
  } catch (err) {
    console.log("[Database] => Failed to store place to recents ", err);
  }
};

uploadToRecents("user", placeDetails, imageUri);
