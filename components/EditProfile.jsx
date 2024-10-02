import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import {
  ProgressBar,
  Avatar,
  Text,
  Icon,
  PaperProvider,
} from "react-native-paper";
import { MultiSelectDropdown } from "react-native-paper-dropdown";

const style = StyleSheet.create({
  container: { padding: 10, gap: 50 },
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
  linkedAccount: {
    marginBottom: 20,
  },
});

const details = [{}];
const enjoy = [
  { id: 1, name: "Play game" },
  { id: 2, name: "Watch movie" },
];
const language = [
  { id: 1, name: "English" },
  { id: 2, name: "VietNamese" },
];

const EditProfile = () => {
  const [selectedEnjoy, setSelectedEnjoy] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [aboutMe, setAboutMe] = useState("");

  return (
    <ScrollView style={style.container}>
      <View style={style.process}>
        <Text>Profile completion: 45%</Text>
        <ProgressBar progress={0.5} color="#00bdd6" />
      </View>

      <View style={style.photos}>
        <View>
          <Text
            variant="titleMedium"
            style={{ fontWeight: "bold", marginBottom: 10 }}
          >
            Photos
          </Text>
          <Text variant="bodySmall">
            The main photo is how you appear to others on the swipe view
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2 }}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{ height: 300, width: 200 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{ height: 100, width: 120 }}
            />
            <Image
              source={require("../assets/images/logo.png")}
              style={{ height: 100, width: 120 }}
            />
            <Image
              source={require("../assets/images/logo.png")}
              style={{ height: 100, width: 120 }}
            />
          </View>
        </View>
      </View>

      <View style={style.aboutMe}>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          About me
        </Text>
        <Text variant="bodySmall">
          Make it easy for others to get a sense of who you are.
        </Text>
        <TextInput
          style={{
            height: 100,
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
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          My detail
        </Text>
        <View style={style.myDetail}>
          <View style={{ gap: 10 }}>
            <View style={style.myDetail_name}>
              <Icon source="folder-outline" color="gray" size={20} />
              <Text style={{ color: "gray" }}>Occupation</Text>
            </View>
            <View style={style.myDetail_name}>
              <Icon source="account-outline" color="gray" size={20} />
              <Text style={{ color: "gray" }}>Gender & Pronouns</Text>
            </View>
            <View style={style.myDetail_name}>
              <Icon source="certificate" color="gray" size={20} />
              <Text style={{ color: "gray" }}>Education</Text>
            </View>
            <View style={style.myDetail_name}>
              <Icon source="map-marker-outline" color="gray" size={20} />
              <Text style={{ color: "gray" }}>Location</Text>
            </View>
          </View>

          <View style={{ alignContent: "center", gap: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ color: "gray" }}>Add</Text>
              <Icon source="chevron-right" color="gray" size={20} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ color: "gray" }}>Male</Text>
              <Icon source="chevron-right" color="gray" size={20} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ color: "gray" }}>Add</Text>
              <Icon source="chevron-right" color="gray" size={20} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ color: "gray" }}>NV89104</Text>
              <Icon source="chevron-right" color="gray" size={20} />
            </View>
          </View>
        </View>

        <View>
          <Text variant="bodySmall" style={{ marginBottom: 10 }}>
            Most people also want to know:
          </Text>
          <View style={style.myDetail}>
            <View style={{ gap: 10 }}>
              <View style={style.myDetail_name}>
                <Icon source="ruler" color="gray" size={20} />
                <Text style={{ color: "gray" }}>Height</Text>
              </View>
              <View style={style.myDetail_name}>
                <Icon source="smoking" color="gray" size={20} />
                <Text style={{ color: "gray" }}>Smoking</Text>
              </View>
              <View style={style.myDetail_name}>
                <Icon source="glass-wine" color="gray" size={20} />
                <Text style={{ color: "gray" }}>Drinking</Text>
              </View>
              <View style={style.myDetail_name}>
                <Icon source="cat" color="gray" size={20} />
                <Text style={{ color: "gray" }}>Pets</Text>
              </View>
              <View style={style.myDetail_name}>
                <Icon source="human-child" color="gray" size={20} />
                <Text style={{ color: "gray" }}>Children</Text>
              </View>
              <View style={style.myDetail_name}>
                <Icon source="star-shooting-outline" color="gray" size={20} />
                <Text style={{ color: "gray" }}>Zodiac sign</Text>
              </View>
              <View style={style.myDetail_name}>
                <Icon source="folder-outline" color="gray" size={20} />
                <Text style={{ color: "gray" }}>Religion</Text>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ color: "gray" }}>Add</Text>
                <Icon source="chevron-right" color="gray" size={20} />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ color: "gray" }}>Add</Text>
                <Icon source="chevron-right" color="gray" size={20} />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ color: "gray" }}>Add</Text>
                <Icon source="chevron-right" color="gray" size={20} />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ color: "gray" }}>Add</Text>
                <Icon source="chevron-right" color="gray" size={20} />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ color: "gray" }}>Add</Text>
                <Icon source="chevron-right" color="gray" size={20} />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ color: "gray" }}>Add</Text>
                <Icon source="chevron-right" color="gray" size={20} />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ color: "gray" }}>Add</Text>
                <Icon source="chevron-right" color="gray" size={20} />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={style.enjoy}>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          I enjoy
        </Text>
        <Text variant="bodySmall">
          Adding your interest is a great way to find like-minded connection
        </Text>
        <PaperProvider>
          <MultiSelectDropdown
            label={"Enjoy"}
            placeholder="Select Enjoy"
            options={enjoy}
            value={selectedEnjoy}
            onSelect={(value) => setSelectedEnjoy(value)}
          />
        </PaperProvider>
      </View>

      <View style={style.communicate}>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          I communicate in
        </Text>
        <PaperProvider>
          <MultiSelectDropdown
            label={"Language"}
            placeholder="Select Language"
            options={enjoy}
            value={selectedLanguage}
            onSelect={(value) => setSelectedLanguage(value)}
          />
        </PaperProvider>
      </View>

      <View style={style.linkedAccount}>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          Linked accounts
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ gap: 10 }}>
            <View style={style.myDetail_name}>
              <Icon source="instagram" color="gray" size={20} />
              <Text style={{ color: "gray" }}>Instagram</Text>
            </View>
            <View style={style.myDetail_name}>
              <Icon source="facebook" color="gray" size={20} />
              <Text style={{ color: "gray" }}>Facebook</Text>
            </View>
            <View style={style.myDetail_name}>
              <Icon source="twitter" color="gray" size={20} />
              <Text style={{ color: "gray" }}>Twitter</Text>
            </View>
          </View>
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ color: "gray" }}>Add</Text>
              <Icon source="chevron-right" color="gray" size={20} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ color: "gray" }}>Add</Text>
              <Icon source="chevron-right" color="gray" size={20} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ color: "gray" }}>Add</Text>
              <Icon source="chevron-right" color="gray" size={20} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default EditProfile;
