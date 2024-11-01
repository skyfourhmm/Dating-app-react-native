import React, { useEffect, useState } from "react";
import { userData } from "@/assets/fakedata/users";
import { View, StyleSheet, useWindowDimensions, Image } from "react-native";
import BannerInfo from "./BannerInfo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedGestureHandler,
  interpolate,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import Like from "../../assets/images/LIKE.png";
import Nope from "../../assets/images/nope.png";
import { API_ROOT } from "../../utils/constants";
import customAxios from "../../utils/customAxios";

import { useSelector } from "react-redux";

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

function SwipeableCards({ reload }) {
  const currentUser = useSelector((state) => state.user);
  const userid = currentUser.profile._id;
  const [userData, setUserData] = useState([]);

  // call data user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get(`${API_ROOT}/user/allUser`);
        if (response.status === 200) {
          setUserData(response.data.profile);
        } else {
          console.log("Lỗi:", response.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const userdb = userData.filter((user) => user._id !== userid);

  // update data when matched
  const handleUpdateMatched = async (updateData, userId) => {
    try {
      const response = await customAxios.put(
        `${API_ROOT}/user/updateMatched/${userId}`,
        updateData
      );
      console.log(
        "Profile updated successfully!",
        `Name: ${response.data.name}`
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // lấy dữ liệu của user hiện tại
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

  useEffect(() => {
    console.log("reload: ", reload);
  }, [reload]);

  // reload data

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNextIndex, setCurrentNextIndex] = useState(currentIndex + 1);

  const currentProfile = userdb[currentIndex];
  const nextProfile = userdb[currentNextIndex];

  const onSwipeLeft = async (user) => {
    console.log("swipe left", user._id);
  };
  const onSwipeRight = async (user) => {
    const newGetProfile = await getCurrentUser();
    const newProject = {
      ...newGetProfile,
      listMatched: [...newGetProfile.listMatched, user.userId],
    };

    handleUpdateMatched(newProject, newGetProfile.userId);
  };

  const { width: screenWidth } = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      "deg"
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { rotate: rotate.value }],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1]
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1]
    ),
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 6], [0, 1]),
  }));
  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 6], [0, 1]),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }

      if (userdb.length - 1 === currentIndex) {
        translateX.value = withSpring(0);
        return;
      }

      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        runOnJS(setCurrentIndex)(currentIndex + 1)
      );

      const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
      onSwipe && runOnJS(onSwipe)(currentProfile);
    },
  });

  useEffect(() => {
    translateX.value = 0;
    setCurrentNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 16 }}>
        {nextProfile && (
          <View style={styles.nextCardContainer}>
            <Animated.View style={[styles.animationView, nextCardStyle]}>
              <BannerInfo userData={nextProfile} />
            </Animated.View>
          </View>
        )}

        {currentProfile && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.animationView, cardStyle]}>
              <Animated.Image
                source={Like}
                style={[styles.like, likeStyle]}
                resizeMode="contain"
              />
              <Animated.Image
                source={Nope}
                style={[styles.nope, nopeStyle]}
                resizeMode="contain"
              />
              <BannerInfo userData={currentProfile} />
            </Animated.View>
          </PanGestureHandler>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

export default SwipeableCards;

const styles = StyleSheet.create({
  animationView: {
    width: "100%",
    height: "100%",
  },
  nextCardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  like: {
    width: 300,
    height: 300,
    position: "absolute",
    top: 150,
    left: "10%",
    zIndex: 1,
    elevation: 1,
  },
  nope: {
    width: 300,
    height: 300,
    position: "absolute",
    top: 150,
    left: "10%",
    zIndex: 1,
    elevation: 1,
  },
});
