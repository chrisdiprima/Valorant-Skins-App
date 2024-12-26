import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";

const ItemDisplay = ({ className, classIcon, items }) => {
  const Item = ({ title }) => (
    <Pressable
      className="bg-layer1 rounded-xl w-[48%] h-[22vh] flex justify-center items-center gap-2"
      onPress={() => console.log("clicked: " + title)}
    >
      <Image className="w-2/3 h-2/3" source={icons.agentTemplate} />
      <Text className="text-white text-3xl text-center font-pRegular text-2xl">
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View className="flex w-[90vw] gap-4 pb-4">
      <View className="flex-row gap-2 justify-start">
        <Image source={classIcon} />
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
