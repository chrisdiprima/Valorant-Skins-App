import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";
import { useRouter } from "expo-router";

const ItemDisplay = ({ type, className, classIcon, items, smallIcon }) => {
  const router = useRouter();
  const Item = ({ item }) => (
    <Pressable
      className={
        type === "agent"
          ? "bg-layer1 rounded-xl w-[48%] h-[22vh] flex justify-center items-center gap-3 pt-2"
          : "bg-layer1 rounded-xl w-[48%] h-fit flex justify-center items-center gap-5 py-6"
      }
      onPress={() => {
        if (type === "agent")
          router.push({
            pathname: "/AgentPage",
            params: { id: item.uuid },
          });
        else if (type === "weapon") {
          router.push({
            pathname: "/GunsPage",
            params: { id: item.uuid, smallIcon: item.killStreamIcon },
          });
        } else {
          router.push({
            pathname: "/IndividualSkin",
            params: { id: item.uuid, smallIcon: smallIcon },
          });
        }
      }}
    >
      <Image
        resizeMode="contain"
        className={type == "agent" ? "w-2/3 h-2/3" : "w-[40vw] h-[8vh]"}
        source={{
          uri: item.displayIcon,
        }}
      />
      <Text
        className={
          type === "skin"
            ? (className = "text-white text-center font-pRegular text-xl")
            : (className = "text-white text-center font-pRegular text-2xl")
        }
      >
        {item.displayName}
      </Text>
    </Pressable>
  );

  return (
    <View className="flex w-[90vw] gap-4 pb-4">
      <View className="flex-row gap-2 justify-start">
        <Image className="w-7 h-7" source={classIcon} />
        <Text className="text-white font-pRegular text-3xl">{className}</Text>
      </View>
      <FlatList
        className="flex gap-3"
        columnWrapperStyle={{ gap: 12 }}
        numColumns={2}
        data={items}
        keyExtractor={(item) => item.uuid}
        renderItem={(item) => <Item item={item.item} />}
      />
    </View>
  );
};

export default ItemDisplay;
