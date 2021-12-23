import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ["#a2b9bc", "#b2ad7f", "#878f99", "#6b5b95"];

const AnimatedStroke = ({ d, progress }) => {
  const [length, setLength] = useState(0);
  const stroke = colors[Math.floor(Math.random() * (colors.length -1))]
  const ref = useRef(null);
  const bgStrokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset: length - length * progress.value,
  }));
  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset: length - length * progress.value,
  }));
  return (
    <>
      <AnimatedPath
        animatedProps={bgStrokeAnimation}
        progress={progress}
        ref={ref}
        d={d}
        stroke={"black"}
        strokeWidth={10}
        strokeDasharray={length}
      />
      <AnimatedPath
        animatedProps={strokeAnimation}
        progress={progress}
        onLayout={() => setLength(ref.current.getTotalLength())}
        ref={ref}
        d={d}
        stroke={stroke}
        strokeWidth={10}
        strokeDasharray={length}
      />
    </>
  );
};

export default AnimatedStroke;

const styles = StyleSheet.create({});
