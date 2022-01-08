import {
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import { db } from "../firebase";

export const storePlaceToRecents = async (user, newPlaceData) => {
  //   console.log(user.uid);
  const results = await fetchRecentsFromDb(user);
  // console.log(results);

  if (results) {
    let exists;
    results.forEach(({ placeDetails }) => {
      const { name } = placeDetails;
      console.log(name === newPlaceData.name);
      if (name === newPlaceData.name) {
        exists = true;
        return;
      } else {
        exists = false;
        return;
      }
    });
    if (!exists) {
      updateRecents(results, newPlaceData, user);
    }
  } else {
    addToDb(user, newPlaceData);
  }
};

export const addToDb = async (user, placeData) => {
  setDoc(doc(db, "recents", user.uid), {
    id: user.uid,
    timestamp: serverTimestamp(),
    placeData: [
      {
        timestamp: new Date(),
        placeDetails: placeData,
      },
    ],
  })
    .then(() => {
      console.log("added to recents");
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};
export const fetchRecentsFromDb = async (user) => {
  const docRef = doc(db, "recents", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { placeData, timestamp } = docSnap.data();
    return placeData;
  } else {
    return false;
  }
};

export const updateRecents = async (placesArr, newPlaceData, user) => {
  // console.log(user);
  const docRef = doc(db, "recents", user.uid);
  //   console.log(recentPlacesArr);
  updateDoc(docRef, {
    placeData: [
      ...placesArr,
      { placeDetails: newPlaceData, timestamp: new Date() },
    ],
  })
    .then(() => console.log("updated recents"))
    .catch((error) => {
      console.log("error", error.message);
    });
};
