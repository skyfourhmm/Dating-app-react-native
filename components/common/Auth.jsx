import { View, Image } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";

function Auth() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
        />
        {/* <Text style={{ fontSize: 40, fontWeight: 700 }}>HeartSync</Text> */}
        <Text variant="displaySmall" style={{ fontWeight: 700 }}>
          HeartSync
        </Text>
        <Text style={{ color: "#939498" }}>
          Where Heart Connect, Love Finds Its Sync
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Button
          mode="text"
          onPress={() => console.log("Pressed")}
          buttonColor="#000"
          labelStyle={{ color: "white", fontSize: 18 }}
          style={{
            marginBottom: 20,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
          icon="apple"
        >
          Continue with Apple
        </Button>
        <Button
          mode="text"
          onPress={() => console.log("Pressed")}
          buttonColor="#369ae6"
          labelStyle={{ color: "white", fontSize: 18 }}
          icon="facebook"
          style={{
            marginBottom: 20,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          Continue with Facebook
        </Button>
        <Button
          mode="text"
          onPress={() => console.log("Pressed")}
          buttonColor="#00bdd5"
          labelStyle={{ color: "white", fontSize: 18 }}
          icon="cellphone-text"
          style={{
            marginBottom: 20,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          Continue with Phone Number
        </Button>
      </View>
    </View>
  );
}

export default Auth;
