import { View, Text } from "react-native";
import { IconButton, FAB, Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import React, { useState } from "react";
import * as Progress from "react-native-progress";

import ModalFilter from "./ModalFilter";

function HeaderProfile({ setDataUser }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      {modalVisible && (
        <ModalFilter
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
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
          <View style={{ width: 30, paddingLeft: 10 }}>
            <IconButton
              icon="arrow-left"
              size={26}
              onPress={() => setDataUser({})}
            />
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
            onPress={() => {
              setModalVisible(true);
            }}
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

export default HeaderProfile;