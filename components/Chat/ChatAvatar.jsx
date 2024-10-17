import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { userData } from "../../assets/fakedata/users";

const ChatAvatar = ({ sizeImage = 100, sizeStatus = 20 }) => {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={sizeImage}
        source={{ uri: userData[0]?.imageUrl.mainPhoto }}
      />
      <Avatar.Text size={sizeStatus} style={styles.status} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  avata: {},
  status: {
    position: "absolute",
    backgroundColor: "#1dd75b",
    bottom: 0,
    right: 5,
  },
});

export default ChatAvatar;
