import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="h-full flex items-center mt-5">
      <Icon className="h-10" name={icon} size={28} color={color}></Icon>
      <Text className="w-full text-xs font-bold" style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
