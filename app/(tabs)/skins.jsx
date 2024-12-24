import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function SkinsScreen() {
  return (
    <>
      <SafeAreaView className="bg-primary h-full"></SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}
