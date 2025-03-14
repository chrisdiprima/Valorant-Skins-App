import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../components";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

import Icon from "react-native-vector-icons/Feather";
import { icons } from "../constants";
import ItemDisplay from "../components/ItemDisplay";

import { FlatList } from "react-native";

export default function CollectionPage() {
  const params = useLocalSearchParams();
  const id = params.id;
  const collectionName = params.collection;
  let smallIcon = params.smallIcon;
  let weapon = weaponData.find((weapon) => weapon.uuid === id);
  const allSkins = weapon.skins;

  const [search, setSearch] = useState("");

  let collectionSkins = [];
  weaponData.forEach((weapon) =>
    weapon.skins.forEach((skin) =>
      skin.displayName.includes(collectionName)
        ? collectionSkins.push(skin)
        : ""
    )
  );

  const [skins, setSkins] = useState(collectionSkins);

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
      collectionSkins.filter(
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
                  itemName={collectionName}
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
