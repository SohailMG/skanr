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
      // const testLocation = {
      //   coords: {
      //     accuracy: 12.697312666656831,
      //     altitude: 47.286163330078125,
      //     altitudeAccuracy: 13.256882667541504,
      //     heading: -1,
      //     latitude: 51.553346087611885,
      //     longitude: -0.2945266573585714,
      //     speed: -1,
      //   },
      //   timestamp: 1645118533411.1462,
      // };
      setCurrentLocation(location);
    })();
  }, []);

  return [currentLocation];
};

export default useFetch;
