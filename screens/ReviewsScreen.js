import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import { analyseReviews, analyseSentiment } from "../modules/analysSentiment";
import { useSelector } from "react-redux";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import { Chip } from "react-native-ui-lib";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ReviewBox from "../components/ReviewBox";

const ReviewsScreen = () => {
  const { placeData } = useSelector((state) => state.placeReducer);

  const [sentimentData, setSentimentData] = useState(null);
  const [shortReviews, setShortReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await analyseReviews(placeData.reviews);
      setShortReviews(response.sentimentArr);
      const sentiments = await analyseSentiment(response);
      setSentimentData(Array.from(sentiments));
    })();
  }, [placeData]);

  return (
    <SafeAreaView style={[tw("flex-1"), { backgroundColor: "#1E284F" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={tw("self-center text-lg font-semibold text-white")}>
          Place Reviews
        </Text>
        <View style={tw("m-5 mt-10 self-start flex flex-row items-center")}>
          <Text style={tw(" text-lg font-semibold text-white")}>
            Reviews Sentiment
          </Text>
          <AntDesign
            style={tw("ml-2")}
            name="piechart"
            size={24}
            color="cyan"
          />
        </View>
        {sentimentData && (
          <View style={[tw("mx-4 rounded-md"), { backgroundColor: "#394464" }]}>
            <PieChart
              data={sentimentData}
              width={Dimensions.get("window").width - 50}
              height={200}
              accessor={"population"}
              chartConfig={{
                backgroundColor: "transparent",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 50,
                },
              }}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
            />
          </View>
        )}
        <View style={tw("m-5 mt-10 self-start flex flex-row items-center")}>
          <Text style={tw(" text-lg font-semibold text-white")}>
            Customers mentioned
          </Text>
          <MaterialIcons
            style={tw("ml-2")}
            name="sentiment-very-satisfied"
            size={24}
            color="cyan"
          />
        </View>
        <View style={[tw("mx-4 flex flex-row "), { flexWrap: "wrap" }]}>
          {shortReviews?.map(
            ({ text }) =>
              text.length < 30 && (
                <Chip
                  containerStyle={tw("m-1 border border-gray-600")}
                  label={text}
                  labelStyle={tw("text-gray-300")}
                />
              )
          )}
        </View>
        <View style={[tw("mx-4 flex mt-10")]}>
          {placeData?.reviews.map((review) => (
            <ReviewBox lines={0} color={"#6A6F83"} review={review} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({});
