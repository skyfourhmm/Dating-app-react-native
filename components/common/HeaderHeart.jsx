import { View, Text } from "react-native";
import { IconButton, FAB } from "react-native-paper";
import Colors from "../../constants/Colors";

function HeaderHeart() {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: "row", width: 60 }}>
        <IconButton icon="menu" size={24} onPress={() => {}} />
        <IconButton icon="reload" size={24} onPress={() => {}} />
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>HeartSync</Text>
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
  );
}

export default HeaderHeart;
