import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [selectedUserNumber, setSelectedUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const userNumberHandler = (userNumber) => {
    setSelectedUserNumber(userNumber);
  };

  const gameOverHandler = (guessRounds) => {
    setGuessRounds(guessRounds);
  };

  const restartGameHandler = () => {
    setSelectedUserNumber(null);
    setGuessRounds(0);
  };
  let content = <StartGameScreen onStartGame={userNumberHandler} />;

  if (selectedUserNumber && guessRounds <= 0) {
    content = (
      <GameScreen
        userChoice={selectedUserNumber}
        onGameOver={gameOverHandler}
      />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        guessRounds={guessRounds}
        selectedNumber={selectedUserNumber}
        onGameRestart={restartGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
