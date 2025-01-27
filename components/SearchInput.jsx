import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const SearchInput = ({ placeText, searchText, changeSearchText }) => {

  return (
    <View className="flex-row bg-layer1 text-white w-[90%] justify-between items-center rounded-full border-2 border-lightText px-4">
      <View className="flex-row w-[60vw] items-center gap-2">
        <TouchableOpacity onPress={changeSearchText}>
          <Icon name="search" size={26} color="#fff"></Icon>
        </TouchableOpacity>
        <TextInput
          className="w-full text-xl text-white"
          autoCorrect={false}
          onChangeText={changeSearchText}
          value={searchText}
          placeholder={placeText}
          placeholderTextColor="#CAD5D6"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          changeSearchText("");
          Keyboard.dismiss();
        }}
      >
        <Icon name="x" size={26} color="#fff"></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
