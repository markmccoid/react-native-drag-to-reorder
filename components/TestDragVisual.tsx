import { View, Text } from "react-native";
import { MotiView } from "moti";

const TestDragVisual: React.FC<{
  currentPosition: number;
  totalItems: number;
  itemHeight: number;
}> = ({ currentPosition, totalItems, itemHeight }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingTop: 8,
        paddingRight: 10,
        paddingLeft: 20,
      }}
    >
      <MotiView
        from={{ scale: 2.25 }}
        animate={{ scale: 1.5 }}
        transition={{ type: "timing", duration: 500 }}
        key={currentPosition}
      >
        <Text style={{ color: "blue", paddingRight: 3 }}>{currentPosition}</Text>
      </MotiView>
      <Text> of {totalItems} </Text>
    </View>
  );
};

export default TestDragVisual;
