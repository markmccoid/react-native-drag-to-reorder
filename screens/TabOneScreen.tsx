import * as React from "react";
import { StyleSheet, TextInput, ScrollView } from "react-native";
import { useStore, ItemType } from "../store/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";

import DragDropEntry, { sortArray, TScrollFunctions } from "../components/DragAndSort";
import testDragIndicator from "../components/TestDragIndicator";

import Item from "../components/Item";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ITEM_HEIGHT } from "../components/constants";

export default function TabOneScreen() {
  const prevNumberOfItems = React.useRef(0);
  const [newItem, setNewItem] = React.useState("");
  const items = useStore((state) => state.itemList);
  const addItem = useStore((state) => state.addItem);
  const removeItemById = useStore((state) => state.removeItemById);
  const updateItemList = useStore((state) => state.updateItemList);

  const [scrollFunctions, setScrollFunctions] = React.useState<TScrollFunctions>();

  //! TODO:
  //!OTHER TODO - have different transitions on deletes??
  //* The useEffect below is used to scroll to the end or start
  //* on adds and deletes of items.  Without this the scroll will not
  //* move on adds/deletes of items
  // React.useEffect(() => {
  //   if (scrollFunctions) {
  //     // scrollFunctions.scrollToEnd();
  //     const numberOfItems = items.length;
  //     if (numberOfItems > prevNumberOfItems.current) {
  //       console.log("Scrolling To End >");
  //       scrollFunctions.scrollToEnd();
  //     } else if (numberOfItems < prevNumberOfItems.current) {
  //       //Item has been removed
  //       // If you want to scroll to end on delete must check top bound
  //       console.log("scroll to start");
  //       scrollFunctions.scrollToStart();
  //     }
  //   }
  //   prevNumberOfItems.current = items.length;
  // }, [items.length]);
  //************************************************* */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>D & D Grocery List </Text>
      <View style={styles.separator} />
      <DragDropEntry
        scrollStyles={{ width: "100%", height: "30%", borderWidth: 1, borderColor: "#aaa" }}
        updatePositions={(positions) =>
          updateItemList(sortArray<ItemType>(positions, items, "pos"))
        }
        getScrollFunctions={(functionObj) => setScrollFunctions(functionObj)}
        itemHeight={50}
        handlePosition="left"
        // handle={AltHandle}
        enableDragIndicator={true}
        dragIndicator={testDragIndicator}
      >
        {items.map((item, idx) => {
          return (
            <Item
              key={item.id}
              name={item.name}
              id={item.id}
              onRemoveItem={() => {
                removeItemById(item.id);
              }}
              firstItem={idx === 0 ? true : false}
            />
          );
        })}
      </DragDropEntry>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <TextInput
          style={{
            width: 200,
            // height: 30,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            margin: 5,
            marginTop: 10,
            fontSize: 20,
          }}
          placeholder="Enter New item"
          value={newItem}
          onChangeText={setNewItem}
          // onSubmitEditing={(e) => addItem(e.nativeEvent.text)}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            margin: 5,
            backgroundColor: "#0084fa",
            borderRadius: 10,
          }}
          onPress={() => {
            addItem(newItem);
            setNewItem("");
          }}
        >
          <Text style={{ color: "white", fontSize: 19 }}>Add New Item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            margin: 5,
            backgroundColor: "#0084fa",

            borderRadius: 10,
          }}
          onPress={() => {
            scrollFunctions?.scrollToStart();
          }}
        >
          <Text style={{ color: "white", fontSize: 19 }}>Scroll To Start</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{ width: "70%", height: "40%", borderWidth: 1, padding: 5, marginBottom: 10 }}
      >
        <ScrollView
          stickyHeaderIndices={[0]}
          style={{ marginHorizontal: 10, paddingHorizontal: 10 }}
        >
          <View key={0} style={{ borderBottomColor: "#777", borderBottomWidth: 1 }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16 }}>Item</Text>
              <Text style={{ fontSize: 16 }}>Pos</Text>
            </View>
          </View>
          {items.map((item) => (
            <View
              key={item.id}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16 }}>{`${item.name}`}</Text>
              <Text style={{ fontSize: 16 }}>{`${item.pos}`}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    // borderColor: "red",
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
});

const AltHandle = () => {
  const DragHandleIcon = ({ size, color, style }: DragHandleIconProps) => {
    return (
      <MaterialCommunityIcons name="drag-variant" size={size} color={color} style={style} />
    );
  };

  return (
    <View
      style={{
        borderRightWidth: 1,
        borderRightColor: "#aaa",
        borderBottomWidth: 0.5,
        borderBottomColor: "#aaa",
        borderTopWidth: 0.5,
        borderTopColor: "#aaa",
        height: "100%",
        justifyContent: "center",
        paddingHorizontal: 5,
      }}
    >
      <DragHandleIcon size={25} />
    </View>
  );
};
