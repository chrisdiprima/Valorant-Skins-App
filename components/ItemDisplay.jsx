import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";

const ItemDisplay = ({ type, className, classIcon, items }) => {
  const Item = ({ title }) => (
    <Pressable
      className={
        type === "agent"
          ? "bg-layer1 rounded-xl w-[48%] h-[22vh] flex justify-center items-center gap-2"
          : "bg-layer1 rounded-xl w-[48%] h-[18vh] flex justify-center items-center gap-5 pt-8"
      }
      onPress={() => console.log("clicked: " + title)}
    >
      <Image
        className={
          type == "agent" ? "w-2/3 h-2/3" : "w-[90%] h-[6vh] min-h-fit"
        }
        source={type == "agent" ? icons.agentTemplate : icons.gunTemplate}
      />
      <Text className="text-white text-3xl text-center font-pRegular text-2xl">
        {title}
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
        keyExtractor={(item) => item.id}
        renderItem={(item) => <Item title={item.item.name} />}
      />
    </View>
  );
};

export default ItemDisplay;
