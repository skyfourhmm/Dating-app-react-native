import {
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Chip, Icon } from "react-native-paper";
import * as Progress from "react-native-progress";
import Colors from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useRef } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { MultiSelect } from "react-native-element-dropdown";

import customAxios from "../../utils/customAxios";
import { API_ROOT } from "../../utils/constants";

import { useSelector, useDispatch } from "react-redux";
import { setAuthOpen } from "../../redux/features/AuthSlice";
import { setCurrentUser } from "../../redux/features/UserSlice";
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  getAuth,
} from "firebase/auth";
import { get, set } from "firebase/database";
import TagChip from "./TagChip";

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 7;

function Auth() {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("0935019843");
  const [password, setPassword] = useState("thientu");
  const [ishidePassword, setHidePassword] = useState(true);
  const [isPhoneNumberSignUp, setIsPhoneNumberSignUp] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("Screen1");
  const [isName, setIsName] = useState("");
  const [isGender, setIsGender] = useState("male");
  const [isJob, setIsJob] = useState("");
  const [isDescription, setIsDescription] = useState("");
  const [isLanguage, setIsLanguage] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginAnonymously = async () => {
    try {
      // const auth = getAuth(); // Lấy đối tượng auth
      // const userCredential = await signInAnonymously(auth); // Đăng nhập ẩn danh
      // console.log("User signed in anonymously:", userCredential.user);
      dispatch(setAuthOpen(false));
      // Trả về thông tin người dùng
      // return {
      //   success: true,
      //   user: userCredential.user,
      // };
    } catch (error) {
      console.error("Error signing in anonymously:", error);

      // Trả về lỗi
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const handleLogin = async () => {
    try {
      const response = await customAxios.post(`${API_ROOT}/auth/login`, {
        phoneNumber,
        password,
      });
      if (response.status === 200) {
        dispatch(setCurrentUser(response.data.profile));
        dispatch(setAuthOpen(false));
      } else {
        console.log("Lỗi đăng nhập:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error.message);
    }
  };

  const getListAccount = async () => {
    const response = await customAxios.get(`${API_ROOT}/user/allAccount`);
    if (response.status === 200) {
      return response.data.account;
    } else {
      console.log("Lỗi:", response.data.message);
    }
  };

  const handleContinuePhone = async () => {
    const phoneRegex = /^(01|03|09)\d{8}$/;
    const listAccount = await getListAccount();
    const listPhone = listAccount.map((e) => e.loginInfo.username);
    if (
      phoneRegex.test(isPhoneNumberSignUp) &&
      !listPhone.includes(isPhoneNumberSignUp)
    ) {
      setCurrentScreen("Screen2");
    } else {
      alert("Số điện thoại không hợp lệ");
    }
  };

  // age scroll --------------
  const [selectedAge, setSelectedAge] = useState(32);
  const scrollViewRef = useRef(null);
  const ages = Array.from({ length: 99 }, (_, i) => i + 1);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (ages[index]) {
      setSelectedAge(ages[index]);
    }
  };

  const renderAge = (age) => {
    const isSelected = age === selectedAge;
    const isNearby = Math.abs(age - selectedAge) <= 2;

    return (
      <View key={age} style={[styles.ageItem, isSelected]}>
        <Text
          style={[
            styles.ageText,
            isSelected && styles.selectedAgeText,
            !isSelected && !isNearby && styles.fadeAgeText,
          ]}
        >
          {age}
        </Text>
      </View>
    );
  };
  // --------------

  // Languages
  const LANGUAGES = [
    { label: "English", value: "en" },
    { label: "Vietnamese", value: "vi" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "Chinese", value: "zh" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "German", value: "de" },
    { label: "Russian", value: "ru" },
    { label: "Portuguese", value: "pt" },
  ];

  // Chip ------------
  const chipsData = [
    {
      id: 1,
      label: "Travel",
      icon: "book",
    },
    {
      id: 2,
      label: "Work",
      icon: "book",
    },
    {
      id: 3,
      label: "Study",
      icon: "book",
    },
    {
      id: 4,
      label: "Leisure",
      icon: "book",
    },
    {
      id: 5,
      label: "Fitness",
      icon: "book",
    },
    {
      id: 6,
      label: "Cooking",
      icon: "book",
    },
  ];
  const handleChipPress = (chip) => {
    console.log("Chip:", chip.icon);
    // if (selectedChips.includes(chip)) {
    //   // Nếu đã chọn, bỏ chọn
    //   setSelectedChips(selectedChips.filter((item) => item !== chip));
    // } else {
    //   // Nếu chưa chọn, thêm vào
    //   setSelectedChips([...selectedChips, chip]);
    // }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
        />
        <Text variant="displaySmall" style={{ fontWeight: 700, fontSize: 32 }}>
          HeartSync
        </Text>
        <Text style={{ color: "#939498" }}>
          Where Heart Connect, Love Finds Its Sync
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <TouchableOpacity
          style={{
            marginBottom: 20,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            backgroundColor: "#000",
            flexDirection: "row",
          }}
          onPress={() => console.log("Apple")}
        >
          <Ionicons name="logo-apple" size={24} color="white" />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              marginLeft: 16,
            }}
          >
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginBottom: 20,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            backgroundColor: "#369ae6",
            flexDirection: "row",
          }}
          onPress={() => loginAnonymously()}
        >
          <FontAwesome5 name="facebook" size={24} color="white" />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              marginLeft: 16,
            }}
          >
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginBottom: 20,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            backgroundColor: "#00bdd5",
            flexDirection: "row",
          }}
          onPress={() => setIsLoginModalVisible(true)}
        >
          <FontAwesome name="phone" size={24} color="white" />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              marginLeft: 16,
            }}
          >
            Continue with Phone Number
          </Text>
        </TouchableOpacity>
      </View>

      {/* Model Login*/}
      <Modal
        animationType="slide" // Kiểu animation
        transparent={true} // Để nền có thể mờ đi
        visible={isLoginModalVisible} // Hiển thị hoặc ẩn modal
        onRequestClose={() => setIsLoginModalVisible(false)} // Đóng modal khi bấm nút back
      >
        <View
          style={{ flex: 1, backgroundColor: "#c8f9ff", paddingHorizontal: 20 }}
        >
          <TouchableOpacity
            onPress={() => setIsLoginModalVisible(false)}
            style={{
              paddingTop: 20,
              borderRadius: 10,
            }}
          >
            <AntDesign name="arrowleft" size={26} color="black" />
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>
                Log in to start
              </Text>
              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  marginHorizontal: 20,
                  borderRadius: 1000,
                  paddingHorizontal: 20,
                  height: 60,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Feather name="user" size={24} color="black" />
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    paddingVertical: 0,
                    height: 40,
                    backgroundColor: "#fff",
                  }}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  marginHorizontal: 20,
                  borderRadius: 1000,
                  paddingHorizontal: 20,
                  height: 60,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => setHidePassword((prev) => !prev)}
                >
                  {ishidePassword ? (
                    <Feather name="lock" size={24} color="black" />
                  ) : (
                    <Feather name="unlock" size={24} color="black" />
                  )}
                </TouchableOpacity>
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    paddingVertical: 0,
                    height: 40,
                    backgroundColor: "#fff",
                  }}
                  placeholder="Password"
                  secureTextEntry={ishidePassword} // Ẩn mật khẩu
                  value={password} // Giá trị ô nhập mật khẩu
                  onChangeText={setPassword} // Cập nhật trạng thái khi thay đổi
                />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#00bdd6",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  borderRadius: 100,
                  marginTop: 20,
                  flexDirection: "row",
                }}
                onPress={handleLogin}
              >
                <MaterialIcons name="login" size={24} color="white" />
                <Text style={{ color: "#fff", fontSize: 18, marginLeft: 20 }}>
                  Login
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsLoginModalVisible(false);
                    setIsSignUpModalVisible(true);
                  }}
                >
                  <Text style={{ color: "#00bdd6", fontWeight: "bold" }}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>

      {/* Model Sign up*/}
      <Modal
        animationType="slide" // Kiểu animation
        transparent={true} // Để nền có thể mờ đi
        visible={isSignUpModalVisible} // Hiển thị hoặc ẩn modal
        onRequestClose={() => {
          setIsLoginModalVisible(true);
          setIsSignUpModalVisible(false);
        }} // Đóng modal khi bấm nút back
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#c8f9ff",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsSignUpModalVisible(false);
              setIsLoginModalVisible(true);
            }}
            style={{
              paddingTop: 20,
              borderRadius: 10,
            }}
          >
            <AntDesign name="arrowleft" size={26} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: "auto",
              borderRadius: 50,
              justifyContent: "center",
            }}
          >
            <Progress.Bar
              progress={0.1}
              width={150}
              height={6}
              borderWidth={0}
              unfilledColor={"#34e1eb"}
              color={Colors.light.secondary}
            />
          </View>
          {currentScreen === "Screen1" && (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 150,
              }}
            >
              <Text style={{ fontSize: 26, fontWeight: 700 }}>
                My number is
              </Text>
              <Text style={{ marginBottom: 20, textAlign: "center" }}>
                We'll need your phone number to send an OTP for verification.
              </Text>
              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  marginHorizontal: 20,
                  borderRadius: 1000,
                  paddingHorizontal: 20,
                  height: 60,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Feather name="phone" size={24} color="black" />
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    paddingVertical: 0,
                    height: 40,
                    backgroundColor: "#fff",
                  }}
                  placeholder="Enter your phone number"
                  value={isPhoneNumberSignUp}
                  onChangeText={setIsPhoneNumberSignUp}
                  keyboardType="phone-pad"
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#00bdd6",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  borderRadius: 100,
                  marginTop: 20,
                  flexDirection: "row",
                }}
                onPress={handleContinuePhone}
              >
                <MaterialIcons name="login" size={24} color="white" />
                <Text style={{ color: "#fff", fontSize: 18, marginLeft: 20 }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {currentScreen === "Screen2" && (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 150,
              }}
            >
              <Text style={{ fontSize: 26, fontWeight: 700 }}>
                What’s Your Name?
              </Text>
              <Text style={{ marginBottom: 20, textAlign: "center" }}>
                Let's Get to Know Each Other
              </Text>
              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  marginHorizontal: 20,
                  borderRadius: 1000,
                  paddingHorizontal: 20,
                  height: 60,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    paddingVertical: 0,
                    height: 40,
                    backgroundColor: "#fff",
                  }}
                  placeholder="Enter your name"
                  value={isName}
                  onChangeText={setIsName}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#00bdd6",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  borderRadius: 100,
                  marginTop: 20,
                  flexDirection: "row",
                }}
                onPress={() => setCurrentScreen("Screen3")}
              >
                <MaterialIcons name="login" size={24} color="white" />
                <Text style={{ color: "#fff", fontSize: 18, marginLeft: 20 }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {currentScreen === "Screen3" && (
            <SafeAreaView style={styles.container}>
              <View style={styles.content}>
                <Text style={styles.title}>How Old Are You?</Text>
                <Text style={styles.subtitle}>
                  Please provide your age in years
                </Text>

                <View style={styles.pickerContainer}>
                  <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    style={styles.picker}
                  >
                    <View style={styles.pickerPadding} />
                    {ages.map(renderAge)}
                    <View style={styles.pickerPadding} />
                  </ScrollView>
                  <View style={styles.selectionOverlay} pointerEvents="none">
                    <View style={styles.selectionHighlight} />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => {
                    setCurrentScreen("Screen4");
                  }}
                >
                  <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )}
          {currentScreen === "Screen4" && (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 150,
              }}
            >
              <Text style={{ fontSize: 26, fontWeight: 700 }}>
                What’s Your Gender?
              </Text>
              <Text style={{ marginBottom: 20, textAlign: "center" }}>
                Tell us about your gender
              </Text>

              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor:
                    isGender === "female" ? Colors.light.secondary : "#f0e4e6",
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  justifyContent: "center",
                }}
                onPress={() => setIsGender("female")}
              >
                <Ionicons
                  name="female-sharp"
                  size={32}
                  color={isGender === "female" ? "#fff" : "#000"}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: `${isGender === "female" ? "#fff" : "#000"}`,
                  }}
                >
                  Female
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor:
                    isGender === "male" ? Colors.light.secondary : "#f0e4e6",
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  justifyContent: "center",
                  marginTop: 20,
                  marginBottom: 150,
                }}
                onPress={() => setIsGender("male")}
              >
                <Ionicons
                  name="male-sharp"
                  size={32}
                  color={isGender === "male" ? "#fff" : "#000"}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: `${isGender === "male" ? "#fff" : "#000"}`,
                  }}
                >
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#00bdd6",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  borderRadius: 100,
                  marginTop: 20,
                  flexDirection: "row",
                }}
                onPress={() => setCurrentScreen("Screen5")}
              >
                <MaterialIcons name="login" size={24} color="white" />
                <Text style={{ color: "#fff", fontSize: 18, marginLeft: 20 }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {currentScreen === "Screen5" && (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 150,
              }}
            >
              <Text style={{ fontSize: 26, fontWeight: 700 }}>
                I am Looking for...
              </Text>
              <Text style={{ marginBottom: 20, textAlign: "center" }}>
                Provide us with further insights into your preferences
              </Text>

              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  marginHorizontal: 20,
                  borderRadius: 1000,
                  paddingHorizontal: 20,
                  height: 60,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <MaterialIcons name="work-outline" size={24} color="black" />
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    paddingVertical: 0,
                    height: 40,
                    backgroundColor: "#fff",
                  }}
                  placeholder="Your job is? "
                  value={isJob}
                  onChangeText={setIsJob}
                />
              </View>

              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  marginHorizontal: 20,
                  borderRadius: 1000,
                  paddingHorizontal: 20,
                  height: 60,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity>
                  <MaterialIcons name="description" size={24} color="black" />
                </TouchableOpacity>
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    paddingVertical: 0,
                    height: 40,
                    backgroundColor: "#fff",
                  }}
                  placeholder="A few descriptions about you"
                  value={isDescription} // Giá trị ô nhập mật khẩu
                  onChangeText={setIsDescription} // Cập nhật trạng thái khi thay đổi
                />
              </View>

              <MultiSelect
                style={{
                  height: 60,
                  width: "87%",
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                  borderRadius: 1000,
                  marginTop: 20,
                }}
                placeholderStyle={{ fontSize: 16 }}
                selectedTextStyle={{ fontSize: 14 }}
                inputSearchStyle={{ height: 40, fontSize: 16 }}
                iconStyle={{ width: 20, height: 20 }}
                search
                data={LANGUAGES}
                labelField="label"
                valueField="value"
                placeholder="Select languages"
                searchPlaceholder="Search..."
                value={isLanguage}
                onChange={(item) => {
                  setIsLanguage(item);
                }}
                renderLeftIcon={() => (
                  <Icon source="earth" size={24} style={{}} />
                )}
                selectedStyle={{
                  borderRadius: 50,
                }}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: "#00bdd6",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  borderRadius: 100,
                  marginTop: 20,
                  flexDirection: "row",
                }}
                onPress={() => setCurrentScreen("Screen6")}
              >
                <MaterialIcons name="login" size={24} color="white" />
                <Text style={{ color: "#fff", fontSize: 18, marginLeft: 20 }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {currentScreen === "Screen6" && (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 150,
              }}
            >
              <Text style={{ fontSize: 26, fontWeight: 700 }}>
                Select up to 3 interest
              </Text>
              <Text style={{ marginBottom: 20, textAlign: "center" }}>
                Tell us what piques your curiosity and passions
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Chip
                  avatar={
                    <FontAwesome
                      name="book"
                      size={24}
                      color={Colors.light.secondary}
                    />
                  }
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 100,
                    marginTop: 8,
                    marginRight: 8,
                    paddingHorizontal: 2,
                  }}
                >
                  <Text style={{ color: "#000" }}>Travel</Text>
                </Chip>

                <Chip
                  avatar={<FontAwesome name="book" size={24} color="#fff" />}
                  style={{
                    backgroundColor: Colors.light.secondary,
                    borderRadius: 100,
                    marginTop: 8,
                    marginRight: 8,
                    paddingHorizontal: 2,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Travel</Text>
                </Chip>

                {chipsData.map(
                  (chip, index) => (
                    console.log("Chip:", selectedChips.includes(chip)),
                    (
                      <Chip
                        key={index}
                        avatar={
                          <FontAwesome
                            name={chip.icon}
                            size={24}
                            color="#000"
                          />
                        }
                        style={{
                          backgroundColor: selectedChips.includes(chip)
                            ? Colors.light.secondary
                            : "#fff",
                          borderRadius: 100,
                          marginTop: 8,
                          marginRight: 8,
                          paddingHorizontal: 2,
                        }}
                        onPress={() => handleChipPress(chip)}
                      >
                        <Text
                          style={{
                            color: true ? "#000" : "#fff",
                          }}
                        >
                          {chip.label}
                        </Text>
                      </Chip>
                    )
                  )
                )}
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#00bdd6",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  borderRadius: 100,
                  marginTop: 20,
                  flexDirection: "row",
                  marginTop: 300,
                }}
                onPress={() => setCurrentScreen("Screen7")}
              >
                <MaterialIcons name="login" size={24} color="white" />
                <Text style={{ color: "#fff", fontSize: 18, marginLeft: 20 }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  pickerContainer: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    marginTop: 40,
  },
  picker: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  pickerPadding: {
    height: (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2,
  },
  ageItem: {
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  ageText: {
    fontSize: 24,
    fontWeight: "500",
  },
  selectedAgeText: {
    color: Colors.light.secondary,
    fontSize: 32,
    fontWeight: "bold",
  },
  fadeAgeText: {
    color: "#CCCCCC",
  },
  selectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    pointerEvents: "none",
  },
  selectionHighlight: {
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light.secondary,
  },
  continueButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 25,
    paddingVertical: 16,
    marginHorizontal: 24,
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Auth;
