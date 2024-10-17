import { Dimensions, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { React } from "react";
import { userData } from "../assets/fakedata/users";

const { width } = Dimensions.get("window");

const MatchedPerson = ({ userId, handleMatched }) => {
  const user = userData.find((user) => user.id === userId);

  return (
    <TouchableOpacity onPress={() => handleMatched(user)} key={userId}>
      <View style={{ position: "relative" }}>
        <Image
          style={{ width: width / 2.2, height: width / 2, borderRadius: 16 }}
          resizeMode="cover"
          source={{ uri: user?.imageUrl.mainPhoto }}
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
          <Text style={{ color: "white", fontSize: 18 }}>{user?.name}, </Text>
          <Text style={{ color: "white", fontSize: 14 }}>{user?.age}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MatchedPerson;
