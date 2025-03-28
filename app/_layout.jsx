import React, { useEffect } from "react";
import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { ZenDots_400Regular } from "@expo-google-fonts/zen-dots";
import * as SplashScreen from "expo-splash-screen";



import "../global.css";


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    ZenDots_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        className="bg-primary h-full"
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        className="bg-primary h-full"
        name="AgentPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        className="bg-primary h-full"
        name="GunsPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        className="bg-primary h-full"
        name="IndividualSkin"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        className="bg-primary h-full"
        name="CollectionPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        className="bg-primary h-full"
        name="MapDisplay"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default RootLayout;
