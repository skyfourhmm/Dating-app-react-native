import { Dimensions, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { React } from "react";
import { userData } from "../assets/fakedata/users";

const { width } = Dimensions.get("window");

const MatchedPerson = () => {
  return (
    <View style={{ position: "relative" }}>
      <Image
        style={{ width: width / 2.2, height: width / 2, borderRadius: 16 }}
        resizeMode="cover"
        source={{ uri: userData[0].imageUrl.mainPhoto }}
      />
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          bottom: 10,
          left: 10,
          alignItems: "baseline",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          {userData[0].name},{" "}
        </Text>
        <Text style={{ color: "white", fontSize: 14 }}>{userData[0].age}</Text>
      </View>
    </View>
  );
};
export default MatchedPerson;
