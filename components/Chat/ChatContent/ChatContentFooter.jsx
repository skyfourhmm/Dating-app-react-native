import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import Colors from "@/constants/Colors";

const ChatContentFooter = () => {
  const sizeIcon = 20;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          icon="plus-circle-outline"
          size={sizeIcon}
          iconColor={Colors.light.secondary}
          // mode="contained"
          // containerColor={Colors.light.secondary}
        />
        <IconButton
          icon="lightbulb-outline"
          size={sizeIcon}
          mode="contained"
          iconColor="white"
          containerColor={Colors.light.secondary}
        />
        <IconButton
          icon="image"
          size={sizeIcon}
          iconColor={Colors.light.secondary}
          // mode="contained"
          // containerColor={Colors.light.secondary}
        />
        <IconButton
          icon="camera"
          size={sizeIcon}
          iconColor={Colors.light.secondary}
          // mode="contained"
          // containerColor={Colors.light.secondary}
        />
        <IconButton
          icon="microphone-outline"
          size={sizeIcon}
          iconColor={Colors.light.secondary}
          // mode="contained"
          // containerColor={Colors.light.secondary}
        />
      </View>

      <View>
        <IconButton
          icon="send"
          size={sizeIcon}
          iconColor={Colors.light.secondary}
          // mode="contained-tonal"
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
