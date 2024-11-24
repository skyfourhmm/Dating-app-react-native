import { StyleSheet, View, FlatList, Keyboard } from "react-native";
import ChatContentHeader from "./ChatContentHeader";
import ChatContentFooter from "./ChatContentFooter";
import ChatSend from "./ChatSend";
import ChatReceive from "./ChatReveice";
import { useEffect, useState, useRef } from "react";
import { auth, database } from "@/utils/firebaseConfigWebApp";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

const ChatContent = ({ navigation }) => {
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

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <ChatContentFooter
          message={message}
          setMessage={setMessage}
          onSend={sendMessage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatContent;
