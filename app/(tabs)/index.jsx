import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../../components";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { icons } from "../../constants";
import ItemDisplay from "../../components/ItemDisplay";

import agents from "../../agentsTester.json";

export default function AgentsScreen() {
  const [search, setSearch] = useState("");
  const [controllers, setControllers] = useState(
    agents.filter((agent) => agent.role.displayName === "Controller")
  );
  const [duelists, setDuelists] = useState(
    agents.filter((agent) => agent.role.displayName === "Duelist")
  );
  const [sentinels, setSentinels] = useState(
    agents.filter((agent) => agent.role.displayName === "Sentinel")
  );
  const [initiators, setInitiators] = useState(
    agents.filter((agent) => agent.role.displayName === "Initiator")
  );

  const organizedagents = [
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
    organizedagents.forEach((agentGroup) => {
      if (agentGroup.name === "Controllers") {
        setControllers(
          agents.filter(
            (agent) =>
              agent.displayName.toUpperCase().includes(search.toUpperCase()) &&
              agent.role.displayName == "Controller"
          )
        );
      }
      if (agentGroup.name === "Duelists") {
        setDuelists(
          agents.filter(
            (agent) =>
              agent.displayName.toUpperCase().includes(search.toUpperCase()) &&
              agent.role.displayName == "Duelist"
          )
        );
      }
      if (agentGroup.name === "Initiators") {
        setInitiators(
          agents.filter(
            (agent) =>
              agent.displayName.toUpperCase().includes(search.toUpperCase()) &&
              agent.role.displayName == "Initiator"
          )
        );
      }
      if (agentGroup.name === "Sentinels") {
        setSentinels(
          agents.filter(
            (agent) =>
              agent.displayName.toUpperCase().includes(search.toUpperCase()) &&
              agent.role.displayName == "Sentinel"
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
          data={organizedagents}
          keyExtractor={(item) => item.id}
          renderItem={(item) =>
            item.item.agents.length > 0 && (
              <ItemDisplay
                type="agent"
                className={item.item.name}
                classIcon={item.item.icon}
                items={item.item.agents}
              />
            )
          }
        />
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}
