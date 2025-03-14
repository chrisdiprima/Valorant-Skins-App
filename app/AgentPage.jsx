import {
  Text,
  View,

  Image,
  ScrollView,
  Pressable,
  
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import agentCountries from "../agentCountries.json";

import { icons } from "../constants";
import CountryFlag from "react-native-country-flag";
import Icon from "react-native-vector-icons/Feather";

export default function AgentPage() {
  const params = useLocalSearchParams();
  const id = params.id;
  let agent = agentData.find((agent) => agent.uuid === id);
  let agentCountry = agentCountries.find(
    (item) => item.name === agent.displayName
  );

  const abilities = agent.abilities.filter(
    (ability) => ability.slot != "Passive"
  );

  let icon;
  switch (agent.role.displayName) {
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

  const [currentAbility, SetCurrentAbility] = useState(abilities[0]);

  const AbilityView = ({ ability }) => (
    <View className="flex gap-2 pt-5">
      <Text className="text-2xl text-white font-zDots">
        {ability.displayName}
      </Text>
      <Text className="text-lg text-white font-pRegular">
        {ability.description}
      </Text>
    </View>
  );

  const router = useRouter();

  return (
    <>
      <SafeAreaView className="flex-col bg-primary h-full items-center pt-5 gap-6 flex-1">
        <Pressable className="w-[90vw]" onPress={() => router.back()}>
          <Icon name="arrow-left" size={40} color={"white"} />
        </Pressable>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            alignItems: "center",
            gap: 4,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row w-[90vw] justify-between">
            <View className="flex-row items-center justify-between w-full">
              <View>
                <View className="flex-row gap-2 items-center">
                  <Text className="text-white text-3xl font-zDots">
                    {agent.displayName}
                  </Text>
                  {agentCountry.country_iso && (
                    <CountryFlag isoCode={agentCountry.country_iso} size={22} />
                  )}
                </View>
                <View className="flex-row gap-2 items-center">
                  <Image className="w-5 h-5" source={icon} />
                  <Text className="text-white text-2xl font-pRegular">
                    {agent.role.displayName}
                  </Text>
                </View>
              </View>
              
            </View>
          </View>
          
          <View className="w-full h-[70vh]">
            <Image
              className="w-full h-[60vh] absolute z-20"
              source={{ uri: agent.fullPortrait }}
            />
            <Image
              className="w-full h-[90vh] absolute z-10 top-[-10vh]"
              source={{ uri: agent.background }}
              tintColor="#062628"
            />
          </View>
          <View className="flex-col w-[90vw]">
            <Text className="text-white text-3xl font-pMedium ">Abilities</Text>

            <View className="flex-row gap-2">
              {Object.entries(abilities).map((ability, index) => {
                return (
                  <Pressable
                    className={
                      currentAbility.displayName === ability[1].displayName
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
                      source={{ uri: ability[1].displayIcon }}
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
