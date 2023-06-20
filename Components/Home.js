import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [service, setService] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputChange = (text) => {
    if (text.length <= 1000) {
      setInputValue(text);
    }
  };

  const handleAPI = async (endpoint, service) => {
    setService(service);
    setApiResponse("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://write-right-server-nu.vercel.app/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputValue }),
        }
      );

      const data = await response.json();
      setApiResponse(data.data);
    } catch (error) {
      console.error("API request failed:", error);
      setApiResponse("");
      ToastAndroid.show("API request failed", ToastAndroid.SHORT);
      // Handle error
    } finally {
      setIsLoading(false);
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const copyToClipboard = () => {
    Clipboard.setString(apiResponse);
    ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <TextInput
          onChangeText={handleInputChange}
          value={inputValue}
          placeholder="Write better, write smarter..."
          style={styles.input}
          multiline
          numberOfLines={10}
        />
        <Text style={styles.characterCount}>
          Character count: {inputValue.length}/1000
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Rewrite"
            onPress={() => handleAPI("rewrite", "Rewrite")}
            style={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Grammar Check"
            onPress={() => handleAPI("grammar", "Grammar Check")}
            style={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Summarize"
            onPress={() => handleAPI("summarize", "Summarize")}
            style={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Formal Tone"
            onPress={() => handleAPI("formal", "Formal Tone")}
            style={styles.button}
          />
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Icon name="x" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{service} Result</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : (
            <View>
              <Text style={styles.modalText}>{apiResponse}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboard}
              >
                <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  content: {
    width: "95%",
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    minHeight: 200,
  },
  characterCount: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    marginHorizontal: 5,
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  copyButton: {
    backgroundColor: "#2F80ED",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  copyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default Home;
