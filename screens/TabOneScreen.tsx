import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useStore, ItemType } from "../store/store";
import { HoldItem } from "react-native-hold-menu";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import DragDropEntry, { ScrollFunctions } from "../components/DragDrop/DragDropEntry";
import { sortArray } from "../components/DragDrop/helperFunctions";

import Item from "../components/DragDrop/Item";

export default function TabOneScreen() {
  // const TempArray = [{ name: 1 }, { name: 2 }];
  const [newItem, setNewItem] = React.useState("eeee");
  const items = useStore((state) => state.itemList);
  const addItem = useStore((state) => state.addItem);
  const removeItem = useStore((state) => state.removeItem);
  const updateItemList = useStore((state) => state.updateItemList);
  const updatePositions2 = useStore((state) => state.updatePositions2);

  const [scrollFunctions, setScrollFunctions] = React.useState<ScrollFunctions>();

  React.useEffect(() => {
    if (scrollFunctions) {
      scrollFunctions.scrollToEnd();
    }
  }, [items.length]);
  const pressed = () => console.log("testing rpessed");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drag and Drop Reanimated 2</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <DragDropEntry
        scrollStyles={{ width: 300, borderWidth: 1, borderColor: "red" }}
        updatePositions={(positions) => updateItemList(sortArray<ItemType>(positions, items))}
        getScrollFunctions={(functionObj) => {
          setScrollFunctions(functionObj);
        }}
        itemHeight={50}
        handlePosition="left"
        enableDragIndicator={true}
      >
        {items.map((item) => {
          return <Item key={item.id} name={item.name} id={item.id} />;
        })}
      </DragDropEntry>
      <TextInput
        style={{
          width: 100,
          height: 30,
          borderWidth: 1,
          paddingHorizontal: 10,
          marginTop: 25,
        }}
        value={newItem}
        onChangeText={setNewItem}
        onSubmitEditing={(e) => addItem(e.nativeEvent.text)}
      />
      <HoldItem
        items={[
          {
            text: "Reply",
            onPress: (x) => {
              console.log("reply");
            },
          },
          { text: "Edit" },
          { text: "Delete", onPress: () => {} },
        ]}
      >
        <View style={{ height: 50, width: 100, backgroundColor: "blue" }}></View>
      </HoldItem>
      <View>
        {items.map((item) => (
          <Text key={item.id}>{`${item.name}--${item.pos}`}</Text>
        ))}
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
    borderColor: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
