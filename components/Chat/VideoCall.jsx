import { useNavigation } from "@react-navigation/native";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";
import { Appbar, Avatar, IconButton, Text } from "react-native-paper";
import { userData } from "../../assets/fakedata/users";
import Colors from "@/constants/Colors";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const VideoCall = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: userData[0]?.imageUrl.mainPhoto }}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Appbar.Header style={styles.header}>
          <Appbar.Action
            size={30}
            icon={"chevron-down"}
            color="white"
            onPress={() => navigation.navigate("Chat")}
          />
          <Appbar.Content title="" />
          <Appbar.Action
            icon={MORE_ICON}
            size={30}
            color="white"
            onPress={() => {}}
          />
        </Appbar.Header>

        <View style={{ alignItems: "center", flex: 1, position: "relative" }}>
          <View>
            <View style={{ alignItems: "center" }}>
              <Avatar.Image
                size={150}
                source={{ uri: userData[0]?.imageUrl.mainPhoto }}
                style={styles.imageAvatar}
              />
            </View>
            <Text
              variant="headlineLarge"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
              }}
            >
              Ava Jones
            </Text>
            <Text
              variant="titleSmall"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
              }}
            >
              Calling...
            </Text>
          </View>

          <View style={styles.action}>
            <IconButton
              icon="autorenew"
              size={30}
              iconColor={"black"}
              mode="contained"
              containerColor={"white"}
            />
            <IconButton
              icon="microphone-outline"
              size={30}
              iconColor={"black"}
              mode="contained"
              containerColor={"white"}
            />
            <IconButton
              icon="phone-outline"
              size={30}
              iconColor={"white"}
              mode="contained"
              containerColor={"red"}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    marginTop: -20,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    gap: 150,
  },
  imageAvatar: {},
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 50,
    gap: 10,
    marginTop: 150,
  },
});
export default VideoCall;
