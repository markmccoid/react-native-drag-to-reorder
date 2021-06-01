import * as React from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedReaction,
  scrollTo,
} from "react-native-reanimated";
import { useStore } from "../../store/store";
import MoveableItem from "./MoveableItem";
import Item from "../Item";
import { ITEM_HEIGHT } from "./constants";
import { ItemType, Positions } from "../../store/store";

interface Props {
  items: ItemType[];
  updatePositions: (positions: Positions) => void;
}
function listToObject(list) {
  const values = Object.values(list);
  const object = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
}

function objectMove(positions, from, to) {
  "worklet";
  const newObject = { ...positions.value };

  for (const id in positions.value) {
    if (positions.value[id] === from) {
      newObject[id] = to;
    }

    if (positions.value[id] === to) {
      newObject[id] = from;
    }
  }
  positions.value = newObject;
  return positions;
}

const DragDropEntry = ({ items, updatePositions }: Props) => {
  const [text, onChangeText] = React.useState("Useless Text");
  // const items = useStore((state) => state.itemList);
  //*Scrollview animated ref
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const positions = useSharedValue<Positions>({});
  const scrollY = useSharedValue(0);
  const [containerHeight, setContainerHeight] = React.useState(0);
  // const containerHeight = React.useRef(0); //useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    // console.log("SCROLLY", scrollY.value);
  });

  const calculatePositions = (
    positions: Animated.SharedValue<Positions>,
    items: ItemType[]
  ) => {
    positions.value = Object.assign({}, ...items.map((item) => ({ [item.id]: item.pos })));
    return positions;
  };

  //!If you use this, then in the MoveableItem component
  //! we are animated the ScrollY.value and thus, this
  //! animated Reaction will be kicked off as it changes
  //! and scrolls through.
  // useAnimatedReaction(
  //   () => scrollY.value,
  //   (scrolling) => {
  //     console.log("scrolling", scrolling);
  //     scrollTo(scrollViewRef, 0, scrolling, false);
  //   }
  // );

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{ width: 200, borderWidth: 1, borderColor: "red" }}
      onLayout={(e) => {
        setContainerHeight(e.nativeEvent.layout.height);
      }}
      contentContainerStyle={{
        height: items.length * ITEM_HEIGHT,
      }}
    >
      {items.map((item) => {
        return (
          <MoveableItem
            id={item.id}
            name={item.name}
            key={item.id}
            scrollY={scrollY}
            scrollViewRef={scrollViewRef}
            numberOfItems={items.length}
            positions={calculatePositions(positions, items)}
            containerHeight={containerHeight}
            updatePositions={updatePositions}
          >
            <Item name={item.name} />
          </MoveableItem>
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: 100,
    padding: 10,
    borderWidth: 1,
  },
});
export default DragDropEntry;
