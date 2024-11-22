import { StyleSheet, TextInput, View } from "react-native";
import ChatContentHeader from "./ChatContentHeader";
import ChatContentFooter from "./ChatContentFooter";
import ChatSend from "./ChatSend";
import ChatReceive from "./ChatReveice";
import { Icon, IconButton, Text } from "react-native-paper";
import { useEffect, useState, useCallback } from "react";
import { Keyboard } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const ChatContent = ({ navigation, route }) => {
  const [isShow, setIsShow] = useState(true);
  const handleClose = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    // Ẩn tab bar khi vào ChatContent
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });

    // Hiển thị lại tab bar khi rời khỏi ChatContent
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  const { user } = route.params || {};

  return (
    <View style={{ backgroundColor: "white", flex: 1, position: "relative" }}>
      <ChatContentHeader user={user} />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: "gray", textAlign: "center", marginTop: 20 }}>
          Today
        </Text>
        <ChatSend />
        <ChatReceive />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View>
          <ChatContentFooter />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatContent;
