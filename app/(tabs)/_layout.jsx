import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { TabIcon } from "../../components";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarHideOnKeyboard: true,
				backBehavior: "firstRoute",
				tabBarActiveTintColor: "#019C81",
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: "#091717",
					borderTopWidth: 0,
					height: 75,
				},
				tabBarButton: (props) => (
					<TouchableOpacity {...props} activeOpacity={1} />
				),
			}}
		>
			<Tabs.Screen
				activeOpacity={1}
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
				name="maps"
				options={{
					title: "Maps",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabIcon
							icon="map"
							color={color}
							name="Maps"
							focused={focused}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
