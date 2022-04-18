import { Dimensions, StyleSheet, View } from "react-native";
import tw from "tailwind-rn";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-svg-charts";
import { analyseReviews, analyseSentiment } from "../resources/analysSentiment";
import { useSelector } from "react-redux";
import { Circle, G, Line, Text } from "react-native-svg";
import { ProgressChart } from "react-native-chart-kit";

const SentimentPie = ({ placeData }) => {
  const [selectedSlice, setSelectedSlice] = useState({ label: "", value: 0 });
  const [labelWidth, setLabelWidth] = useState(0);
  const { theme } = useSelector((state) => state.themeReducer);
  const [sentimentData, setSentimentData] = useState([]);
  const [shortReviews, setShortReviews] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await analyseReviews(placeData.reviews);
      setShortReviews(response.sentimentArr);
      const sentiments = await analyseSentiment(response);
      setSentimentData(Array.from(sentiments));
    })();
  }, [placeData]);

  const deviceWidth = Dimensions.get("window").width;
  // TODO: Fix pie chart
  return (
    <View style={[tw("flex-1"), { backgroundColor: theme.foreground }]}>
      <PieChart
        data={sentimentData}
        width={Dimensions.get("window").width - 50}
        height={200}
        accessor={"count"}
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
  );
};

export default SentimentPie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
