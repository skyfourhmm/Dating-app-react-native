import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { Text } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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

function Auth() {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("0935019843");
  const [password, setPassword] = useState("thientu");
  const [ishidePassword, setHidePassword] = useState(true);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginAnonymously = async () => {
    try {
      const auth = getAuth(); // Lấy đối tượng auth
      const userCredential = await signInAnonymously(auth); // Đăng nhập ẩn danh
      console.log("User signed in anonymously:", userCredential.user);
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
        />
        {/* <Text style={{ fontSize: 40, fontWeight: 700 }}>HeartSync</Text> */}
        <Text variant="displaySmall" style={{ fontWeight: 700 }}>
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

      {/* Model */}
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
                <TouchableOpacity onPress={() => console.log(3242)}>
                  <Text style={{ color: "#00bdd6", fontWeight: "bold" }}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
}

export default Auth;
