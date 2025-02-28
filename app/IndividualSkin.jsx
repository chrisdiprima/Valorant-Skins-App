import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { RadioButton } from "react-native-paper";

import React, { useRef, useState } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Carousel from "react-native-reanimated-carousel";

import weaponData from "../weaponTester.json";

import skinData from "../skinTester.json";
import contentTiers from "../contentTiers.json";

import Icon from "react-native-vector-icons/Feather";
import { icons } from "../constants";
import Animated from "react-native-reanimated";

import { useFocusEffect } from "@react-navigation/native";

const IndividualSkin = () => {
  const [selected, setSelected] = React.useState("");

  const levelText = {
    0: "Default",
    1: "VFX",
    2: "Animation",
    3: "Finisher",
    4: "Kill Counter",
  };

  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id;

  let skin = skinData.find((skin) => skin.uuid === id);
  const chromas = skin.chromas;
  const levels = skin.levels;
  const defaultSkin = chromas.find(
    (chroma) => chroma.displayName === skin.displayName
  );
  const dimensions = Dimensions.get("window");
  const [curIndex, setCurIndex] = useState(0);
  const [curLevel, setCurLevel] = useState(levels[0]);
  const carouselRef = useRef();

  let weapon = {};
  weaponData.forEach((w) => {
    w.skins.forEach((s) =>
      s.displayName == skin.displayName ? (weapon = w) : ""
    );
  });

  const [curVideo, setCurVideo] = useState(curLevel.streamedVideo);
  const player = useVideoPlayer(curVideo, (player) => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const costList = {
    "0cebb8be-46d7-c12a-d306-e9907bfc5a25": 1275,
    "e046854e-406c-37f4-6607-19a9ba8426fc": 2175,
    "60bca009-4182-7998-dee7-b8a2558dc369": 1775,
    "12683d76-48d7-84a3-4e09-6985794f0445": 875,
    "411e4a55-4e59-7757-41f0-86a53f101bb5": 2475,
  };
  return (
    <SafeAreaView className="flex-col bg-primary h-full pt-5 gap-6">
      <Pressable
        className="flex w-[90vw] self-center"
        onPress={() => router.back()}
      >
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
              source={{ uri: weapon.killStreamIcon }}
            />

            <View className="flex-row items-center gap-2">
              <Image className="w-10 h-10" source={icons.valPoints} />
              <Text className="text-white text-lg font-zDots">
                {costList[skin.contentTierUuid]}
              </Text>
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
                  key={chroma.uuid}
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

        {chromas.length > 1 && (
          <View className="flex-row gap-2 w-[95%] gap-4">
            {chromas.map((chroma, index) => (
              <Pressable
                key={chroma.uuid}
                onPress={() =>
                  carouselRef.current?.scrollTo({
                    count: index - curIndex,
                  })
                }
              >
                <Image
                  className={
                    curIndex === index
                      ? "border-solid border-4 border-highlighted2 w-14 h-14 rounded-lg"
                      : "w-14 h-14 rounded-lg"
                  }
                  source={{ uri: chroma.swatch }}
                />
              </Pressable>
            ))}
          </View>
        )}

        <View className="flex-row gap-[3%]">
          <Pressable
            className="flex w-[45%] h-fit bg-layer1 rounded-lg py-6 gap-2"
            onPress={() => {
              player.pause();
              router.push({
                pathname: "/GunsPage",
                params: { id: weapon.uuid, smallIcon: weapon.killStreamIcon },
              });
            }}
          >
            <Image
              resizeMode="contain"
              className="w-full h-[8vh]"
              source={{ uri: weapon.killStreamIcon }}
            />
            <Text className="text-center text-white text-2xl font-pMedium">
              All {weapon.displayName}'s
            </Text>
          </Pressable>
          <Pressable
            className="flex w-[45%] h-fit bg-layer1 rounded-lg py-6 gap-2"
            onPress={() => {
              player.pause();
              router.push({
                pathname: "/CollectionPage",
                params: {
                  id: weapon.uuid,
                  smallIcon: weapon.killStreamIcon,
                  collection: skin.displayName.substring(
                    0,
                    skin.displayName.lastIndexOf(" ")
                  ),
                },
              });
            }}
          >
            <Image
              resizeMode="contain"
              className="w-full h-[8vh]"
              source={{ uri: weapon.killStreamIcon }}
            />
            <Text className="text-center text-white text-2xl font-pMedium">
              {skin.displayName.replace(weapon.displayName, "")} Collection
            </Text>
          </Pressable>
        </View>

        {levels.length > 1 && (
          <View className="flex w-[90%] gap-5">
            <Text className="text-3xl font-pMedium text-white">Upgrades</Text>

            <View className="flex-col w-full gap-3 items-start">
              <View className="flex gap-2">
                {levels.map((level) => (
                  <Pressable
                    key={level.uuid}
                    onPress={() => {
                      setCurLevel(level);
                      setCurVideo(curLevel.streamedVideo);
                    }}
                    className={
                      curLevel == level
                        ? "flex-row border-solid border-2 border-highlighted2 rounded-lg p-3 items-center gap-4"
                        : "p-3"
                    }
                  >
                    <Text className="text-white font-pMedium text-lg">
                      {level.displayName}
                    </Text>
                    {curLevel == level && (
                      <View className="flex-row items-center gap-2">
                        <Image
                          className="w-10 h-10"
                          source={icons.radianitePoints}
                        />
                        <Text className="text-white text-2xl font-zDots">
                          10
                        </Text>
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
              <Text className="font-zDots text-xl text-white pt-2">
                Upgrade Level: {levelText[levels.indexOf(curLevel)]}
              </Text>
            </View>

            <View
              className="flex-1 items-center justify-center"
              onPressIn={() => console.log("pressed")}
            >
              <VideoView
                nativeControls={false}
                width={300}
                height={200}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
              {!player.playing && (
                <Icon
                  className="absolute"
                  name="play"
                  size={40}
                  color={"white"}
                />
              )}
              <Pressable
                className="w-full h-full absolute"
                onPress={() =>
                  player.playing ? player.pause() : player.play()
                }
              ></Pressable>
            </View>
          </View>
        )}
        {weapon.weaponStats != null && (
          <View className="flex gap-5 w-[90vw] pb-10">
            <Text className="text-white text-3xl font-zDots">Weapon Info</Text>
            <Text className="text-white text-xl font-pRegular">
              Category: {weapon.category.replace("EEquippableCategory::", "")}
            </Text>
            <Text className="text-white text-xl font-pRegular">
              Fire Rate: {weapon.weaponStats.fireRate} Rounds/Second
            </Text>
            <Text className="text-white text-xl font-pRegular">
              Magazine Size: {weapon.weaponStats.magazineSize} Rounds
            </Text>
            <Text className="text-white text-xl font-pRegular">
              Equip Time: {weapon.weaponStats.equipTimeSeconds} Seconds
            </Text>
            <Text className="text-white text-xl font-pRegular">
              Reload Time: {weapon.weaponStats.reloadTimeSeconds} Seconds
            </Text>
            <View className="flex-col">
              <Text className="text-white text-xl font-pRegular">
                Damage From{" "}
                {weapon.weaponStats.damageRanges[0].rangeStartMeters} to{" "}
                {weapon.weaponStats.damageRanges[0].rangeEndMeters} meters
              </Text>
              <View className="pl-5">
                <Text className="text-white text-xl font-pRegular">
                  Head: {weapon.weaponStats.damageRanges[0].headDamage} Damage
                </Text>
                <Text className="text-white text-xl font-pRegular">
                  Body: {weapon.weaponStats.damageRanges[0].bodyDamage} Damage
                </Text>
                <Text className="text-white text-xl font-pRegular">
                  Leg: {weapon.weaponStats.damageRanges[0].legDamage} Damage
                </Text>
              </View>
            </View>

            {weapon.weaponStats.damageRanges.length > 1 && (
              <View className="flex-col">
                <Text className="text-white text-xl font-pRegular">
                  Damage From{" "}
                  {weapon.weaponStats.damageRanges[1].rangeStartMeters} to{" "}
                  {weapon.weaponStats.damageRanges[1].rangeEndMeters} meters
                </Text>
                <View className="pl-5">
                  <Text className="text-white text-xl font-pRegular">
                    Head: {weapon.weaponStats.damageRanges[1].headDamage} Damage
                  </Text>
                  <Text className="text-white text-xl font-pRegular">
                    Body: {weapon.weaponStats.damageRanges[1].bodyDamage} Damage
                  </Text>
                  <Text className="text-white text-xl font-pRegular">
                    Leg: {weapon.weaponStats.damageRanges[1].legDamage} Damage
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndividualSkin;
