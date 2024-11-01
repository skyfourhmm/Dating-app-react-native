import React, { useState } from "react";
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
import HeaderHeart from "../common/HeaderHeart";
import BannerInfo from "../common/BannerInfo";
import PlaceCart from "../common/PlaceCart";
import TagChip from "@/components/common/TagChip";
import { IconButton } from "react-native-paper";
import { userData } from "../../assets/fakedata/users";
import SwipeableCards from "../common/SwipeableCards";

const { width } = Dimensions.get("window");

function MatchedProfile({ dataUser, setDataUser }) {
  const [reload, setReload] = useState(true);

  const reloadContent = () => {
    setReload((prev) => !prev);
  };

  const user = Object.keys(dataUser).length === 0 ? userData[0] : dataUser;

  user.enjoys.map((tag) => {
    console.log(tag);
  });

  return (
    <View style={{ flex: 1 }}>
      <HeaderHeart onReload={reloadContent} />
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ScrollView>
          {false ? (
            <SwipeableCards idUser={1} reload={reload} />
          ) : (
            <View style={{ marginHorizontal: 16 }}>
              <BannerInfo userData={user} />
              <PlaceCart
                distance={"2.0 kilometrees, away"}
                address={user.address}
              />
              {/* describe */}
              <View>
                <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 20 }}>
                  About me
                </Text>
                <Text>{user.describe}</Text>
              </View>
              {/* My detail */}
              <View>
                <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 20 }}>
                  My detail
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {user.tags?.map((tag) => (
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
                  {user.enjoys?.map((enjoy, index) => (
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
                  {user.comumunicates?.map((language, index) => (
                    <TagChip key={index} label={language} />
                  ))}
                </View>
              </View>
              {/* Image */}
              <View style={{ width: "100%", marginTop: 20 }}>
                <Image
                  style={{ width: "100%", height: width, borderRadius: 16 }}
                  resizeMode="cover"
                  source={{ uri: user.imageUrl.mainPhoto }}
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
                    source={{ uri: user.imageUrl.mainPhoto }}
                  />
                  <Image
                    style={{
                      width: "48%",
                      height: width / 2,
                      borderRadius: 16,
                    }}
                    resizeMode="cover"
                    source={{ uri: user.imageUrl.mainPhoto }}
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
                  onPress={() => setDataUser({})}
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
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default MatchedProfile;
