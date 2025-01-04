import CircularTimer from "@/components/CircularTimer";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => setIsPaused((prev) => !prev);

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.outerCircle}>
          <CircularTimer isPaused={isPaused} duration={60} />
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
          <Text style={styles.pauseButtonText}>
            {isPaused ? "Resume" : "Pause"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#f5a623",
    shadowOpacity: 0.5,
    shadowRadius: 100,
    shadowOffset: { width: 0, height: 0 },
  },
  pauseButton: {
    backgroundColor: "#333333",
    paddingHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  pauseButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
