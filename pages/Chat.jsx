import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderChat from "../components/Chat/HeaderChat";
import ChatAvatar from "../components/Chat/ChatAvatar";
import ChatPreview from "../components/Chat/ChatPreview";
import { Icon } from "react-native-paper";

function Chat() {
  return (
    <View style={styles.container}>
      <HeaderChat />

      <View style={{ marginTop: 15 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Matches <Text>(7)</Text>
        </Text>
        <View style={styles.matches}>
          <ChatAvatar />
          <ChatAvatar />
          <ChatAvatar />
          <ChatAvatar />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Chats <Text>(1)</Text>
          </Text>
          <Icon source="filter-variant" size={25} />
        </View>
        <ScrollView>
          <View style={styles.chats}>
            <ChatPreview />
            <ChatPreview />
            <ChatPreview />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  matches: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#e7e9ed",
  },
  chats: {
    gap: 10,
    marginTop: 10,
  },
});

export default Chat;
