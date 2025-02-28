import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../../components";
import { useEffect, useState } from "react";

import { icons } from "../../constants";
import ItemDisplay from "../../components/ItemDisplay";

import { FlatList } from "react-native";

export default function maps() {
	const [search, setSearch] = useState("");
	const [maps, setMaps] = useState();
	const [mapsData, setMapsData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://valorant-api.com/v1/maps"
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setMaps(
					data.data.filter(
						(map) =>
							!map.displayName.toLowerCase().includes("range") &&
							!map.displayName.toLowerCase().includes("basic")
					)
				);
				setMapsData(data.data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (mapsData != null) {
			setMaps(
				mapsData.filter(
					(map) =>
						map.displayName
							.toUpperCase()
							.includes(search.toUpperCase()) &&
						!map.displayName.toLowerCase().includes("range") &&
						!map.displayName.toLowerCase().includes("basic")
				)
			);
		}
	}, [search]);

	const organizedMapData = [
		{
			id: 1,
			name: "All Maps",
			icon: icons.gunIcon,
			maps: maps,
		},
	];

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (error) {
		return <Text>Error: {error.message}</Text>;
	}

	return (
		<>
			<SafeAreaView className="flex-col bg-primary h-full items-center pt-5 gap-6 flex-1">
				<SearchInput
					placeText="Search for a map"
					searchText={search}
					changeSearchText={setSearch}
				/>

				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						display: "flex",
						paddingBottom: 20,
					}}
					data={organizedMapData}
					keyExtractor={(item) => item.id}
					renderItem={(item) => {
						return (
							<ItemDisplay
								type="map"
								itemName={item.item.name}
								classIcon={item.item.icon}
								items={maps}
							/>
						);
					}}
				/>
			</SafeAreaView>
			<StatusBar style="light" />
		</>
	);
}
