import { Dimensions, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { React } from "react";
import { userData } from "../assets/fakedata/users";
import { useSelector } from "react-redux";
import { API_ROOT } from "../utils/constants";
import customAxios from "../utils/customAxios";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");

const MatchedPerson = ({ userId, handleMatched }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get(
          `${API_ROOT}/user/profile/${userId}`
        );
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.log("Lỗi:", response.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error.message);
      }
    };

    fetchUsers();
  }, [userId]);

  return (
    <TouchableOpacity onPress={() => handleMatched(user)} key={userId}>
      <View style={{ position: "relative" }}>
        <Image
          style={{ width: width / 2.2, height: width / 2, borderRadius: 16 }}
          resizeMode="cover"
          source={{ uri: user?.imageUrl?.mainPhoto }}
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
