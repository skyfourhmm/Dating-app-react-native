import React, { useState, useRef } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Animated,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  FAB,
  Checkbox,
  Icon,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import Slider from "@react-native-community/slider";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import Colors from "../../constants/Colors";
import TagChip from "./TagChip";

function ModalFilter({ modalVisible, setModalVisible }) {
  //age
  const [sliderValues, setSliderValues] = useState([20, 80]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPositionAge, setTooltipPositionAge] = useState([0, 0]);

  const handleValuesChange = (values) => {
    setSliderValues(values);
  };

  const handleValueChangeStart = () => {
    setShowTooltip(true);
  };

  const handleValueChangeFinish = () => {
    setShowTooltip(false);
  };

  // gender
  const [genderMale, setGenderMale] = useState(false);
  const [genderFemale, setGenderFemale] = useState(false);
  const [genderNonbinary, setGenderNonbinary] = useState(false);

  // distance

  const [distance, setDistance] = useState(10);
  const [isSliding, setIsSliding] = useState(false); // Trạng thái đang kéo
  const tooltipPositionDistance = useRef(new Animated.Value(0)).current; // Vị trí của tooltip

  const handleValueChange = (sliderValue) => {
    setDistance(sliderValue);
    Animated.timing(tooltipPositionDistance, {
      toValue: sliderValue,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleSlidingStart = () => {
    setIsSliding(true); // Hiển thị tooltip khi bắt đầu kéo
  };

  const handleSlidingComplete = () => {
    setIsSliding(false); // Ẩn tooltip khi kéo xong
  };

  const [selectDistanceSwitch, setSelectDistanceSwitch] = useState(true);

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

  const [language, setLanguage] = useState("");

  // Clear all

  const handleClearAll = () => {
    setGenderMale(false);
    setGenderFemale(false);
    setGenderNonbinary(false);
    setSliderValues([18, 80]);
    setDistance(10);
    setSelectDistanceSwitch(true);
    setLanguage("");
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalheader}>
              <FAB
                icon={"close"}
                size="medium"
                style={{ backgroundColor: "#fff", padding: 10 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                mode="flat"
              />
              <Text style={styles.modalText}>Filters</Text>
            </View>
            <SafeAreaView
              style={{ flex: 1, paddingTop: StatusBar.currentHeight }}
            >
              <ScrollView>
                <View style={styles.modalContent}>
                  <View style={{ width: "100%" }}>
                    {/* gender */}
                    <Text style={{ color: Colors.light.secondary }}>
                      What is your preferred gender ?
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#e8e8e8",
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                          Male
                        </Text>
                        <Checkbox
                          color={Colors.light.secondary}
                          status={genderMale ? "checked" : "unchecked"}
                          onPress={() => {
                            setGenderMale(!genderMale);
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                          Female
                        </Text>
                        <Checkbox
                          color={Colors.light.secondary}
                          status={genderFemale ? "checked" : "unchecked"}
                          onPress={() => {
                            setGenderFemale(!genderFemale);
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                          Nonbinary
                        </Text>
                        <Checkbox
                          color={Colors.light.secondary}
                          status={genderNonbinary ? "checked" : "unchecked"}
                          onPress={() => {
                            setGenderNonbinary(!genderNonbinary);
                          }}
                        />
                      </View>
                    </View>

                    {/* age */}
                    <Text
                      style={{ color: Colors.light.secondary, marginTop: 30 }}
                    >
                      Age range ?
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#e8e8e8",
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%",
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                          {sliderValues[0]}
                        </Text>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                          {sliderValues[1]}
                        </Text>
                      </View>

                      <View style={{ paddingHorizontal: 30 }}>
                        <MultiSlider
                          values={sliderValues} // Giá trị ban đầu cho 2 đầu slider
                          sliderLength={280} // Chiều dài slider
                          onValuesChange={handleValuesChange} // Gọi khi giá trị thay đổi
                          min={18} // Giá trị nhỏ nhất
                          max={80} // Giá trị lớn nhất
                          step={1} // Bước nhảy mỗi lần kéo
                          allowOverlap={false} // Không cho phép hai con trỏ chồng lên nhau
                          snapped // Snap con trỏ vào các vị trí bước
                          selectedStyle={{
                            backgroundColor: Colors.light.secondary,
                          }} // Màu sắc của đoạn đã chọn
                          unselectedStyle={{
                            backgroundColor: Colors.light.primary,
                          }} // Màu sắc của đoạn chưa chọn
                          trackStyle={{
                            width: "100%",
                          }} // Kiểu của thanh trượt
                          markerStyle={{
                            height: 20,
                            width: 20,
                            backgroundColor: Colors.light.secondary,
                          }} // Kiểu của con trỏ
                        />
                      </View>
                    </View>

                    {/* distance */}

                    <Text
                      style={{ color: Colors.light.secondary, marginTop: 30 }}
                    >
                      Distance ?
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#e8e8e8",
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 16,
                            marginLeft: "auto",
                          }}
                        >
                          80 km
                        </Text>
                      </View>
                      {/* Tooltip */}
                      {isSliding && (
                        <Animated.View
                          style={[
                            styles.tooltip,
                            {
                              transform: [
                                {
                                  translateX:
                                    tooltipPositionDistance.interpolate({
                                      inputRange: [0, 100],
                                      outputRange: [0, 280], // Điều chỉnh theo chiều dài của slider
                                      extrapolate: "clamp",
                                    }),
                                },
                              ],
                            },
                          ]}
                        >
                          <Text style={styles.tooltipText}>
                            {Math.round(distance)}
                          </Text>
                        </Animated.View>
                      )}

                      {/* Slider */}
                      <Slider
                        style={{ width: 300, height: 40 }}
                        minimumValue={0}
                        maximumValue={80}
                        value={distance}
                        onValueChange={handleValueChange} // Xử lý khi giá trị thay đổi
                        onSlidingStart={handleSlidingStart} // Hiển thị tooltip khi bắt đầu kéo
                        onSlidingComplete={handleSlidingComplete} // Ẩn tooltip khi thả tay
                        minimumTrackTintColor={Colors.light.secondary}
                        maximumTrackTintColor={Colors.light.primary}
                        thumbTintColor={Colors.light.secondary}
                      />
                      <View
                        style={{
                          paddingHorizontal: 10,
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Text style={{ fontSize: 16, maxWidth: "80%" }}>
                          show profiles within a 15km range when run out of
                        </Text>
                        <TouchableRipple
                          onPress={() =>
                            setSelectDistanceSwitch(!selectDistanceSwitch)
                          }
                        >
                          <View pointerEvents="none">
                            <Switch
                              value={selectDistanceSwitch}
                              color={Colors.light.secondary}
                            />
                          </View>
                        </TouchableRipple>
                      </View>
                    </View>

                    {/* Languages */}
                    <Text
                      style={{ color: Colors.light.secondary, marginTop: 30 }}
                    >
                      Languages
                    </Text>
                    <MultiSelect
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      search
                      data={LANGUAGES}
                      labelField="label"
                      valueField="value"
                      placeholder="Select languages"
                      searchPlaceholder="Search..."
                      value={language}
                      onChange={(item) => {
                        setLanguage(item);
                      }}
                      renderLeftIcon={() => (
                        <Icon source="earth" size={24} style={{}} />
                      )}
                      selectedStyle={{
                        borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 60,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    borderTopWidth: 1,
                    paddingTop: 50,
                    borderColor: "#e8e8e8",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#f3f4f6",
                      paddingHorizontal: 50,
                      paddingVertical: 20,
                      borderRadius: 10,
                    }}
                    onPress={() => handleClearAll()}
                  >
                    <Text style={{ fontSize: 16 }}>Clear all</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.light.secondary,
                      paddingHorizontal: 50,
                      paddingVertical: 20,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#ffff",
                      }}
                    >
                      Apply filters
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalFilter;

const styles = StyleSheet.create({
  centeredView: {
    zIndex: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalheader: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 1,
    borderBlockColor: "#e8e8e8",
  },
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  modalContent: {
    paddingHorizontal: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -35 }],
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tooltip: {
    position: "absolute",
    bottom: 60, // Đặt vị trí tooltip ở trên slider
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 6,
  },
  tooltipText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
});
