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
import HeaderProfile from "../common/HeaderProfile";
import BannerInfo from "../common/BannerInfo";
import PlaceCart from "../common/PlaceCart";
import TagChip from "@/components/common/TagChip";
import { IconButton } from "react-native-paper";
import { userData } from "../../assets/fakedata/users";
import customAxios from "../../utils/customAxios";
import { API_ROOT } from "../../utils/constants";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

function MatchedProfile({ dataUser, setDataUser }) {
  const currentUser = useSelector((state) => state.user);

  const user = Object.keys(dataUser).length === 0 ? userData[0] : dataUser;

  const handleUpdateMatched = async (updateData, userId) => {
    try {
      const response = await customAxios.put(
        `${API_ROOT}/user/update/${userId}`,
        updateData
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await customAxios.get(
        `${API_ROOT}/user/profile/${currentUser.profile.userId}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("Lỗi:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error.message);
    }
  };

  const handleUnMatched = async (user) => {
    const newGetProfile = await getCurrentUser();
    const newList = newGetProfile?.listMatched.filter(
      (userId) => userId !== user.userId
    );
    const newProject = {
      ...newGetProfile,
      listMatched: [...newList],
    };

    if (newGetProfile) {
      await handleUpdateMatched(newProject, newGetProfile.userId);
    }
    setDataUser({});
  };

  const handleUpdateMes = async (user) => {
    const newGetProfile = await getCurrentUser();

    const newList = newGetProfile?.listMessenger;
    const userList = user?.listMessenger;

    if (!newGetProfile?.listMessenger.includes(user.userId)) {
      newList.push(user.userId);
    }

    if (!user?.listMessenger.includes(newGetProfile.userId)) {
      userList.push(newGetProfile.userId);
    }

    const newListMatch = newGetProfile?.listMatched.filter(
      (userId) => userId !== user.userId
    );

    const newUserListMatch = user?.listMatched.filter(
      (userId) => userId !== newGetProfile.userId
    );

    const newProject = {
      ...newGetProfile,
      listMatched: [...newListMatch],
      listMessenger: [...newList],
    };

    const newUserProject = {
      ...user,
      listMatched: [...newUserListMatch],
      listMessenger: [...userList],
    };

    if (newProject && newUserProject) {
      await handleUpdateMatched(newProject, newGetProfile.userId);
      await handleUpdateMatched(newUserProject, user.userId);
    }
    setDataUser({});
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderProfile setDataUser={setDataUser} />
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ScrollView>
          <View style={{ marginHorizontal: 16 }}>
            <BannerInfo userData={user} />
            <PlaceCart
              distance={"2.0 kilometrees, away"}
              address={user?.address}
            />
            <Text>describe</Text>
            <View>
              <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 20 }}>
                About me
              </Text>
              <Text>{user?.describe}</Text>
            </View>
            {/* My detail */}
            <View>
              <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 20 }}>
                My detail
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {user?.tags?.map((tag) => (
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
                {user?.enjoys?.map((enjoy, index) => (
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
                {user?.communicates?.map((language, index) => (
                  <TagChip key={index} label={language} />
                ))}
              </View>
            </View>
            {/* Image */}
            <View style={{ width: "100%", marginTop: 20 }}>
              <Image
                style={{ width: "100%", height: width, borderRadius: 16 }}
                resizeMode="cover"
                source={{ uri: user?.imageUrl?.otherPhotos[0] }}
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
                  source={{ uri: user?.imageUrl?.otherPhotos[1] }}
                />
                <Image
                  style={{
                    width: "48%",
                    height: width / 2,
                    borderRadius: 16,
                  }}
                  resizeMode="cover"
                  source={{ uri: user?.imageUrl?.otherPhotos[2] }}
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
                onPress={() => handleUnMatched(user)}
              />
              <IconButton
                icon="check"
                mode="contained"
                containerColor={"#ecfcf6"}
                iconColor="#4caf50"
                size={50}
                onPress={() => handleUpdateMes(user)}
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

export default MatchedProfile;
