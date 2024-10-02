import { View, Image, Text } from "react-native";
import { useState } from "react";
import { Chip, IconButton } from "react-native-paper";
import Colors from "../../constants/Colors";

function BannerInfo() {
  const userData = {
    name: "Văn Ngân Nga ngô thị nhi đông hà lục thẩm",
    age: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGluZGVyJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    gender: "Nữ",
    job: "Nhân viên văn phòng ở caliphorniadaDSFDSssssssssssssssss",
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
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#fdfdfd",
              maxWidth: 200,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`${data.name}`}
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#fdfdfd",
              maxWidth: 200,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {` ,${data.age}`}
          </Text>
        </View>
        <Chip
          elevated
          onPress={() => {}}
          style={{
            backgroundColor: "#edfbfa",
            borderRadius: 100,
            marginTop: 8,
            alignSelf: "flex-start",
          }}
          selectedColor={Colors.light.secondary}
        >
          {data.gender}
        </Chip>
        <View
          style={{
            flexDirection: "row",
            marginLeft: -15,
            alignItems: "center",
          }}
        >
          <View style={{ width: 30, marginRight: 10 }}>
            <IconButton
              icon="file-outline"
              size={24}
              iconColor={"#edfbfa"}
              onPress={() => {}}
            />
          </View>
          <Text
            style={{
              color: "#edfbfa",
              fontSize: 16,
              fontWeight: 600,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {data.job}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default BannerInfo;
