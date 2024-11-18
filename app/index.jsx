import MainLayout from "../components/layout/MainLayout";
import { Provider } from "react-redux";
import store from "../redux/store";
import firebaseConfig from "../utils/firebaseConfigWebApp";
import { getApps, initializeApp } from "firebase/app";

if (!getApps().length) {
  initializeApp(firebaseConfig);
  console.log("Firebase initialized");
} else {
  console.log("Firebase already initialized");
}

export default function Index() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}
