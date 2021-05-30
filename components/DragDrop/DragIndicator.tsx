import React from "react";
import { View } from "react-native";
import { MotiView, Text } from "moti";
/**.
 * Need to move this to separate file
 * Move the "default" children we have above to the file also
 * Allow for persons own component to be sent
 * would need to be able to pass the movingPos (better name probably is currentPos)
 * and the numberOfItems to the component so they can be used in display
 * DragIndicator component needs better name and should allow style to be passed so that it
 * can be positioned properly
 */
const DragIndicator: React.FC<{ itemHeight: number; fromLeftOrRight?: "left" | "right" }> = ({
  children,
  itemHeight,
  fromLeftOrRight = "right",
}) => {
  const direction = fromLeftOrRight === "left" ? -1 : 1;

  return (
    <MotiView
      style={{
        position: "absolute",
        [fromLeftOrRight]: 0,
        backgroundColor: "#eee",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,
        marginTop: (itemHeight - itemHeight / 1.5) / 2,
        height: itemHeight / 1.5,
      }}
      from={{
        opacity: 0.5,
        translateX: 100 * direction,
        // scale: 0.5,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
        // scale: 1,
      }}
      exit={{
        opacity: 0.5,
        translateX: 100 * direction,
        // scale: 0.5,
      }}
      transition={{
        type: "spring",
        delay: 100,
      }}
      exitTransition={{
        type: "spring",
        delay: 500,
      }}
    >
      {children}
    </MotiView>
  );
};

export default DragIndicator;

export const DragIndicatorDisplay: React.FC<{
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
        <Text style={{ color: "green", paddingRight: 3 }}>{currentPosition}</Text>
      </MotiView>
      <Text> of {totalItems} </Text>
    </View>
  );
};
