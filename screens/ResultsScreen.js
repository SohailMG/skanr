import { View, Text, SafeAreaView, Image, ImageBackground } from "react-native";
import { useState } from "react";
import tw from "tailwind-rn";
import { AntDesign } from "@expo/vector-icons";
import { FOURSQUARE_API_KEY } from "@env";
import { useEffect } from "react";
import axios from "axios";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";

const ResultsScreen = () => {
  const latitude = 51.57069107350924;
  const longitude = -0.374277452081281;
  const { scannedText, placeId, imageUri } = useSelector(
    (state) => state.appReducer
  );
  const [nearbyHalalPLaces, setNearbyHalalPLaces] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [placeIds, setPlaceIds] = useState(null);
  const [isHalal, setIsHalal] = useState(false);
  const [fields, setfields] = useState(
    "name%2Crating%2Cformatted_phone_number%2Cphotos%2Creviews"
  );

  useEffect(() => {
    // //   await fetchHalalPlacesNearby();

    // // await fetchPlaceImages();
    const fetchData = async () => {
      const reviews = await fetchPlaceDetails();
      analyseReviews(reviews);
    };
    fetchData();
  }, []);
  const fetchHalalPlacesNearby = async () => {
    var config = {
      method: "get",
      url: `https://api.foursquare.com/v3/places/search?ll=${latitude}%2C${longitude}&categories=13191&sort=DISTANCE`,
      headers: {
        Accept: "application/json",
        Authorization: FOURSQUARE_API_KEY,
      },
    };
    axios(config)
      .then(function (response) {
        const data = response.data.results;

        setNearbyHalalPLaces(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // get place image from photo refrence
  const fetchPlaceImages = () => {
    const photoRef = matchedPlaceDetails.thumbNail.photo_reference;

    console.log("ref -> " + photoRef);
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`;

    axios
      .get(url)
      .then(function (response) {
        const newPlaceData = matchedPlaceDetails;
        newPlaceData.photoUrl = response.request.responseURL;
        setmatchedPlaceDetails(newPlaceData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // get place details from google places api
  const fetchPlaceDetails = async () => {
    // console.log(placeIds);
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_PLACES_API_KEY}`;

    return axios.get(url).then((response) => {
      // console.log(response.data);
      const { formatted_phone_number, photos, reviews, name, rating } =
        response.data.result;
      const newPlaceDetails = {
        name: name,
        rating: rating,
        number: formatted_phone_number,
        reviews: reviews,
        photos: photos,
      };
      setPlaceDetails(newPlaceDetails);
      return reviews;
    });
  };

  //   perform sentiment analysis on customer reviews

  const analyseReviews = (reviews) => {
    // const { reviews } = placeDetails;
    for (let review of reviews) {
      // console.log(review.text);
    }
  };

  return (
    <View>
      {/* top half */}
      <View style={[tw(""), { height: "70%" }]}>
        <ImageBackground source={{ uri: imageUri }} style={{ flex: 1 }}>
          <SafeAreaView
            style={[
              tw("flex  items-center justify-center"),
              { backgroundColor: "rgba(0,0,0, 0.60)" },
            ]}
          >
            <Text
              style={tw(
                "mt-4 text-3xl text-center text-green-500 font-semibold"
              )}
            >
              {placeDetails?.name}
            </Text>
            <Text style={tw("mt-10 text-3xl text-white font-semibold")}>
              Halal
            </Text>
            <AntDesign
              style={tw("mt-2")}
              name="checkcircle"
              size={30}
              color="green"
            />
            {/* rating */}
            <View
              style={tw(
                "flex mb-4 flex-row items-center bg-gray-600 rounded-md p-2 self-start ml-10"
              )}
            >
              <Text style={tw("text-lg mr-2 font-semibold text-white")}>
                {placeDetails?.rating}
              </Text>
              <AntDesign name="star" size={24} color="yellow" />
            </View>
            {/* review tags */}
            <View style={tw("self-start ml-10 mt-2")}>
              <Text style={tw("text-gray-200 font-semibold")}>
                Customers mentioned
              </Text>
              <View
                style={tw(
                  "flex  flex-row mt-2 items-center overflow-scroll mx-2"
                )}
              >
                <ScrollView horizontal={false} style={{ height: 100 }}>
                  {placeDetails?.reviews.map(({ text, author_name }, index) => (
                    <View>
                      <Text style={tw("text-md text-gray-200 font-semibold")}>
                        {author_name}
                      </Text>
                      <Text
                        key={index}
                        style={tw(
                          "text-white mr-2 bg-gray-800 rounded-full p-2 mt-2"
                        )}
                      >
                        {text}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
      {/* Bottom half */}
      <View
        style={[
          tw("bg-white "),
          { borderTopRightRadius: 50, borderTopLeftRadius: 50, flex: 1 },
        ]}
      >
        {/* {placeDetails.photoUrl && (
          <Image
            source={{
              uri: placeDetails.photoUrl,
            }}
            style={tw("w-40 h-40")}
          />
        )} */}
      </View>
    </View>
  );
};

export default ResultsScreen;
