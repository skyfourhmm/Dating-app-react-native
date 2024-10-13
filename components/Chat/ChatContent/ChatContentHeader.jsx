import { Image, View, Text } from "react-native";
import { Appbar, Avatar, Icon, IconButton } from "react-native-paper";
import { Platform } from "react-native";
import { userData } from "../../../assets/fakedata/users";
import { useNavigation } from "expo-router";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const ChatContentHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderColor: "#e7e9ed",
      }}
    >
      <View
        style={{
          marginTop: -30,
          backgroundColor: "white",
          marginHorizontal: -20,
        }}
      >
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.navigate("Chat")} />
          <Appbar.Content title="" />
          <Appbar.Action
            icon="video-outline"
            size={30}
            onPress={() => navigation.navigate("VideoCall")}
          />
          <Appbar.Action icon={MORE_ICON} size={30} onPress={() => {}} />
        </Appbar.Header>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: userData[0]?.imageUrl.mainPhoto }}
            style={{ height: 100, width: 100, borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>

        <View style={{ flex: 2 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Ava Jones, 25
              </Text>
              <Icon source="shield-check" color="#379ae6" size={12} />
            </View>

            <View>
              <IconButton
                icon="chevron-right"
                size={20}
                mode="contained"
                iconColor="#006d7c"
                containerColor={"#c8f9ff"}
                onPress={() => {}}
              />
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#34cadc",
                fontWeight: "bold",
                backgroundColor: "#ebfdff",
                maxWidth: 100,
                padding: 5,
                textAlign: "center",
                borderRadius: 20,
              }}
            >
              she/ her/ hers
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Icon source="folder-outline" color="gray" size={20} />
            <Text>Business Analyst at Tech</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ChatContentHeader;
