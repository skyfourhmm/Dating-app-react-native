import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ChatSend = ({ message }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.content}>{message.text}</Text>
      <Text style={styles.time}>{formattedTime}</Text>
      {/* <Text style={styles.status}>Seen</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // gap: 5,
    textAlign: "right",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  time: { fontSize: 12, color: "#9599a0" },
  content: {
    backgroundColor: "#00bdd6",
    color: "white",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 10,
    maxWidth: width / 1.5,
  },
  status: { fontSize: 12, color: "#9599a0" },
});
export default ChatSend;
