import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { View, Text } from "react-native";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="h-full flex items-center mt-5">
      <Icon className="h-10" name={icon} size={28} color={color}></Icon>
      <Text className="w-full" style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#019C81",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#091717",
          borderTopWidth: 0,
          borderTopColor: "#fff",
          height: 84,
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
