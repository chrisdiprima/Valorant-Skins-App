import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useRef, useState } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Carousel from "react-native-reanimated-carousel";

import skinData from "../skinTester.json";
import contentTiers from "../contentTiers.json";

import Icon from "react-native-vector-icons/Feather";
import { icons } from "../constants";
import Animated from "react-native-reanimated";

const IndividualSkin = () => {
  const params = useLocalSearchParams();
  const id = params.id;
  const smallIcon = params.smallIcon;
  let skin = skinData.find((skin) => skin.uuid === id);
  const chromas = skin.chromas;
  const defaultSkin = chromas.find(
    (chroma) => chroma.displayName === skin.displayName
  );
  const dimensions = Dimensions.get("window");
  const [curIndex, setCurIndex] = useState(0);
  const carouselRef = useRef();

  return (
    <SafeAreaView className="flex-col item-center bg-primary h-full pt-5">
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          alignItems: "center",
          gap: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-col w-[90vw] gap-5">
          <Text className="text-white text-3xl font-zDots">
            {skin.displayName}
          </Text>
          <View className="flex-row w-[90vw] gap-4">
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

        <View className="flex-1 gap-10 py-10 px-5 bg-layer1 rounded-lg">
          <Carousel
            loop
            ref={carouselRef}
            width={dimensions.width * 0.85}
            height={dimensions.height * 0.3}
            data={chromas}
            useScrollView={true}
            scrollAnimationDuration={500}
            enabled={chromas.length < 2 ? false : true}
            onProgressChange={() =>
              setCurIndex(carouselRef.current.getCurrentIndex())
            }
            renderItem={(item) => (
              <Image
                resizeMode="contain"
                className="w-full h-full"
                source={{
                  uri: item.item.fullRender,
                }}
              />
            )}
          />
          <View
            className={
              chromas.length === 1
                ? "hidden"
                : "flex-row justify-between items-center gap-2"
            }
          >
            <Pressable
              onPress={() => {
                carouselRef.current.prev();
              }}
            >
              <Icon name="chevron-left" size={40} color="white" />
            </Pressable>
            <View className="flex-row gap-2">
              {chromas.map((chroma, index) => (
                <View
                  key={index}
                  className={
                    curIndex === index
                      ? "bg-highlighted2 h-5 w-3 rounded-full"
                      : "bg-white h-5 w-3 rounded-full"
                  }
                ></View>
              ))}
            </View>

            <Pressable
              onPress={() => {
                carouselRef.current.next();
              }}
            >
              <Icon name="chevron-right" size={40} color="white" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndividualSkin;
