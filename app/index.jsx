import { Text, View } from "react-native";
import MainLayout from "../components/layout/MainLayout";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ButtomTabs } from "../components/common/ButtomTabs";
import { NavigationContainer } from "@react-navigation/native";

export default function Index() {
  return (
    <Provider store={store}>
      <MainLayout>
        <NavigationContainer>
          <ButtomTabs />
        </NavigationContainer>
      </MainLayout>
    </Provider>
  );
}
