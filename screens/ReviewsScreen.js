import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import { analyseReviews, analyseSentiment } from "../resources/analysSentiment";
import { useSelector } from "react-redux";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import { Chip } from "react-native-ui-lib";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ReviewBox from "../components/ReviewBox";
import { BallIndicator } from "react-native-indicators";
import Loading from "../components/loaders/Loading";

const ReviewsScreen = () => {
  const { placeData } = useSelector((state) => state.placeReducer);
  const { theme } = useSelector((state) => state.themeReducer);

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

  if (!sentimentData)
    return <Loading text={"loading reviews...."} color={theme.background} />;

  return (
    <SafeAreaView style={[tw("flex-1"), { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[
            tw("self-center text-lg font-semibold "),
            { color: theme.fontColor },
          ]}
        >
          Place Reviews
        </Text>
        <View style={tw("m-5 mt-10 self-start flex flex-row items-center")}>
          <Text
            style={[tw(" text-lg font-semibold "), { color: theme.fontColor }]}
          >
            Reviews Sentiment
          </Text>
          <AntDesign
            style={tw("ml-2")}
            name="piechart"
            size={24}
            color="black"
          />
        </View>
        {sentimentData && (
          <View
            style={[
              tw("mx-4 rounded-md"),
              { backgroundColor: theme.foreground },
            ]}
          >
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
        <View style={[tw("m-5 mt-10 self-start flex flex-row items-center")]}>
          <Text
            style={[tw(" text-lg font-semibold "), { color: theme.fontColor }]}
          >
            Customers mentioned
          </Text>
          <MaterialIcons
            style={tw("ml-2")}
            name="sentiment-very-satisfied"
            size={24}
            color="black"
          />
        </View>
        <View style={[tw("mx-4 flex flex-row "), { flexWrap: "wrap" }]}>
          {shortReviews?.map(
            ({ text, score_tag }) =>
              text.length < 30 &&
              text.length > 4 && (
                <Chip
                  iconStyle={{ height: 10, width: 10 }}
                  containerStyle={tw(
                    `m-1  p-2 ${score_tag.includes("P") && "bg-green-500"} ${
                      score_tag == "N+" || (score_tag == "N" && "bg-red-500")
                    }`
                  )}
                  label={text}
                  labelStyle={tw("text-gray-600")}
                />
              )
          )}
        </View>
        <View style={[tw("mx-4 flex mt-10")]}>
          {placeData?.reviews.map((review) => (
            <ReviewBox lines={0} color={theme.foreground} review={review} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: "#CCCCCC",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
});
