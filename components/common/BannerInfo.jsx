import { View, Image, Text } from "react-native";
import { useState } from "react";
import { Chip, IconButton } from "react-native-paper";
import Colors from "../../constants/Colors";

function BannerInfo() {
  const userData = {
    name: "Văn Ngân",
    age: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGluZGVyJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    gender: "Nữ",
    job: "Nhân viên văn phòng ở caliphorniadaDSFDS",
  };

  const [data, setData] = useState(userData);

  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <Image
        style={{ width: "100%", height: 650, borderRadius: 16 }}
        resizeMode="cover"
        source={{ uri: data.imageUrl }}
      />
      <View style={{ position: "absolute", bottom: -620, left: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 600, color: "#fdfdfd" }}>
          {`${data.name}, ${data.age}`}
        </Text>
        <Chip
          elevated
          onPress={() => {}}
          style={{
            backgroundColor: "#edfbfa",
            borderRadius: 100,
            marginTop: 8,
            maxWidth: 80,
          }}
          selectedColor={Colors.light.secondary}
        >
          {data.gender}
        </Chip>
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginLeft: -15,
          }}
        >
          <IconButton
            icon="file-outline"
            size={24}
            iconColor={"#edfbfa"}
            onPress={() => {}}
          />
          <Text style={{ color: "#edfbfa", fontSize: 16, fontWeight: 600 }}>
            {data.job}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default BannerInfo;
