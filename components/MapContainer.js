import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-rn";
const MapContainer = ({ location, restaurant }) => {
  const { lat, lng } = location;
  return (
    <MapView
      style={tw("flex-1 rounded-lg")}
      initialRegion={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      }}
    >
      {lat && (
        <Marker
          title={restaurant}
          coordinate={{
            latitude: lat,
            longitude: lng,
          }}
        />
      )}
    </MapView>
  );
};

export default MapContainer;
