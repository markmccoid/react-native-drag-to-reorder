import React, { useState } from "react";
import { Image, Platform, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { ITEM_HEIGHT } from "./constants";
import { MaterialIcons } from "@expo/vector-icons";

//ADD Delete icon and delete function from Store so Deletoing of item can be tested.
//Update Items array to be generic items (maybe grocery list)
//Make item ids alpha
const Item = ({
  name,
  id,
  onRemoveItem,
  firstItem,
}: {
  name: string;
  id: string | number;
  onRemoveItem?: () => void;
  firstItem: boolean;
}) => {
  const firstItemStyle = firstItem ? { borderTopWidth: 1, borderTopColor: "#aaa" } : {};

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          height: ITEM_HEIGHT,
          padding: 10,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#aaa",
          flex: 1,
        },
        firstItemStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          marginRight: 10,
        }}
      >
        {name}
      </Text>

      <Text style={{ fontSize: 16, color: "gray", fontWeight: "600" }}>{`(id-${id})`}</Text>
      {onRemoveItem && (
        <TouchableOpacity onPress={onRemoveItem} style={{ position: "absolute", right: 15 }}>
          <MaterialIcons name="delete" size={25} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Item;
