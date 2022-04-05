import { Dimensions, StyleSheet, View } from "react-native";
import tw from "tailwind-rn";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-svg-charts";
import { analyseReviews, analyseSentiment } from "../modules/analysSentiment";
import { useSelector } from "react-redux";
import { Circle, G, Line, Text } from "react-native-svg";
const Labels = ({ slices }) => {
  const { theme } = useSelector((state) => state.themeReducer);
  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;
    console.log(data);
    return (
      <G key={index}>
        <Line
          x1={labelCentroid[0]}
          y1={labelCentroid[1]}
          x2={pieCentroid[0]}
          y2={pieCentroid[1]}
          stroke={data.svg.fill}
        />
        <Text
          x={labelCentroid[0]}
          y={labelCentroid[1]}
          stroke={theme.fontColor}
          stroke-width="2px"
          dx={-10 / 2}
        >
          {data.value}
        </Text>
      </G>
    );
  });
};
const SentimentPie = ({ placeData }) => {
  const [selectedSlice, setSelectedSlice] = useState({ label: "", value: 0 });
  const [labelWidth, setLabelWidth] = useState(0);
  const { theme } = useSelector((state) => state.themeReducer);
  const [sentimentData, setSentimentData] = useState(null);
  const [shortReviews, setShortReviews] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await analyseReviews(placeData.reviews);
      setShortReviews(response.sentimentArr);
      const sentiments = await analyseSentiment(response);
      setSentimentData(Array.from(sentiments));
      const values = Array.from(sentiments).map((sentiment) => sentiment.count);
      const colors = Array.from(sentiments).map((sentiment) => sentiment.color);
      const keys = Array.from(sentiments).map((sentiment) => sentiment.name);
      const data = values
        .filter((value) => value > 0)
        .map((value, index) => ({
          value,
          svg: { fill: colors[index] },
          key: `pie-${index}`,
          label: `${value}`,
        }));
      setPieData(data);
    })();
  }, [placeData]);

  const deviceWidth = Dimensions.get("window").width;
  // TODO: Fix pie chart
  return (
    <View style={[tw(), { justifyContent: "center", flex: 1 }]}>
      <PieChart
        style={{ height: 200 }}
        data={pieData}
        innerRadius={20}
        outerRadius={60}
        labelRadius={90}
      >
        <Labels />
      </PieChart>
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
