import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { Button, Icon } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    // marginBottom: 20,
  },
  header: {
    // flexDirection: "row",
    // justifyContent: "center",
  },
  body: {
    borderWidth: 1,
    borderColor: "red",
  },
});

function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <View>
          <Button icon="menu" textColor="black"></Button>
        </View>
        <View>
          <Button icon="cog-outline" textColor="black"></Button>
        </View>
      </View>

      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 30, alignItems: "center" }}>
          <View>
            <Image
              source={require("../assets/images/logo.png")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>
          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Joshua Edwards, 29
              </Text>
              <Icon source="shield-check" color="gray" size={12} />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#c8f9ff",
                borderRadius: 50,
                marginTop: 10,
              }}
            >
              <Button onPress={() => alert("Pressed")} textColor="#00bdd6">
                Edit your profile
              </Button>
              <Icon source="chevron-right" color={"#00bdd6"} size={20} />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#f8f9fa",
            padding: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#e7f1fa",
              padding: 10,
              borderRadius: 50,
              marginRight: 10,
            }}
          >
            <Icon source="shield-check" color={"#379ae6"} size={24} />
          </View>
          <View style={{ flex: 6, gap: 10 }}>
            <Text style={{ fontSize: 13, color: "gray" }}>
              Verification adds an extra layer of authenticity and trust to your
              profile.
            </Text>
            <Text
              style={{ color: "#379ae6", fontWeight: "bold", fontSize: 13 }}
            >
              Verify your account now!
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Icon source="chevron-right" color={"gray"} size={32} />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <Text>Body</Text>
      </View>
    </SafeAreaView>
  );
}

export default Profile;
