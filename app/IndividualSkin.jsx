import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
// import Carousel from "react-native-reanimated-carousel";

import skinData from "../skinTester.json";
import contentTiers from "../contentTiers.json";

import Icon from "react-native-vector-icons/Feather";
import { icons } from "../constants";

const IndividualSkin = () => {
  const params = useLocalSearchParams();
  const id = params.id;
  const smallIcon = params.smallIcon;
  let skin = skinData.find((skin) => skin.uuid === id);
  const chromas = skin.chromas;
  const defaultSkin = chromas.find(
    (chroma) => chroma.displayName === skin.displayName
  );

  return (
    <SafeAreaView className="flex-col item-center bg-primary h-full pt-5">
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          alignItems: "center",
          gap: 4,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-col w-[90vw] gap-5">
          <Text className="text-white text-3xl font-zDots">
            {skin.displayName}
          </Text>
          <View className="flex-row w-[90vw] gap-1">
            <Image
              className="w-10 h-10"
              source={{
                uri: contentTiers.find(
                  (tier) => tier.uuid === skin.contentTierUuid
                ).displayIcon,
              }}
            />
            <Image
              resizeMode="contain"
              className="w-24 h-10"
              source={{ uri: smallIcon }}
            />

            <View className="flex-row items-center gap-2">
              <Image className="w-10 h-10" source={icons.valPoints} />
              <Text className="text-white text-lg font-zDots">1000</Text>
            </View>
          </View>
        </View>

        {/* <Carousel
          loop
          width={100}
          height={100}
          autoPlay={true}
          data={chromas}
          renderItem={(chroma) => console.log(chroma)}
        /> */}

        <View>
          <Image
            resizeMode="contain"
            className="w-10 h-10"
            source={{
              uri: defaultSkin.fullRender,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndividualSkin;
