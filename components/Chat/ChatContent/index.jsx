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
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Lắng nghe dữ liệu tin nhắn real-time từ Firestore
    const messagesQuery = query(
      collection(database, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);

      // Cuộn xuống cuối khi có tin nhắn mới
      setTimeout(
        () => flatListRef.current?.scrollToEnd({ animated: true }),
        100
      );
    });

    return unsubscribe; // Cleanup listener
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return; // Kiểm tra tin nhắn rỗng

    try {
      await addDoc(collection(database, "messages"), {
        text: message,
        timestamp: Date.now(),
        sender: auth.currentUser?.uid || "anonymous",
        reciver: "anonymous",
      });
      setMessage(""); // Xóa tin nhắn sau khi gửi
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    // Ẩn tab bar khi vào ChatContent
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    // Hiển thị lại tab bar khi rời khỏi ChatContent
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        setTimeout(
          () => flatListRef.current?.scrollToEnd({ animated: true }),
          100
        );
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1, position: "relative" }}>
      <ChatContentHeader />

      <View
        style={{
          paddingHorizontal: 10,
          marginVertical: 20,
          maxHeight: keyboardVisible ? "40%" : "60%",
        }}
      >
        <FlatList
          ref={flatListRef} // Gắn ref vào FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.userId === auth.currentUser?.uid ? (
              <ChatSend message={item} />
            ) : (
              <ChatReceive message={item} />
            )
          }
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          } // Cuộn khi nội dung thay đổi
        />
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
