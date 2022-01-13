import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import tw from "tailwind-rn";
import { Entypo } from "@expo/vector-icons";
const StatsCircle = ({ color, fillLevel, title, hasEmoji, label }) => {
  return (
    <View style={tw("flex   items-center p-2 m-2 rounded-lg")}>
      <AnimatedCircularProgress
        style={[
          tw(""),
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
        lineCap="round"
        size={100}
        width={5}
        // arcSweepAngle={200}
        rotation={180}
        fill={fillLevel}
        tintColor={color}
        backgroundColor="gray"
      >
        {(fill) => (
          <View style={tw("flex flex-col items-center justify-center")}>
            {hasEmoji && <Text style={{ fontSize: 20 }}>{hasEmoji}</Text>}
            <Text style={{ fontSize: 10, color: "black" }}>{label}</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <Text style={tw("self-center text-center mt-2 ml-2 text-gray-800 ")}>
        {title}
      </Text>
    </View>
  );
};

export default StatsCircle;
