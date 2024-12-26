import { View, Text } from "react-native";
import React from "react";

const Item = ({ type, name }) => {
  return (
    <View>
      <Image />
      <Text>{name}</Text>
    </View>
  );
};

export default Item;
