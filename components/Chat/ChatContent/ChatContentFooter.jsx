import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import { IconButton, Icon } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { auth } from "@/utils/firebaseConfigWebApp";
// import { getApps, initializeApp } from "firebase/app";
// import firebaseConfig from "../utils/firebaseConfigWebApp";

const ChatContentFooter = () => {
  const sizeIcon = 20;
  const [selectedIcon, setSelectedIcon] = useState("lightbulb-outline");
  const [isShow, setIsShow] = useState(true);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("Oh Fuck Offfff");

  // Khi bàn phím được bật, isShow = false, selectdIcon = null
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShow(false);
        setSelectedIcon(null);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShow(true);
        // setSelectedIcon("lightbulb-outline");
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleClose = () => {
    setIsShow(!isShow);
  };

  const handlePress = (iconName) => {
    setSelectedIcon(iconName);
    if (selectedIcon === iconName) setSelectedIcon(null);
  };

  const handleSendMessage = () => {
    alert(message);
    setMessage("");
    console.log(auth.currentUser.uid);
  };

  // const [message, setMessage] = useState("God");
  // const [messages, setMessages] = useState([]);
  // const handleSendMessage = () => {
  //   const db = getDatabase();
  //   const messageRef = ref(db, "messages/testMessage");
  //   set(messageRef, {
  //     text: message,
  //     timestamp: Date.now(),
  //   })
  //     .then(() => {
  //       console.log("Message sent successfully");
  //       setMessage(""); // Clear the input after sending the message
  //     })
  //     .catch((error) => {
  //       console.error("Error sending message:", error);
  //     });
  // };

  // useEffect(() => {
  //   const db = getDatabase();
  //   const messagesRef = ref(db, "messages");
  //   onValue(messagesRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const messagesArray = Object.keys(data).map((key) => ({
  //         id: key,
  //         ...data[key],
  //       }));
  //       setMessages(messagesArray);
  //     }
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      {isShow && selectedIcon == "lightbulb-outline" && (
        <View style={styles.suggest}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Icon source="lightbulb-outline" color="#2cc9dd" size={15} />
            <Text style={{ color: "#2cc9dd" }} variant="titleSmall">
              Invite your match to play a mini-game.
            </Text>
          </View>
          <Text variant="bodySmall" style={{ fontSize: 10 }}>
            Break the ice and find out if you both sync on a depper level.
          </Text>
          <View style={{ position: "absolute", top: -10, right: -10 }}>
            <IconButton
              icon="close"
              iconColor="#2cc9dd"
              size={20}
              onPress={handleClose}
            />
          </View>
        </View>
      )}

      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          marginBottom: 50,
        }}
      >
        <TextInput
          placeholder="Type a message..."
          style={styles.inputMessage}
          value={message}
          onChangeText={setMessage}
        />
        <View style={styles.icon}>
          <IconButton
            icon="emoticon-happy-outline"
            color="black"
            size={24}
            onPress={() => alert("Icon")}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          icon="plus-circle-outline"
          size={sizeIcon}
          iconColor={
            selectedIcon === "plus-circle-outline"
              ? "white"
              : Colors.light.secondary
          }
          containerColor={
            selectedIcon === "plus-circle-outline"
              ? Colors.light.secondary
              : "transparent"
          }
          onPress={() => handlePress("plus-circle-outline")}
        />
        <IconButton
          icon="lightbulb-outline"
          size={sizeIcon}
          iconColor={
            selectedIcon === "lightbulb-outline"
              ? "white"
              : Colors.light.secondary
          }
          containerColor={
            selectedIcon === "lightbulb-outline"
              ? Colors.light.secondary
              : "transparent"
          }
          onPress={() => handlePress("lightbulb-outline")}
        />
        <IconButton
          icon="image"
          size={sizeIcon}
          iconColor={
            selectedIcon === "image" ? "white" : Colors.light.secondary
          }
          containerColor={
            selectedIcon === "image" ? Colors.light.secondary : "transparent"
          }
          onPress={() => handlePress("image")}
        />
        <IconButton
          icon="camera"
          size={sizeIcon}
          iconColor={
            selectedIcon === "camera" ? "white" : Colors.light.secondary
          }
          containerColor={
            selectedIcon === "camera" ? Colors.light.secondary : "transparent"
          }
          onPress={() => handlePress("camera")}
        />
        <IconButton
          icon="microphone-outline"
          size={sizeIcon}
          iconColor={
            selectedIcon === "microphone-outline"
              ? "white"
              : Colors.light.secondary
          }
          containerColor={
            selectedIcon === "microphone-outline"
              ? Colors.light.secondary
              : "transparent"
          }
          onPress={() => handlePress("microphone-outline")}
        />
      </View>

      <View>
        <IconButton
          icon="send"
          size={sizeIcon}
          iconColor={Colors.light.secondary}
          onPress={() => handleSendMessage()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  inputMessage: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 20,
  },
  icon: {
    position: "absolute",
    right: 20,
    top: -5,
  },
  suggest: {
    position: "absolute",
    bottom: 90,
    marginBottom: 10,
    left: 30,
    backgroundColor: "#ebfdff",
    alignItems: "flex-start",
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ChatContentFooter;
