import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min) + min);
  if (rndNumber === exclude) {
    generateRandomBetween(min, max, exclude);
  } else {
    return rndNumber;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const [guessRounds, setGuessRounds] = useState(0);

  const currentLower = useRef(1);
  const currentHigher = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guessRounds);
    }
  }, [currentGuess, userChoice, guessRounds]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigher.current = currentGuess;
    } else {
      currentLower.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLower.current,
      currentHigher.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setGuessRounds((guessRounds) => guessRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          onPress={() => nextGuessHandler("lower")}
          title="Lower"
        ></Button>
        <Button
          onPress={() => nextGuessHandler("greater")}
          title="Greater"
        ></Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
