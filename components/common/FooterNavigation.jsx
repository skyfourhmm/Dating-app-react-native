import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Profile from "../../pages/Profile";
import Heart from "../../pages/Heart";
import Save from "../../pages/Save";
import Chat from "../../pages/Chat";
import ChatContent from "../Chat/ChatContent";
import EditProfile from "./EditProfile";
import VideoCall from "../Chat/VideoCall";
import AccountInfo from "./AccountInfo";
import Setting from "./Setting";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatPreview from "../Chat/ChatPreview";

const ProfilePage = () => {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="ProfileProfileStack"
        component={Profile}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
      ></ProfileStack.Screen>
    </ProfileStack.Navigator>
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
      ></ChatStack.Screen>
    </ChatStack.Navigator>
  );
};

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="AccountInfo" component={AccountInfo}></Drawer.Screen>
      <Drawer.Screen name="Setting" component={Setting}></Drawer.Screen>
    </Drawer.Navigator>
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
