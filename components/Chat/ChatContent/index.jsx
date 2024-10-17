import { StyleSheet, TextInput, View } from "react-native";
import ChatContentHeader from "./ChatContentHeader";
import ChatContentFooter from "./ChatContentFooter";
import ChatSend from "./ChatSend";
import ChatReceive from "./ChatReveice";
import { Icon, IconButton, Text } from "react-native-paper";

const ChatContent = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1, position: "relative" }}>
      <ChatContentHeader />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: "gray", textAlign: "center", marginTop: 20 }}>
          Today
        </Text>
        <ChatSend />
        <ChatReceive />
      </View>

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
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <TextInput
          placeholder="Type a message..."
          style={styles.inputMessage}
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
    </View>
  );
};

const styles = StyleSheet.create({
  suggest: {
    position: "absolute",
    bottom: 70,
    right: 10,
    left: 10,
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
  },
});

export default ChatContent;
