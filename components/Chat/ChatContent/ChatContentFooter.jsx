import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useState } from "react";

const ChatContentFooter = () => {
  const sizeIcon = 20;
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handlePress = (iconName) => {
    setSelectedIcon(iconName);
  };

  const handleSendMessage = () => {
    alert("Send message");
  };

  return (
    <View style={styles.container}>
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
          // iconColor={selectedIcon === "send" ? "white" : Colors.light.secondary}
          // containerColor={
          //   selectedIcon === "send" ? Colors.light.secondary : "transparent"
          // }
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
});

export default ChatContentFooter;
