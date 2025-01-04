import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularTimer = ({ duration = 10, isPaused = false }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const animatedValue = useSharedValue(1);

  useEffect(() => {
    if (isPaused) {
      cancelAnimation(animatedValue);
      return;
    }

    animatedValue.value = withTiming(0, { duration: duration * 1000 });

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedValue.value * 2 * Math.PI * 60,
  }));

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <View style={styles.container}>
        <Svg height="275" width="275" viewBox="0 0 120 120">
          <Circle cx="60" cy="60" r="60" strokeWidth="10" fill="none" />
          <AnimatedCircle
            cx="60"
            cy="60"
            r="60"
            stroke="#FFC145"
            strokeWidth="1"
            fill="none"
            strokeDasharray={2 * Math.PI * 60}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.timerText}>{formatTime(timeLeft)}s</Text>
      </View>
    </>
  );
};

export default CircularTimer;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  timerText: {
    position: "absolute",
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});
