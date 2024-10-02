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
import { userData } from "../assets/fakedata/users";

const { width } = Dimensions.get("window");

function Heart() {
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
                {userData.enjoys.map((enjoy, index) => (
                  <TagChip key={index} label={enjoy} />
                ))}
              </View>
            </View>

            {/* comumunicates */}
            <View>
              <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 20 }}>
                I comumunicate in
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {userData.comumunicates.map((language, index) => (
                  <TagChip key={index} label={language} />
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
