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

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

function SwipeableCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNextIndex, setCurrentNextIndex] = useState(currentIndex + 1);

  const currentProfile = userData[currentIndex];
  const nextProfile = userData[currentNextIndex];

  const onSwipeLeft = (user) => {
    console.log("swipe left", user.id);
  };
  const onSwipeRight = (user) => {
    console.log("swipe right", user.id);
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
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1]),
  }));
  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
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

      if (userData.length - 1 === currentIndex) {
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
