import { useState, useEffect } from "react";
import * as Location from "expo-location";
const useFetch = () => {
  // storing location object in state
  const [currentLocation, setCurrentLocation] = useState(null);
  // triggers once the component mounts
  useEffect(() => {
    (async () => {
      // asking user for location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      // if user doesn't give permission
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      // updating currentLocation state
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  return [currentLocation];
};

export default useFetch;
