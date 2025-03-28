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

const ItemDisplay = ({
  type,
  itemName,
  classIcon,
  items,
  smallIcon,
  weapon,
}) => {
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
        } else if (type === "map") {
          router.push({
            pathname: "/MapDisplay",
            params: { id: item.uuid },
          });
        } else {
          router.push({
            pathname: "/IndividualSkin",
            params: {
              id: item.uuid,
            },
          });
        }
      }}
    >
      <Image
        resizeMode="contain"
        className={
          type == "agent"
            ? "w-2/3 h-2/3"
            : type === "map"
            ? "w-[40vw] h-[10vh]"
            : "w-[40vw] h-[8vh]"
        }
        source={
          type === "map"
            ? {
                uri: item.splash,
              }
            : { uri: item.displayIcon }
        }
      />
      <Text
        className={
          type === "skin"
            ? "text-white text-center font-pRegular text-xl w-[95%]"
            : "text-white text-center font-pRegular text-2xl w-[95%]"
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
        <Text className="text-white font-pRegular text-3xl">{itemName}</Text>
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
