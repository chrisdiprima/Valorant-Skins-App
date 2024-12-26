import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SearchInput } from "../../components";

export default function SearchScreen() {
  return (
    <>
      <SafeAreaView className="flex-col bg-primary h-full items-center pt-5">
        <SearchInput placeText="Search the database" />
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}
