import Colors from "@/constants/Colors";
import { View, Text } from "react-native";
import { Icon } from "react-native-paper";

export default function PlaceCart({ distance, address }) {
  return (
    <View
      style={{
        width: "100%",
        marginTop: 10,
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          marginBottom: 10,
        }}
      >
        <Icon source="map-marker-outline" size={24} color="#FF2400" />
        <Text style={{ color: "#505d5f", marginLeft: 10, fontSize: 16 }}>
          {distance}
        </Text>
      </View>
      <Text style={{ fontSize: 25, fontWeight: 600 }}>{address}</Text>
    </View>
  );
}
