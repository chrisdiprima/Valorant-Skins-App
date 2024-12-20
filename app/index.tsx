import { Text, View } from "react-native";

import "../global.css";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-zDots">Home</Text>
      <Text style={{ fontFamily: "Poppins_400Regular" }}>Inter Black</Text>
    </View>
  );
}
