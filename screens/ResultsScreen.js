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

const ResultsScreen = () => {
  const { scannedText, placeId, imageUri } = useSelector(
    (state) => state.appReducer
  );
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
  const [isHalal, setIsHalal] = useState(false);
  const [fields, setfields] = useState(
    "name%2Cgeometry%2Crating%2Cformatted_phone_number%2Cphotos%2Creviews"
  );

  useEffect(() => {
    const fetchData = async () => {
      const reviews = await fetchPlaceDetails();
      const sentiment = await analyseReviews(reviews);
      setAnalysedReviews(sentiment);
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
      const {
        formatted_phone_number,
        photos,
        reviews,
        name,
        rating,
        geometry,
      } = response.data.result;
      const newPlaceDetails = {
        name: name,
        rating: rating,
        number: formatted_phone_number,
        reviews: reviews,
        photos: photos,
        location: geometry.location,
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
    var formdata = new FormData();
    formdata.append("key", "442359eba32966a4f2447cccb837593a");
    formdata.append("lang", "en");
    formdata.append("model", "general");
    formdata.append("txt", reviewBlock);

    var requestOptions = {
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
    <View style={tw("flex-1 ")}>
      {/* top half */}
      <View style={[tw("h-1/2 bg-gray-800")]}>
        {/* <ImageBackground source={{ uri: imageUri }} style={{ flex: 1 }}> */}
        <SafeAreaView style={[tw("flex  items-center justify-center")]}>
          {sentimentTag && (
            <AnimatedCircularProgress
              style={[
                tw("mt-4"),
                {
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                },
              ]}
              size={150}
              width={10}
              arcSweepAngle={200}
              rotation={260}
              fill={sentimentTags[sentimentTag][1]}
              tintColor="#F9C53A"
              backgroundColor="#FBFBFB"
            >
              {(fill) => (
                <View style={tw("flex flex-col items-center justify-center")}>
                  <Text style={tw("text-3xl")}>
                    {sentimentTags[sentimentTag][0]}
                  </Text>
                  <Text style={tw("text-sm font-semibold text-white")}>
                    {sentimentTags[sentimentTag][2]}
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          )}
          <Text
            style={tw(
              "mb-2 text-3xl text-center text-white font-semibold truncate"
            )}
          >
            <MaterialIcons name="food-bank" size={24} color="white" />
            {placeDetails?.name}
          </Text>
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
        <TouchableOpacity
          style={[
            tw("mx-6 mt-6 flex items-center w-40 py-4 rounded-md bg-white"),
            styles.shadowStyle,
          ]}
        >
          <Entypo name="images" size={50} color="green" />
          <Text style={tw("text-sm font-semibold")}>Food Images</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw("mx-6 mt-6 flex items-center w-40 py-4 rounded-md bg-white"),
            styles.shadowStyle,
          ]}
        >
          <MaterialIcons name="rate-review" size={50} color="orange" />
          <Text style={tw("text-sm font-semibold ")}>Read Reviews</Text>
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
