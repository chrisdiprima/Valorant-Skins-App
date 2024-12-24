import { View, Text } from 'react-native'
import React from 'react'

const ItemSection = () => {
  return (
    <FlatList 
      data={data}
      numColumns={2}
    />
  )
}

export default ItemSection