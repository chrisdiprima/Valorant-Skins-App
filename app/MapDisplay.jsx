import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Feather";

export default function MapDisplay() {
  const params = useLocalSearchParams();
  const id = params.id;
  let map = mapsData.find((map) => map.uuid === id);

  const router = useRouter();

  return (
    <>
      <SafeAreaView className="flex-col bg-primary h-full items-center py-5 gap-6 flex-1">
        <Pressable className="w-[90vw]" onPress={() => router.back()}>
          <Icon name="arrow-left" size={40} color={"white"} />
        </Pressable>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row w-[90vw] justify-between">
            <View className="flex-row items-center justify-between w-full">
              <Text className="text-white text-3xl font-zDots">
                {map.displayName}
              </Text>
            </View>
          </View>
          <Image
            className="w-full h-[30vh] rounded-lg"
            source={{ uri: map.splash }}
          />
          <View className="w-[90vw]">
            <Text className="text-white font-pRegular text-lg">
              {map.description}
            </Text>
          </View>
          <Image
            className="w-full h-[30vh] rounded-lg"
            source={{ uri: map.displayIcon }}
          />
          {map.callouts != null && (
            <View>
              <Text className="w-[90vw] text-white font-pRegular text-2xl">
                Map Callouts:
              </Text>
              <View className="flex-col gap-2 w-[80vw]">
                {map.callouts.map((callout, index) => (
                  <Text
                    className="text-white font-pRegular text-lg"
                    key={callout.regionName + index}
                  >
                    {callout.regionName}, Map Region: {callout.superRegionName}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}
