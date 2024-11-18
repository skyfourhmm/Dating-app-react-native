import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-paper";

const DetailSection = ({ title, iconName, onAddPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.myDetail_name}>
        <Icon source={iconName} color="gray" size={20} />
        <Text style={{ color: "gray" }}>{title}</Text>
      </View>
      <TouchableOpacity
        style={{ flexDirection: "row", justifyContent: "flex-end" }}
        onPress={onAddPress}
      >
        <Text style={{ color: "gray" }}>Add</Text>
        <Icon source="chevron-right" color="gray" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  myDetail_name: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
  },
});

export default DetailSection;
