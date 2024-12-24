import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  return (
    <>
      <SafeAreaView className="bg-primary h-full"></SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}
