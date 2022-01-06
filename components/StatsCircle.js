import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import tw from "tailwind-rn";
const StatsCircle = ({ color, fillLevel, title, hasEmoji, label }) => {
  return (
    <View style={tw("bg-white flex items-center p-2 m-2 rounded-lg")}>
      <Text style={tw("text-xs text-gray-800 font-semibold mb-4")}>
        {title}
      </Text>
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
        size={150}
        width={10}
        arcSweepAngle={200}
        rotation={260}
        fill={fillLevel}
        tintColor={color}
        backgroundColor="#FBFBFB"
      >
        {(fill) => (
          <View style={tw("flex flex-col items-center justify-center")}>
            {hasEmoji && <Text style={tw("text-3xl")}>{hasEmoji}</Text>}
            <Text style={tw("text-sm font-semibold text-green-800")}>
              {label}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default StatsCircle;
