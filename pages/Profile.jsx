import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { Button, Checkbox, Icon } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {},
  header_button_edit_profile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#c8f9ff",
    borderRadius: 50,
    marginTop: 10,
  },
  header_verify: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  body: {},
  body_header: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
  },
  body_header_text: {
    color: "#00bdd6",
    fontSize: 18,
    fontWeight: "bold",
  },
  body_header_active: {
    borderBottomColor: "#00bdd6",
    borderBottomWidth: 3,
    padding: 10,
  },
  body_bander: {
    marginVertical: 20,
    backgroundColor: "#00bdd6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  body_content_header: {
    flex: 2,
    textAlign: "center",
    fontWeight: "bold",
  },
});

const features = [
  {
    id: 1,
    name: "Unlimited swipes",
    type: ["Free", "Premium"],
  },
  {
    id: 2,
    name: "Advanced filters",
    type: ["Free", "Premium"],
  },
  {
    id: 3,
    name: "Remove ads",
    type: ["Premium"],
  },
  {
    id: 4,
    name: "Undo accidental left swipes",
    type: ["Premium"],
  },
  {
    id: 5,
    name: "Push you profile to more viewers",
    type: ["Premium"],
  },
];

const Stack = createStackNavigator();

function Profile({ navigation }) {
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
            <View style={styles.header_button_edit_profile}>
              <Button
                onPress={() => navigation.navigate("EditProfile")}
                textColor="#00bdd6"
              >
                Edit your profile
              </Button>
              <Icon source="chevron-right" color={"#00bdd6"} size={20} />
            </View>
          </View>
        </View>

        <View style={styles.header_verify}>
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
        <View style={styles.body_header}>
          <View style={styles.body_header_active}>
            <Text style={styles.body_header_text}>Plans</Text>
          </View>
          <View>
            <Text style={styles.body_header_text}>Safety</Text>
          </View>
        </View>

        <View style={styles.body_bander}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            HeartSync Premium
          </Text>
          <Text style={{ color: "white", fontSize: 13, textAlign: "center" }}>
            Unlock exclusive features and supercharge your dating experience
          </Text>
          <Button mode="contained" buttonColor="#ffffff" textColor="gray">
            Upgrade from $7.99
          </Button>
        </View>

        <View style={styles.body_content}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", flex: 4 }}>
                What's included
              </Text>
              <Text style={styles.body_content_header}>Free</Text>
              <Text style={[styles.body_content_header, { color: "#00bdd6" }]}>
                Premium
              </Text>
            </View>
          </View>
          <View>
            <FlatList
              data={features}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 4 }}>
                    <Text style={{ marginVertical: 5 }}>{item.name}</Text>
                  </View>
                  <View style={{ flex: 2, alignItems: "center" }}>
                    <Checkbox
                      disabled={false}
                      status={
                        item.type.includes("Free") ? "checked" : "unchecked"
                      }
                      color="#00bdd6"
                    />
                  </View>
                  <View style={{ flex: 2, alignItems: "center" }}>
                    <Checkbox
                      disabled={false}
                      status="checked"
                      color="#00bdd6"
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Profile;