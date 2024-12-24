import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../../components";
import { useState } from "react";

export default function AgentsScreen() {
  return (
    <>
      <SafeAreaView className="flex-col bg-primary h-full items-center pt-5">
        <SearchInput />
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}
