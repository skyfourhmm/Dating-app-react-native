import { View, Text, TextInput, StyleSheet } from "react-native";
import { Icon } from "react-native-paper";

const HeaderChat = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Icon source="menu" size={30} />
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
    gap: 10,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderColor: "#e7e9ed",
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
