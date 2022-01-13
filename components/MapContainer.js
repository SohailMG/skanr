import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-rn";
const MapContainer = ({ location, restaurant }) => {
  const { lat, lng } = location;

  return (
    <MapView
      scrollEnabled={false}
      style={[
        tw("flex-1"),
        { borderRadius: 20, height: 150, backgroundColor: "#000" },
      ]}
      initialRegion={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      }}
    >
      {lat && (
        <Marker
          pinColor="green"
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
