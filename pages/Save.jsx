import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TextInput } from "react-native";
import { Text } from "react-native-paper";
import MatchedPerson from "../components/MatchedPerson";
import { useSelector } from "react-redux";
import MatchedProfile from "../components/common/MatchedProfile";
import customAxios from "../utils/customAxios";
import { API_ROOT } from "../utils/constants";

import AntDesign from "@expo/vector-icons/AntDesign";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  listPerson: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
});

function Save() {
  const currentUser = useSelector((state) => state.user);
  const [userListMatched, setUserListMatched] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get(
          `${API_ROOT}/user/profile/${currentUser.profile.userId}`
        );
        if (response.status === 200) {
          setUserListMatched(response.data.listMatched);
        } else {
          console.log("Lỗi:", response.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error.message);
      }
    };

    fetchUsers();
  }, [userListMatched]);

  const [dataUser, setDataUser] = useState({});

  const handleMatched = (data) => {
    setDataUser(data);
  };

  return (
    <ScrollView style={styles.container}>
      {Object.keys(dataUser).length !== 0 ? (
        <MatchedProfile dataUser={dataUser} setDataUser={setDataUser} />
      ) : (
        <View style={{ marginTop: 10, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={{ paddingRight: 15 }}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </View>
            <TextInput
              placeholder="Find someone you've matched with..."
              style={{
                width: "90%",
                backgroundColor: "#f3f4f6",
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 5,
              }}
            />
          </View>

          <View>
            <Text variant="bodyMedium" style={{}}>
              There are those whom you matched with or who were matched.
            </Text>
          </View>

          <View style={styles.listPerson}>
            {userListMatched.map((id, index) => (
              <MatchedPerson
                userId={id}
                handleMatched={handleMatched}
                key={index}
              />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default Save;
