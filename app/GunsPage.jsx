import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../components";
import { useEffect, useState } from "react";
import { icons } from "../constants";
import Icon from "react-native-vector-icons/Feather";
import ItemDisplay from "../components/ItemDisplay";

import weaponData from "../weaponTester.json";
import { FlatList } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

export default function GunsPage() {
  const params = useLocalSearchParams();
  const id = params.id;
  let smallIcon = params.smallIcon;
  let weapon = weaponData.find((weapon) => weapon.uuid === id);
  const allSkins = weapon.skins;

  const [search, setSearch] = useState("");

  const [skins, setSkins] = useState(allSkins);

  const organizedWeaponData = [
    {
      id: 1,
      name: weapon.displayName,
      icon: icons.gunIcon,
      skins: skins,
    },
  ];

  useEffect(() => {
    setSkins(
      allSkins.filter(
        (skin) =>
          skin.displayName.toUpperCase().includes(search.toUpperCase()) &&
          !skin.displayName.toUpperCase().includes("STANDARD") &&
          !skin.displayName.toUpperCase().includes("RANDOM")
      )
    );
  }, [search]);

  const router = useRouter();

  return (
    <>
      <SafeAreaView className="flex-col bg-primary h-full items-center pt-5 gap-6 flex-1">
        <View className="flex-row gap-1 w-[90vw] items-center">
          <Pressable onPress={() => router.back()}>
            <Icon name="arrow-left" size={40} color={"white"} />
          </Pressable>
          <SearchInput
            placeText="Search for a weapon"
            className="w-10"
            searchText={search}
            changeSearchText={setSearch}
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            paddingBottom: 20,
          }}
          data={organizedWeaponData}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            if (item.item.skins.length != 0) {
              return (
                <ItemDisplay
                  type="skin"
                  itemName={item.item.name}
                  weapon={weapon}
                  classIcon={item.item.icon}
                  items={item.item.skins}
                  smallIcon={smallIcon}
                />
              );
            }
          }}
        />
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}
