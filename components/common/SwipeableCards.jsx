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

<<<<<<< HEAD
const { height } = Dimensions.get("screen");
function SwipeableCards() {
  const [data, _panResponder, animation, scale, opacity] = useTinderCard();
=======
const ROTATION = 60;
const SWIPE_VELOCITY = 1000;

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
>>>>>>> 21791fc98098d1c1f130c641ea3ecdac0be08d1c

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
