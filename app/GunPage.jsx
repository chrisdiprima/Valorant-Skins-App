import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import agentData from "../agentsTester.json";
import { icons } from "../constants";
import CountryFlag from "react-native-country-flag";
import Icon from "react-native-vector-icons/Feather";

export default function GunPage() {
  const params = useLocalSearchParams();
  const id = params.id;
  let agent = {};
  agentData.forEach((a) => {
    if (a.id == id) {
      agent = a;
    }
  });

  const abilities = agent.abilities;

  let icon;
  switch (agent.class) {
    case "Controller": {
      icon = icons.controllerIcon;
      break;
    }
    case "Duelist": {
      icon = icons.duelistIcon;
      break;
    }

    case "Initiator": {
      icon = icons.initiatorIcon;
      break;
    }

    case "Sentinel":
      icon = icons.sentinelIcon;
      break;
  }

  const [currentAbility, SetCurrentAbility] = useState(abilities.ability1);

  const AbilityView = ({ ability }) => (
    <View className="flex gap-2 pt-5">
      <Text className="text-2xl text-white font-zDots">{ability.name}</Text>
      <Text className="text-lg text-white font-pRegular">
        {ability.description}
      </Text>
    </View>
  );

  const router = useRouter();

  return (
    <>
      <SafeAreaView className="flex-col bg-primary h-full items-center pt-5 gap-6 flex-1">
        <ScrollView
          keyboardShouldPersistTaps="always"
          className=""
          contentContainerStyle={{
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row w-[90vw] gap-2 justify-between items-center">
            <View>
              <View className="flex-row gap-2 items-center">
                <Text className="text-white text-3xl font-zDots">
                  {agent.name}
                </Text>
                <CountryFlag isoCode="se" size={22} />
              </View>
              <View className="flex-row gap-2 items-center">
                <Image className="w-5 h-5" source={icon} />
                <Text className="text-white text-xl font-pRegular">
                  {agent.class}
                </Text>
              </View>
            </View>

            <Pressable
              className="z-30"
              onPress={() =>
                router.push({
                  pathname: "/(tabs)",
                })
              }
            >
              <Icon name="home" size={40} color="white" />
            </Pressable>
          </View>
          <View className="w-full h-[70vh]">
            <Image
              className="w-full h-[60vh] absolute z-20"
              source={icons.fullAgentTemplate}
            />
            <Image
              className="w-full h-[90vh] absolute z-10 top-[-10vh]"
              source={icons.agentBackgroundTemplate}
              tintColor="#062628"
            />
          </View>
          <View className="flex-col w-[90vw] gap-2">
            <Text className="text-white text-3xl font-pMedium ">Abilities</Text>

            <View className="flex-row gap-2">
              {Object.entries(abilities).map((ability, index) => {
                return (
                  <Pressable
                    className={
                      currentAbility.name === ability[1].name
                        ? "bg-highlighted w-20 h-20 p-2 rounded-xl z-30"
                        : "bg-layer1 w-20 h-20 p-2 rounded-xl z-30"
                    }
                    onPressIn={() => {
                      SetCurrentAbility(ability[1]);
                    }}
                    key={index}
                  >
                    <Image
                      className="w-full h-full"
                      source={icons.abilityTemplate}
                    />
                  </Pressable>
                );
              })}
            </View>
            <AbilityView ability={currentAbility} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}
