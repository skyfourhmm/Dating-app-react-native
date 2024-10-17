import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import MatchedPerson from "../components/MatchedPerson";
import { useSelector } from "react-redux";
import { userData } from "@/assets/fakedata/users";
import MatchedProfile from "../components/common/MatchedProfile";

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
  const userid = useSelector((state) => state.user.userid);
  const user = userData.find((user) => user.id === userid);
  const userListMatched = user.listMatched;

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
          <View>
            <Text variant="displaySmall" style={{ fontWeight: "bold" }}>
              Matched
            </Text>
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
