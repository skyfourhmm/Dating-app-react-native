import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
  Dimensions,
} from "react-native";
import HeaderHeart from "../components/common/HeaderHeart";
import BannerInfo from "../components/common/BannerInfo";
import PlaceCart from "../components/common/PlaceCart";
import TagChip from "@/components/common/TagChip";
import { IconButton } from "react-native-paper";

const { width } = Dimensions.get("window");

function Heart() {
  const userData = {
    name: "Ariana",
    age: 25,
    imageUrl: {
      mainPhoto:
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGluZGVyJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      otherPhotos: [
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGluZGVyJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGluZGVyJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGluZGVyJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    gender: "Nữ",
    job: "Nhân viên văn phòng ở caliphornia",
    address: "LAS VERGAS, NV 89104",
    describe:
      "It would be wonderful to meet someone who appreciates the artsand enjoys exploring the vibrant culture of the city. I value open-mindedness, good communication, and a shared passion for classical music and fine arts. Also, mother of 2 cats ;",
    tags: [
      {
        id: 1,
        icon: "ruler",
        title: "168 cm",
      },
      {
        id: 2,
        icon: "smoking-off",
        title: "No smoker",
      },
      {
        id: 3,
        icon: "dog",
        title: "Lover animal",
      },
      {
        id: 4,
        icon: "gamepad-square-outline",
        title: "Gamer",
      },
    ],
    enjoys: ["Travel", "Cooking", "Reading", "Music", "Dance", "Sport"],
    comumunicates: ["English", "Vietnamese", "Chinese", "Japanese", "Korean"],
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderHeart />
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ScrollView>
          <View style={{ marginHorizontal: 16 }}>
            <BannerInfo userData={userData} />
            <PlaceCart
              distance={"2.0 kilometrees, away"}
              address={userData.address}
            />
            {/* describe */}
            <View>
              <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 20 }}>
                About me
              </Text>
              <Text>{userData.describe}</Text>
            </View>
            {/* My detail */}
            <View>
              <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 20 }}>
                My detail
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {userData.tags.map((tag) => (
                  <TagChip key={tag.id} icon={tag.icon} label={tag.title} />
                ))}
              </View>
            </View>

            {/* Enjoy */}
            <View>
              <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 20 }}>
                I enjoy
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {userData.enjoys.map((enjoy) => (
                  <TagChip label={enjoy} />
                ))}
              </View>
            </View>

            {/* comumunicates */}
            <View>
              <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 20 }}>
                I comumunicate in
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {userData.comumunicates.map((language) => (
                  <TagChip label={language} />
                ))}
              </View>
            </View>

            {/* Image */}
            <View style={{ width: "100%", marginTop: 20 }}>
              <Image
                style={{ width: "100%", height: width, borderRadius: 16 }}
                resizeMode="cover"
                source={{ uri: userData.imageUrl.mainPhoto }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={{
                    width: "48%",
                    height: width / 2,
                    borderRadius: 16,
                  }}
                  resizeMode="cover"
                  source={{ uri: userData.imageUrl.mainPhoto }}
                />
                <Image
                  style={{ width: "48%", height: width / 2, borderRadius: 16 }}
                  resizeMode="cover"
                  source={{ uri: userData.imageUrl.mainPhoto }}
                />
              </View>
            </View>

            {/* Yes or No */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <IconButton
                icon="close"
                mode="contained"
                containerColor={"#fcf1f0"}
                iconColor="#f44336"
                size={50}
                onPress={() => {}}
              />
              <IconButton
                icon="check"
                mode="contained"
                containerColor={"#ecfcf6"}
                iconColor="#4caf50"
                size={50}
                onPress={() => {}}
              />
            </View>
            <Text
              style={{
                fontWeight: 500,
                textAlign: "center",
                width: "100%",
                marginVertical: 60,
              }}
            >
              Hide and Report Profile
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default Heart;
