import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ChatAvatar from "./ChatAvatar";

import { useNavigation } from "@react-navigation/native";

const ChatPreview = ({ user }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ChatContent", { user: user })}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <ChatAvatar
          sizeImage={50}
          sizeStatus={10}
          image={user?.imageUrl?.mainPhoto}
        />
      </View>

      <View style={{ flex: 10, gap: 5 }}>
        <View style={styles.name}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{user.name}</Text>
          <Text style={{ color: "#6f7984", fontSize: 13 }}>1 hours ago</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text>You:</Text>
          <Text>Hello!</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ebfdff",
    flexDirection: "row",
    paddingVertical: 10,
    gap: 40,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  name: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default ChatPreview;
