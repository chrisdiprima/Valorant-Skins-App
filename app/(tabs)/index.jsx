import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../../components";
import { useEffect, useState } from "react";

import { icons } from "../../constants";
import ItemDisplay from "../../components/ItemDisplay";

import agentData from "../../agentsTester.json";
import { FlatList } from "react-native";

export default function AgentsScreen() {
  const [search, setSearch] = useState("");

  const [controllers, setControllers] = useState(
    agentData.filter((agent) => agent.class === "Controller")
  );
  const [duelists, setDuelists] = useState(
    agentData.filter((agent) => agent.class === "Duelist")
  );
  const [initiators, setInitiators] = useState(
    agentData.filter((agent) => agent.class === "Initiator")
  );
  const [sentinels, setSentinels] = useState(
    agentData.filter((agent) => agent.class === "Sentinel")
  );

  const organizedAgentData = [
    {
      id: 1,
      name: "Controllers",
      icon: icons.controllerIcon,
      agents: controllers,
    },
    {
      id: 2,
      name: "Duelists",
      icon: icons.duelistIcon,
      agents: duelists,
    },
    {
      id: 3,
      name: "Initiators",
      icon: icons.initiatorIcon,
      agents: initiators,
    },
    {
      id: 4,
      name: "Sentinels",
      icon: icons.sentinelIcon,
      agents: sentinels,
    },
  ];

  useEffect(() => {
    organizedAgentData.forEach((agentGroup) => {
      if (agentGroup.name === "Controllers") {
        setControllers(
          agentData.filter(
            (agent) =>
              agent.name.toUpperCase().includes(search.toUpperCase()) &&
              agent.class == "Controller"
          )
        );
      }

      if (agentGroup.name === "Duelists") {
        setDuelists(
          agentData.filter(
            (agent) =>
              agent.name.toUpperCase().includes(search.toUpperCase()) &&
              agent.class == "Duelist"
          )
        );
      }

      if (agentGroup.name === "Initiators") {
        setInitiators(
          agentData.filter(
            (agent) =>
              agent.name.toUpperCase().includes(search.toUpperCase()) &&
              agent.class == "Initiator"
          )
        );
      }

      if (agentGroup.name === "Sentinels") {
        setSentinels(
          agentData.filter(
            (agent) =>
              agent.name.toUpperCase().includes(search.toUpperCase()) &&
              agent.class == "Sentinel"
          )
        );
      }
    });
  }, [search]);

  return (
    <>
      <SafeAreaView className="flex-col bg-primary h-full items-center pt-5 gap-6 flex-1">
        <SearchInput
          placeText="Search for an agent"
          searchText={search}
          changeSearchText={setSearch}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            paddingBottom: 20,
          }}
          data={organizedAgentData}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            if (item.item.agents.length != 0) {
              return (
                <ItemDisplay
                  className={item.item.name}
                  classIcon={item.item.icon}
                  items={item.item.agents}
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
