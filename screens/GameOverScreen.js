import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Game is Over!</Text>
      <Text>Number of Rounds: {props.guessRounds}</Text>
      <Text>Selected Number was: {props.selectedNumber}</Text>
      <Button title="Restart" onPress={() => props.onGameRestart()} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
