import React, { useRef, useState, useEffect } from "react";
import { Animated, PanResponder, Dimensions } from "react-native";
import clamp from "clamp";

import customAxios from "../utils/customAxios";
import { API_ROOT } from "../utils/constants";

import { useSelector } from "react-redux";

const { width } = Dimensions.get("screen");

const SWIPE_THRESHOLD = 0.25 * width;

export default function useTinderCards() {
  const [data, setData] = useState([]);
  const [currentData, setCurentData] = useState({});
  const [swipe, setSwipe] = useState("");

  const currentUser = useSelector((state) => state.user);

  // call data user
  useEffect(() => {
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

    const fetchUsers = async () => {
      try {
        const response = await customAxios.get(`${API_ROOT}/user/allUser`);
        if (response.status === 200) {
          const newGetProfile = await getCurrentUser();
          const userdb = response.data.profile.filter(
            (user) =>
              user._id !== currentUser.profile._id &&
              !newGetProfile.listMatched.includes(user.userId)
          );
          setData(userdb);
        } else {
          console.log("Lỗi:", response.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error.message);
      }
    };

    fetchUsers();
  }, [swipe]);

  useEffect(() => {
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

    const fetchProfileAndMatch = async () => {
      if (swipe === "right") {
        const newGetProfile = await getCurrentUser();

        let newProject = {
          ...newGetProfile,
          listMatched: [...newGetProfile.listMatched],
        };

        if (
          currentData.userId &&
          !newGetProfile.listMatched.includes(currentData.userId)
        ) {
          newProject = {
            ...newGetProfile,
            listMatched: [...newGetProfile.listMatched, currentData.userId],
          };
        }
        if (newGetProfile) {
          await handleUpdateMatched(newProject, newGetProfile.userId);
        }
      }
      if (swipe === "left") {
        if (data.length === 0) {
          setSwipe("");
        }
      }
    };

    fetchProfileAndMatch();
  }, [swipe, currentData]);

  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  const transitionNext = function () {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setData((prev) => {
        setCurentData(prev[0]);
        return prev.slice(1);
      });
    });
  };

  useEffect(() => {
    scale.setValue(0.9);
    opacity.setValue(1);
    animation.setValue({ x: 0, y: 0 });
  }, [data]);

  const _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animation.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (e, { dx, dy, vx, vy }) => {
        let velocity;
        if (vx >= 0) {
          velocity = clamp(vx, 4, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 4, 5) * -1;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.decay(animation, {
              velocity: { x: velocity, y: vy },
              deceleration: 0.99,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              friction: 4,
              useNativeDriver: false,
            }),
          ]).start(transitionNext);
          if (velocity > 0) {
            setSwipe("right");
          } else {
            setSwipe("left");
          }
        } else {
          Animated.spring(animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
  return [data, _panResponder, animation, scale, opacity];
}
