import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderChat from "../components/Chat/HeaderChat";
import ChatAvatar from "../components/Chat/ChatAvatar";
import ChatPreview from "../components/Chat/ChatPreview";
import { Icon } from "react-native-paper";
import customAxios from "../utils/customAxios";
import { API_ROOT } from "../utils/constants";
import { useSelector } from "react-redux";

function Chat() {
  const [data, setData] = useState([]);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const getlistIdMessenger = async () => {
      const response = await customAxios.get(
        `${API_ROOT}/user/profile/${currentUser.profile.userId}`
      );
      if (response.status === 200) {
        return response.data.listMessenger;
      } else {
        console.log("Lỗi:", response.data.message);
      }
    };

    const getListUser = async () => {
      const listId = await getlistIdMessenger();
      listId.map(async (id) => {
        const response = await customAxios.get(
          `${API_ROOT}/user/profile/${id}`
        );
        if (response.status === 200) {
          setData((prev) => [...prev, response.data]);
        } else {
          console.log("Lỗi:", response.data.message);
        }
      });
    };

    getListUser();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderChat />

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Matches <Text>{data.length}</Text>
        </Text>
        <View style={styles.matches}>
          {data.map((user) => (
            <ChatAvatar key={user.userId} image={user?.imageUrl?.mainPhoto} />
          ))}
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
            {data.map((user) => (
              <ChatPreview key={user.userId} user={user} />
            ))}
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
