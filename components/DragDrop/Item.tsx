import React, { useState } from "react";
import { Image, Platform, StatusBar, Text, useWindowDimensions, View } from "react-native";
import { ITEM_HEIGHT } from "./constants";

const Item = ({ name, id }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: ITEM_HEIGHT,
        padding: 10,
        backgroundColor: "white",
        borderBottomWidth: 1,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 4,
          marginRight: 10,
        }}
      >
        {name}
      </Text>

      <Text style={{ fontSize: 16, color: "gray", fontWeight: "600" }}>{name}</Text>
    </View>
  );
};

export default Item;
