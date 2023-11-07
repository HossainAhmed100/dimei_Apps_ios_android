import { Pressable } from "react-native";
import { Text, View, Image } from "react-native";
import { images, COLORS, SIZES } from '../constants';

const Main = ({ navigation }) => {
  return (
    <View style={{flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.white500,}}>
      <View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Image
            style={{
              resizeMode: "cover",
              height: 250,
              width: 300,
            }}
            source={images.policyOnBoard}
          />
        </View>
        <View style={{ flexDirection: "column", gap: SIZES.xSmall, marginBottom: 80 }}>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{
              backgroundColor: COLORS.blue500,
              width: 300,
              paddingVertical: SIZES.small,
              paddingHorizontal: SIZES.large,
              borderRadius: SIZES.small,
              alignItems: "center",
              justifyContent: "center",
              borderColor: COLORS.blue500,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: COLORS.white500 }}>
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{
              backgroundColor: COLORS.white500,
              width: 300,
              paddingVertical: SIZES.small,
              paddingHorizontal: SIZES.large,
              borderRadius: SIZES.small,
              alignItems: "center",
              justifyContent: "center",
              borderColor: COLORS.slate500,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#282F3E" }}>
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};


export default Main;
