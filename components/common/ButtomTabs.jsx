import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../../pages/Home";
import { Chat } from "../../pages/Chat";
import { Heart } from "../../pages/Heart";
import { Save } from "../../pages/Save";
import Auth from "./Auth";
import Feather from "@expo/vector-icons/Feather";

const ButtomTabs = () => {
  const Tab = createBottomTabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarOptions: {
          activeTintColor: "black",
        },
      },
      tabBarIcon: (tabInfo) => {
        reuturn(
          <Feather
            name="home"
            size={24}
            color={tabInfo.focused ? "black" : "red"}
          />
        );
      },
    },
  });
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Heart" component={Heart} />
      <Tab.Screen name="Save" component={Save} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
};

export default ButtomTabs;
