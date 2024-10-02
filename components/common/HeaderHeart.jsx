import { View, Text } from "react-native";
import { IconButton, FAB, Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Progress from "react-native-progress";

function HeaderHeart() {
  return (
    <React.Fragment>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 8,
        }}
      >
        <View style={{ flexDirection: "row", width: 60 }}>
          <View style={{ width: 30 }}>
            <IconButton icon="menu" size={24} onPress={() => {}} />
          </View>
          <View style={{ width: 30, paddingLeft: 10 }}>
            <IconButton icon="reload" size={24} onPress={() => {}} />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>HeartSync</Text>
        </View>
        <View>
          <FAB
            icon={"transit-connection-variant"}
            size="small"
            style={{ margin: 8, backgroundColor: Colors.light.primary }}
            onPress={() => {}}
            mode="flat"
          />
        </View>
      </View>
      <View
        style={{
          width: "50%",
          flexDirection: "row",
          marginHorizontal: "auto",
          borderRadius: 50,
          marginBottom: 16,
          justifyContent: "center",
        }}
      >
        <Progress.Bar
          progress={0.5}
          width={150}
          height={6}
          borderWidth={0}
          unfilledColor={Colors.light.primary}
          color={Colors.light.secondary}
        />
      </View>
    </React.Fragment>
  );
}

export default HeaderHeart;
