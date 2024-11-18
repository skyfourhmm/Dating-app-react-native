import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { ProgressBar, Text, Icon, IconButton } from "react-native-paper";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as MIcon } from "@expo/vector-icons";
import DetailSection from "./DetailSection";
import * as ImagePicker from "expo-image-picker";

const details = [{}];
const enjoy = [
  { id: 1, name: "Play game" },
  { id: 2, name: "Watch movie" },
];
const language = [
  { id: 1, name: "English" },
  { id: 2, name: "VietNamese" },
];

const EditProfile = ({ navigation }) => {
  const [selectedEnjoy, setSelectedEnjoy] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState(null);
  const process = 45;

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  return (
    <ScrollView style={style.container}>
      <View style={style.header}>
        <View>
          <IconButton
            icon="chevron-left"
            size={32}
            style={{ justifyContent: "center" }}
            onPress={() => navigation.navigate("ProfileStack")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, marginHorizontal: 50 }}>
            Edit Profile
          </Text>
        </View>
      </View>

      <View style={style.process}>
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Profile completion:
          <Text style={{ color: "#00bdd6", fontWeight: "bold" }}>
            {""} {process}%
          </Text>
        </Text>
        <ProgressBar
          progress={process / 100}
          color="#00bdd6"
          style={{ height: 10, borderRadius: 20, backgroundColor: "#a6f5ff" }}
        />
      </View>

      <View style={style.photos}>
        <View>
          <Text
            variant="titleMedium"
            style={{ fontWeight: "bold", marginVertical: 10 }}
          >
            Photos
          </Text>
          <Text variant="bodySmall">
            The main photo is how you appear to others on the swipe view
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 40,
          }}
        >
          <View style={{ flex: 3 }}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ height: 310, width: 200, borderWidth: 1 }}
            />
          </View>
          <View
            style={{
              flex: 2,
              gap: 5,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ height: 100, width: 150, borderWidth: 1 }}
            />
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ height: 100, width: 150, borderWidth: 1 }}
            />
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ height: 100, width: 150, borderWidth: 1 }}
            />
          </View>
        </View>

        {/* Thêm ảnh vào ứng dụng */}
        <Button title="Select Image" onPress={pickImage} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{ height: 100, width: 150, borderWidth: 1 }}
          />
        )}
      </View>

      <View style={style.aboutMe}>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginVertical: 10 }}
        >
          About me
        </Text>
        <Text variant="bodySmall">
          Make it easy for others to get a sense of who you are.
        </Text>
        <TextInput
          style={{
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 10,
            padding: 10,
            textAlignVertical: "top",
          }}
          multiline
          numberOfLines={4}
          onChangeText={(text) => setAboutMe(text)}
          value={aboutMe}
          placeholder="Share a few words about yourself, your interests, and what you're looking for in a connection ..."
        />
      </View>

      <View>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginVertical: 10 }}
        >
          My detail
        </Text>

        <DetailSection iconName={"folder-outline"} title={"Occupation"} />
        <DetailSection
          iconName={"account-outline"}
          title={"Gender & Pronouns"}
        />
        <DetailSection iconName={"certificate"} title={"Education"} />
        <DetailSection iconName={"map-marker-outline"} title={"Location"} />

        <View>
          <Text variant="bodySmall" style={{ marginBottom: 10 }}>
            Most people also want to know:
          </Text>
          <DetailSection iconName={"ruler"} title={"Height"} />
          <DetailSection iconName={"smoking"} title={"Smoking"} />
          <DetailSection iconName={"glass-wine"} title={"Drinking"} />
          <DetailSection iconName={"cat"} title={"Pets"} />
          <DetailSection iconName={"human-child"} title={"Children"} />
          <DetailSection
            iconName={"star-shooting-outline"}
            title={"Zodiac sign"}
          />
          <DetailSection iconName={"folder-outline"} title={"Religion"} />
        </View>
      </View>

      <View style={style.enjoy}>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginVertical: 10 }}
        >
          I enjoy
        </Text>
        <Text variant="bodySmall">
          Adding your interest is a great way to find like-minded connection
        </Text>
        <View>
          <SectionedMultiSelect
            items={enjoy}
            IconRenderer={MIcon}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedEnjoy}
            selectedItems={selectedEnjoy}
            selectText="Choose something..."
            searchPlaceholderText="Search something..."
            colors={{ primary: "#00bdd6" }}
            styles={{ selectToggle: style.multiSelectBox }}
          />
        </View>
      </View>

      <View style={style.communicate}>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          I communicate in
        </Text>
        <View style={{ borderRadius: 20 }}>
          <SectionedMultiSelect
            items={language}
            IconRenderer={MIcon}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedLanguage}
            selectedItems={selectedLanguage}
            selectText="Choose some languages..."
            searchPlaceholderText="Search languages..."
            colors={{ primary: "#00bdd6" }}
            styles={{ selectToggle: style.multiSelectBox }}
          />
        </View>
      </View>

      <View style={style.linkedAccount}>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          Linked accounts
        </Text>
        <DetailSection iconName={"instagram"} title={"Instagram"} />
        <DetailSection iconName={"facebook"} title={"Facebook"} />
        <DetailSection iconName={"twitter"} title={"Twitter"} />
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: { paddingHorizontal: 10, gap: 50, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  process: {
    marginBottom: 20,
  },
  photos: {
    marginBottom: 20,
  },
  aboutMe: {
    marginBottom: 20,
  },
  myDetail: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  myDetail_name: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
  },
  enjoy: {
    marginBottom: 20,
  },
  communicate: {
    marginBottom: 20,
  },
  multiSelectBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#bbb",
    padding: 5,
    marginBottom: 6,
  },
  linkedAccount: {
    marginBottom: 20,
  },
  selectedImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginTop: 20,
  },
});

export default EditProfile;
