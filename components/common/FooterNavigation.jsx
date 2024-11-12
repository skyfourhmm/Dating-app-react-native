import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Profile from "../../pages/Profile";
import Heart from "../../pages/Heart";
import Save from "../../pages/Save";
import Chat from "../../pages/Chat";
import ChatContent from "../Chat/ChatContent";
import EditProfile from "./EditProfile";
import VideoCall from "../Chat/VideoCall";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ChatPreview from "../Chat/ChatPreview";

const ProfilePage = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileStack" component={Profile}></Stack.Screen>
      <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
    </Stack.Navigator>
  );
};

const ChatPage = () => {
  const ChatStack = createStackNavigator();
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="ChatStack" component={Chat}></ChatStack.Screen>
      <ChatStack.Screen
        name="ChatPreview"
        component={ChatPreview}
      ></ChatStack.Screen>
      <ChatStack.Screen
        name="VideoCall"
        component={VideoCall}
      ></ChatStack.Screen>
      <ChatStack.Screen
        name="ChatContent"
        component={ChatContent}
        // options={({ route }) => ({
        //   tabBarStyle: { display: "none" },
        // })}
      ></ChatStack.Screen>
    </ChatStack.Navigator>
  );
};

const FooterNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: "#00bdd6",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Heart"
        component={Heart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Save"
        component={Save}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="send" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default FooterNavigation;
