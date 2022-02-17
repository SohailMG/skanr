import {
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
  orderBy,
  collection,
} from "@firebase/firestore";
import { db } from "../firebase";

export const storePlaceToRecents = async (user, newPlaceData, outDoorImg) => {
  // fetching recent records
  const records = await fetchRecentsFromDb(user);
  if (!records) {
    uploadToRecents(user, newPlaceData, outDoorImg);
    return;
  } else {
    // checking record already exists in the database
    const exists = alreadyExists(records, newPlaceData.placeId);
    console.log(exists);
    // adding to current record if record is new
    if (!exists) updateRecents(records, newPlaceData, user, outDoorImg);
  }
};

export const uploadToRecents = async (user, placeData, outDoorImg) => {
  if (!user || !placeData || !outDoorImg) return;
  setDoc(doc(db, "recents", user.uid), {
    id: user.uid,
    timestamp: serverTimestamp(),
    placeData: [
      {
        placeId: placeData.placeId,
        timestamp: new Date(),
        placeDetails: JSON.parse(
          JSON.stringify(placeData, (k, v) => (v === undefined ? null : v))
        ),
        outDoorImg,
      },
    ],
  })
    .then(() => {
      console.log("[Database] => Added place to recents collection");
    })
    .catch((error) => {
      console.log(
        "[Database] => Error tring to store place to recents collection",
        error.message
      );
    });
};
export const fetchRecentsFromDb = async (user) => {
  const docRef = doc(db, "recents", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { placeData } = docSnap.data();
    return placeData;
  } else {
    return false;
  }
};

export const updateRecents = async (
  placesArr,
  newPlaceData,
  user,
  outDoorImg
) => {
  if (!user || !newPlaceData || !outDoorImg) return;
  const docRef = doc(db, "recents", user.uid);
  //   console.log(recentPlacesArr);
  updateDoc(docRef, {
    placeData: [
      ...placesArr,
      {
        placeId: newPlaceData.placeId,
        placeDetails: JSON.parse(
          JSON.stringify(newPlaceData, (k, v) => (v === undefined ? null : v))
        ),
        timestamp: new Date(),
        outDoorImg,
      },
    ],
  })
    .then(() =>
      console.log(
        "[Database] => Updated recents collection for user " + user.uid
      )
    )
    .catch((error) => {
      console.log(
        "[Database] => Error updating recents collection",
        error.message
      );
    });
};

export const storeLabelledImages = async (images, placeId) => {
  const docRef = doc(db, "Gallery", placeId);
  const docSnap = await getDoc(docRef);

  setDoc(doc(db, "Gallery", placeId), {
    id: placeId,
    timestamp: serverTimestamp(),
    labelledImages: images,
  })
    .then(() => {
      console.info("[Database] => Stored Labelled Images ");
    })
    .catch((error) => {
      console.error(
        "[Database] => Failed to store Labelled Images -> ",
        error.message
      );
    });
};

export const fetchPlaceGallery = async (placeId) => {
  const docRef = doc(db, "Gallery", placeId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("[Database] => Fetching pre-labelled images");
    return docSnap.data();
  } else {
    return false;
  }
};

const alreadyExists = (records, placeId) => {
  for (let record of records) {
    // console.log(record.placeId == placeId);
    if (record.placeId == placeId) return true;
  }
  return false;
};
