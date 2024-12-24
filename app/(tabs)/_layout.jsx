import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { TabIcon } from "../../components";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#019C81",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#091717",
          borderTopWidth: 0,
          height: 75,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Agents",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="user"
              color={color}
              name="Agents"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="skins"
        options={{
          title: "Skins",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="crosshair"
              color={color}
              name="Skins"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="search"
              color={color}
              name="Search"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="settings"
              color={color}
              name="Settings"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
