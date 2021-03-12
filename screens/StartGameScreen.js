import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleValueInput = (textInput) => {
    setEnteredValue(textInput.replace(/[^0-9]/g, ""));
  };

  const confirmHandler = () => {
    const chosenValue = parseInt(enteredValue);
    if (isNaN(chosenValue) || chosenValue <= 0 || chosenValue > 99) {
      Alert.alert("Invalid Value", "The value has to be in between 1 and 99", [
        { text: "Ok", style: "destructive", onPress: resethandler },
      ]);
      return;
    }
    setIsConfirmed(true);
    setSelectedValue(chosenValue);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  const resethandler = () => {
    setEnteredValue("");
    setIsConfirmed(false);
  };

  let confrimedoutput;
  if (isConfirmed) {
    confrimedoutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>
          <Text>{selectedValue}</Text>
        </NumberContainer>
        <Button
          title="Start Game"
          onPress={() => props.onStartGame(selectedValue)}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select the Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            value={enteredValue}
            onChangeText={handleValueInput}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={Colors.secondary}
                onPress={resethandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={Colors.primary}
                title="Confirm"
                onPress={confirmHandler}
              />
            </View>
          </View>
        </Card>
        {confrimedoutput}
      </View>
    </TouchableWithoutFeedback>
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
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default StartGameScreen;
