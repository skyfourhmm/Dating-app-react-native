import { View, Image, Text, Dimensions } from "react-native";
import { Chip, IconButton } from "react-native-paper";
import Colors from "../../constants/Colors";
import TagChip from "./TagChip";

const { height } = Dimensions.get("screen");

function BannerInfo({ userData }) {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Image
        style={{ width: "100%", height: height * 0.7, borderRadius: 16 }}
        resizeMode="cover"
        source={{ uri: userData?.imageUrl.mainPhoto }}
      />
      <View style={{ position: "absolute", bottom: -200, left: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#fdfdfd",
              maxWidth: 200,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {userData.name}
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#fdfdfd",
              maxWidth: 200,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {` ,${userData.age}`}
          </Text>
        </View>
        <TagChip
          label={userData.gender}
          bgColor={"#edfbfa"}
          color={Colors.light.secondary}
        />
        <View
          style={{
            flexDirection: "row",
            marginLeft: -15,
            alignItems: "center",
          }}
        >
          <View style={{ width: 30, marginRight: 10 }}>
            <IconButton
              icon="file-outline"
              size={24}
              iconColor={"#edfbfa"}
              onPress={() => {}}
            />
          </View>
          <Text
            style={{
              color: "#edfbfa",
              fontSize: 16,
              fontWeight: 600,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {userData.job}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default BannerInfo;
