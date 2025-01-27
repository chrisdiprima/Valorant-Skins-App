import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../../components";
import { useEffect, useState } from "react";

import Icon from "react-native-vector-icons/Feather";
import { icons } from "../../constants";
import ItemDisplay from "../../components/ItemDisplay";

import weaponData from "../../weaponTester.json";
import { FlatList, Pressable } from "react-native";

export default function AgentsScreen() {
  const [search, setSearch] = useState("");

  const [sidearms, setSidearms] = useState(
    weaponData.filter(
      (weapon) => weapon.category === "EEquippableCategory::Sidearm"
    )
  );
  const [smgs, setSmgs] = useState(
    weaponData.filter(
      (weapon) => weapon.category === "EEquippableCategory::SMG"
    )
  );
  const [shotguns, setShotguns] = useState(
    weaponData.filter(
      (weapon) => weapon.category === "EEquippableCategory::Shotgun"
    )
  );
  const [rifles, setRifles] = useState(
    weaponData.filter(
      (weapon) => weapon.category === "EEquippableCategory::Rifle"
    )
  );

  const [snipers, setSnipers] = useState(
    weaponData.filter(
      (weapon) => weapon.category === "EEquippableCategory::Sniper"
    )
  );

  const [machineGuns, setMachineGuns] = useState(
    weaponData.filter(
      (weapon) => weapon.category === "EEquippableCategory::Heavy"
    )
  );

  const [melee, setMelee] = useState(
    weaponData.filter(
      (weapon) => weapon.weaponClass === "EEquippableCategory::Melee"
    )
  );

  const organizedWeaponData = [
    {
      id: 1,
      name: "Sidearms",
      icon: icons.gunIcon,
      weapons: sidearms,
    },
    {
      id: 2,
      name: "SMGs",
      icon: icons.gunIcon,
      weapons: smgs,
    },
    {
      id: 3,
      name: "Shotguns",
      icon: icons.gunIcon,
      weapons: shotguns,
    },
    {
      id: 4,
      name: "Rifles",
      icon: icons.gunIcon,
      weapons: rifles,
    },
    {
      id: 5,
      name: "Snipers",
      icon: icons.gunIcon,
      weapons: snipers,
    },
    {
      id: 6,
      name: "Machine Guns",
      icon: icons.gunIcon,
      weapons: machineGuns,
    },
    {
      id: 7,
      name: "Melee",
      icon: icons.gunIcon,
      weapons: melee,
    },
  ];

  useEffect(() => {
    organizedWeaponData.forEach((weaponGroup) => {
      if (weaponGroup.name === "Sidearms") {
        setSidearms(
          weaponData.filter(
            (weapon) =>
              weapon.displayName.toUpperCase().includes(search.toUpperCase()) &&
              weapon.category == "EEquippableCategory::Sidearm"
          )
        );
      }

      if (weaponGroup.name === "SMGs") {
        setSmgs(
          weaponData.filter(
            (weapon) =>
              weapon.displayName.toUpperCase().includes(search.toUpperCase()) &&
              weapon.category == "EEquippableCategory::SMG"
          )
        );
      }

      if (weaponGroup.name === "Shotguns") {
        setShotguns(
          weaponData.filter(
            (weapon) =>
              weapon.displayName.toUpperCase().includes(search.toUpperCase()) &&
              weapon.category == "EEquippableCategory::Shotgun"
          )
        );
      }

      if (weaponGroup.name === "Rifles") {
        setRifles(
          weaponData.filter(
            (weapon) =>
              weapon.displayName.toUpperCase().includes(search.toUpperCase()) &&
              weapon.category == "EEquippableCategory::Rifle"
          )
        );
      }

      if (weaponGroup.name === "Snipers") {
        setSnipers(
          weaponData.filter(
            (weapon) =>
              weapon.displayName.toUpperCase().includes(search.toUpperCase()) &&
              weapon.category == "EEquippableCategory::Sniper"
          )
        );
      }

      if (weaponGroup.name === "Machine Guns") {
        setMachineGuns(
          weaponData.filter(
            (weapon) =>
              weapon.displayName.toUpperCase().includes(search.toUpperCase()) &&
              weapon.category == "EEquippableCategory::Heavy"
          )
        );
      }

      if (weaponGroup.name === "Melee") {
        setMelee(
          weaponData.filter(
            (weapon) =>
              weapon.displayName.toUpperCase().includes(search.toUpperCase()) &&
              weapon.category == "EEquippableCategory::Melee"
          )
        );
      }
    });
  }, [search]);

  return (
    <>
      <SafeAreaView className="flex-col bg-primary h-full items-center pt-5 gap-6 flex-1">
        
        <SearchInput
          placeText="Search for a weapon"
          searchText={search}
          changeSearchText={setSearch}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            paddingBottom: 20,
          }}
          data={organizedWeaponData}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            if (item.item.weapons.length != 0) {
              return (
                <ItemDisplay
                  type="weapon"
                  itemName={item.item.name}
                  classIcon={item.item.icon}
                  items={item.item.weapons}
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
