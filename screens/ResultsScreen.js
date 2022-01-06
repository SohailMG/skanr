import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import tw from "tailwind-rn";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import { FOURSQUARE_API_KEY } from "@env";
import { useEffect } from "react";
import axios from "axios";
import { GOOGLE_PLACES_API_KEY, SENTIMENT_API_KEY } from "@env";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MapContainer from "../components/MapContainer";
import { TouchableOpacity } from "react-native";
import BackHomeButton from "../components/BackHomeButton";
import StatsCircle from "../components/StatsCircle";
import PlaceInfo from "../components/PlaceInfo";

const priceLevels = {
  0: ["Free", 10],
  1: ["Inexpensive", 35],
  2: ["Moderate", 50],
  3: ["Expensive", 80],
  4: ["Very Expensive", 100],
};

const ResultsScreen = () => {
  const { scannedText, placeId, imageUri } = useSelector(
    (state) => state.appReducer
  );
  const { placeData } = useSelector((state) => state.placeReducer);
  const latitude = 51.57069107350924;
  const longitude = -0.374277452081281;
  const [nearbyHalalPLaces, setNearbyHalalPLaces] = useState([]);
  const [sentimentTags, setsentimentTags] = useState({
    "P+": ["😍", 100, "Amazing"],
    P: ["😋", 85, "Great"],
    NEU: ["🙂", 50, "Good"],
    N: ["👎 ", 30, "Bad"],
    "N+": ["🤢", 15, "Awful"],
    NONE: "no polarity",
  });
  const [placeDetails, setPlaceDetails] = useState(null);
  const [sentimentTag, setsentimentTag] = useState(null);
  const [analysedReviews, setAnalysedReviews] = useState([]);
  const [isHalal, setIsHalal] = useState(null);
  const [fields, setfields] = useState(
    "name%2Cgeometry%2Crating%2Cformatted_phone_number%2Cprice_level%2Cphotos%2Creviews"
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!placeData) {
        const reviews = await fetchPlaceDetails();
        const sentiment = await analyseReviews(reviews);
        setAnalysedReviews(sentiment);
      } else {
        const sentiment = await analyseReviews(placeData.reviews);
        setAnalysedReviews(sentiment);
        setPlaceDetails(placeData);
      }
      const halalStatus = await fetchHalalPlacesNearby();
      // console.log(placeDetails?.priceLevel);
      setIsHalal(halalStatus);
    };
    fetchData();
  }, [isHalal]);
  const fetchHalalPlacesNearby = async () => {
    var config = {
      method: "get",
      url: `https://api.foursquare.com/v3/places/search?ll=${latitude}%2C${longitude}&categories=13191&sort=DISTANCE`,
      headers: {
        Accept: "application/json",
        Authorization: FOURSQUARE_API_KEY,
      },
    };
    return axios(config)
      .then(function (response) {
        const places = response.data.results;
        // console.log(places);
        for (let place of places) {
          const { name, categories } = place;
          if (categories[0].id == "13191") {
            console.log(placeDetails.name, name);
            if (name.toLowerCase() == placeDetails.name.toLowerCase()) {
              console.log("is Halal");
              return true;
            }
          }
        }
        return false;
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
      const {
        formatted_phone_number,
        photos,
        reviews,
        name,
        rating,
        geometry,
        price_level,
      } = response.data.result;
      const newPlaceDetails = {
        name: name,
        rating: rating,
        number: formatted_phone_number,
        reviews: reviews,
        photos: photos,
        location: geometry.location,
        priceLevel: price_level,
      };
      console.log(name);
      setPlaceDetails(newPlaceDetails);
      return reviews;
    });
  };

  //   perform sentiment analysis on customer reviews

  const analyseReviews = async (reviews) => {
    let reviewBlock = "";
    reviews.slice(0, 5).forEach((review) => {
      const { text } = review;
      reviewBlock += text + " . ";
    });
    const formdata = new FormData();
    formdata.append("key", "442359eba32966a4f2447cccb837593a");
    formdata.append("lang", "en");
    formdata.append("model", "general");
    formdata.append("txt", reviewBlock);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    return fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { score_tag, sentence_list } = result;
        setsentimentTag(score_tag);
        let sentimentArr = [];
        for (let sentenceBlock of sentence_list) {
          const { segment_list } = sentenceBlock;
          for (let segment of segment_list) {
            const { text, score_tag } = segment;
            sentimentArr.push({ text: text, score_tag: score_tag });
          }
        }
        return sentimentArr;

        // console.log(sentence_list[0]["segment_list"][0]["text"]);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={[tw("flex-1 "), { backgroundColor: "#EEEAD8" }]}>
      {/* top half */}
      <View style={[tw("relative h-2/3 "), { backgroundColor: "#B9D8C8" }]}>
        {/* <ImageBackground source={{ uri: imageUri }} style={{ flex: 1 }}> */}
        <SafeAreaView style={[tw("flex  items-center justify-center")]}>
          <View style={tw("absolute top-12 left-5")}>
            <BackHomeButton />
          </View>
          <View
            style={[
              tw("flex flex-row  mt-10"),
              { alignContent: "space-around" },
            ]}
          >
            {sentimentTag && (
              <StatsCircle
                title={"Customer Satisfaction"}
                fillLevel={sentimentTags[sentimentTag][1]}
                hasEmoji={sentimentTags[sentimentTag][0]}
                label={sentimentTags[sentimentTag][2]}
                color={"#F9C53A"}
              />
            )}
            {placeDetails?.priceLevel && (
              <StatsCircle
                title={"Price Level"}
                hasEmoji={"💸"}
                fillLevel={priceLevels[placeDetails?.priceLevel][1]}
                label={priceLevels[placeDetails?.priceLevel][0]}
                color={"#2FB89D"}
              />
            )}
          </View>
          {placeDetails && (
            <PlaceInfo isHalal={isHalal} placeDetails={placeDetails} />
          )}
          {/* rating */}
          {/* review tags */}
        </SafeAreaView>
        {/* </ImageBackground> */}
      </View>
      {/* Bottom half */}
      <View style={[tw("h-40 mx-4 -mt-20"), { borderRadius: 10 }]}>
        {placeDetails && (
          <MapContainer
            location={placeDetails.location}
            restaurant={placeDetails.name}
          />
        )}
      </View>
      <View style={tw("mt-4 flex flex-row")}>
        {/* see images button */}
        <TouchableOpacity
          style={[
            tw("mx-6 mt-6 flex items-center w-40 py-4 rounded-md bg-white"),
            ,
          ]}
        >
          <Entypo name="images" size={50} color="green" />
          <Text style={tw("text-sm font-semibold")}>Food Images</Text>
        </TouchableOpacity>
        {/* Read reviews buttons */}
        <TouchableOpacity
          style={[
            tw(
              "mx-6 mt-6 flex items-center justify-center w-40 py-4 rounded-md bg-white"
            ),
            ,
          ]}
        >
          <View style={tw("flex flex-row items-center ")}>
            {placeDetails?.reviews
              .slice(0, 4)
              .map(({ profile_photo_url }, index) => (
                <Image
                  key={index}
                  source={{ uri: profile_photo_url }}
                  style={tw("h-8 w-8 -ml-4 rounded-full")}
                />
              ))}
            <Text style={tw("text-sm font-semibold text-gray-500")}>
              +{placeDetails?.reviews.length}
            </Text>
          </View>
          <Text style={tw("text-sm font-semibold ")}>customer reviews</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
