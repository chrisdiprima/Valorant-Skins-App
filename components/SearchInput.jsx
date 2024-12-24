import React from "react";
import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const SearchInput = () => {
  const [search, onChangeSearch] = React.useState("");

  return (
    <View className="flex-row bg-layer1 text-white w-[90vw] justify-between items-center rounded-full border-2 border-lightText px-4">
      <View className="flex-row w-[60vw] items-center gap-2">
        <TouchableOpacity onPress={onChangeSearch}>
          <Icon name="search" size={28} color="#fff"></Icon>
        </TouchableOpacity>
        <TextInput
          className="w-full text-xl text-white"
          autoCorrect={false}
          onChangeText={onChangeSearch}
          value={search}
          placeholder="Search here"
          placeholderTextColor="#CAD5D6"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          onChangeSearch();
          Keyboard.dismiss();
        }}
      >
        <Icon name="x" size={28} color="#fff"></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
