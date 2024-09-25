import { Text, View } from "react-native";
import MainLayout from "../components/layout/MainLayout";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function Index() {
  return (
    <Provider store={store}>
      <MainLayout>
        <Text>Dating app starting...</Text>
      </MainLayout>
    </Provider>
  );
}
