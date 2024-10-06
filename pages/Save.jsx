import BannerInfo from "@/components/common/BannerInfo";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import MatchedPerson from "../components/MatchedPerson";
import HeaderHeart from "@/components/common/HeaderHeart";

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
  return (
    <ScrollView style={styles.container}>
      <View></View>

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
          <MatchedPerson />
          <MatchedPerson />
          <MatchedPerson />
          <MatchedPerson />
          <MatchedPerson />
        </View>
      </View>
    </ScrollView>
  );
}

export default Save;
