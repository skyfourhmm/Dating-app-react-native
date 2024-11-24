import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  Text,
  Platform,
  Image,
  Dimensions,
} from "react-native";

import BannerInfo from "./BannerInfo";

import useTinderCard from "../../hook/useTinderCards";

const { height } = Dimensions.get("screen");
function SwipeableCards() {
  const [data, _panResponder, animation, scale, opacity] = useTinderCard();

  return (
    <View style={styles.container}>
      {data
        .slice(0, 2)
        .reverse()
        .map((item, index, items) => {
          const isLastItem = index === items.length - 1;
          const panHandlers = isLastItem
            ? { ..._panResponder.panHandlers }
            : {};
          const isSecondToLast = index === items.length - 2;
          const rotate = animation.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ["-30deg", "0deg", "30deg"],
            extrapolate: "clamp",
          });

          const animatedCardStyles = {
            transform: [{ rotate }, ...animation.getTranslateTransform()],
            opacity,
          };

          const cardStyle = isLastItem ? animatedCardStyles : undefined;
          const nextStyle = isSecondToLast
            ? { transform: [{ scale: scale }], borderRadius: 5 }
            : undefined;

          return (
            <Animated.View
              {...panHandlers}
              style={[styles.card, cardStyle, nextStyle]}
              key={item._id}
            >
              <BannerInfo userData={item} />
            </Animated.View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: height,
    padding: 10,
  },
  card: {
    width: "100%",
    height: 400,
    backgroundColor: "#f4f4f4",
    position: "absolute",
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    padding: 10,
  },
  nameText: {
    fontSize: 16,
  },
  animalText: {
    fontSize: 14,
    color: "#757575",
    paddingTop: 5,
  },
});

export default SwipeableCards;
