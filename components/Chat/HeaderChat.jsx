import { View, Text, TextInput, StyleSheet } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import { useState } from "react";
import SettingModal from "../common/SettingModal";

const HeaderChat = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginLeft: -10 }}>
        <IconButton
          icon={modalVisible ? "close" : "menu"}
          size={24}
          onPress={() => setModalVisible(!modalVisible)}
        />
        {modalVisible && (
          <SettingModal
            status={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
      </View>

      <View style={styles.inputSearch}>
        <View style={{ position: "absolute", bottom: 10, left: 10 }}>
          <Icon source="magnify" size={20} color="black" />
        </View>
        <TextInput style={styles.input} placeholder="Search..." />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 20,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#e7e9ed",
    zIndex: 1,
  },
  inputSearch: {
    position: "relative",
    flex: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 5,
  },
  input: {
    paddingRight: 10,
    paddingLeft: 35,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default HeaderChat;
