import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import Auth from "../common/Auth";
import { useSelector } from "react-redux";
import FooterNavigation from "../common/FooterNavigation";
import { NavigationContainer, useRoute } from "@react-navigation/native";

function MainLayout() {
  const [loaded, error] = useFonts({
    "Inter-Bold": require("../../assets/fonts/NetflixSans-Bold.otf"),
    "Inter-Light": require("../../assets/fonts/NetflixSans-Light.otf"),
    "Inter-Medium": require("../../assets/fonts/NetflixSans-Medium.otf"),
    "Inter-Regular": require("../../assets/fonts/NetflixSans-Regular.otf"),
  });

  const auth = useSelector((state) => state.auth.authOpen);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // Thiết lập font mặc định cho tất cả Text components
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "Inter-Regular" };

  return (
    <React.Fragment>
      {auth ? (
        <Auth />
      ) : (
        <NavigationContainer independent={true}>
          <View style={{ flex: 1 }}>
            <FooterNavigation />
          </View>
        </NavigationContainer>
      )}
    </React.Fragment>
  );
}

export default MainLayout;
