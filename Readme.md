# React Native Drag to ReOrder

This code can be used to take a list of items and using a ScrollView, display them allowing the user to reorder the list of items via Drag and Drop. 

I am not sure how to make this into an NPM Module and don't have time currently to research this, but if the following dependancies are installed in a project, you can simply drop the **DragDrop** folder into your project.  I export all the needed types and components from this directory.

![](./Video-Demo.gif) 

## Dependancies

- react-native
- reanimated v2
- react-native-gesture-handler
- moti
- @expo/vector-icons

## Usage

The usage is to simply pass you items to be sorted and children to the **DragDropEntry** component. The children you will be passing should be components that:

1. Have an **id** prop
2. Have a height that MATCHES the **itemHeight** props value.

Here is an example of using the component.

The **DragDropEntry** component is the parent component that wrap the children **Items** that you want to be able to drag and drop.

There is a helper function, **sortArray**, that is very useful in reordering and resetting any position/index field in your list.

```tsx
import DragDropEntry, { sortArray, TScrollFunctions } from "../components/DragDrop";

const items = itemList: [
    { id: "a", name: "Coconut Milk", pos: 0 },
    { id: "b", name: "Lettuce", pos: 1 },
    { id: "c", name: "Walnuts", pos: 2 },
    { id: "d", name: "Chips", pos: 3 },
    { id: "e", name: "Ice Cream", pos: 4 },
    { id: "f", name: "Carrots", pos: 5 },
    { id: "g", name: "Onions", pos: 6 },
    { id: "h", name: "Cheese", pos: 7 },
    { id: "i", name: "Frozen Dinners", pos: 8 },
    { id: "j", name: "Yogurt", pos: 9 },
    { id: "k", name: "Kombucha", pos: 10 },
    { id: "l", name: "Lemons", pos: 11 },
    { id: "m", name: "Bread", pos: 12 },
  ];
... 

<DragDropEntry
	scrollStyles={{ width: "100%", height: "30%", borderWidth: 1, borderColor: "#aaa" }}
	updatePositions={(positions) =>
				updateItemList(sortArray<ItemType>(positions, items, "pos"))
		}
	getScrollFunctions={(functionObj) => setScrollFunctions(functionObj)}
	itemHeight={50}
	handlePosition="left"
	handle={AltHandle}
	enableDragIndicator={true}
>
  {items.map((item, idx) => {
      return (
        <Item
          key={item.id}
          name={item.name}
          id={item.id}
          onRemoveItem={() => removeItemById(item.id)}
          firstItem={idx === 0 ? true : false}
        />
      );
		})}
</DragDropEntry>
```

## DragDropEntry Props

It is helpful to see what parts make up the DragDropEntry component.  Here is a visual. 

![2021-05-31_23-55-04](./componentparts.png)

- **itemHeight** - *Required* - The height of the items that are returned as children of this component.  Needed so that we can calculate where each item should be positions.

- **updatePositions** - *Required* - function that will run after drop that will reorder/update positions.  It will be passed the positions array of objects, which you can use to reorder your array OR. you can use the **sortArray** helper function. 

  ```javascript
  positions = {
    id1: 3,
    id2: 1,
    id3: 2,
    id4: 0
  }
  ```

- **handle** - *Optional* - React component to be used for handle.  A default is provided. If you provide your own Handle component, take a look at **Handle.tsx** for an example.
  ![2021-06-01_00-04-33](file:///Users/markmccoid/Documents/Programming/playground/reanim2drag/defaulthandle.png?lastModify=1622520292)

- **handlePosition** - *Optional* - **default is 'left'** - either 'left' or 'right'.  Positions the handle component on the left or right of each Item component.

- **enableDragIndicator** - *Optional* - **default is 'false'** - Boolean that turns the drag indicator on or off.  The position of the indicator is decided by the handle position.  It will be *opposite* what the handlePosition is.

- **scrollStyles** - *Optional* - styles that will be spread on ScrollView styles prop.

- **getScrollFunctions** - *Optional* - function that passes scroll function so calling component can scroll list to start or end.

  - Implementation:

  - ```jsx
    const [scrollFunctions, setScrollFunctions] = React.useState<ScrollFunctions>();
    ...
    <DragDropEntry
        getScrollFunctions={(functionObj) => {
          setScrollFunctions(functionObj);
        }}
        ...
    > ... </DragDropEntry>
    ```

  - Now, the **scrollFunctions** variable can call the following:

  - **scrollFunctions.scrollToEnd()** or **scrollFunctions.scrollToStart()**


## sortArray helper function usage

The most common use case for Drag to Reorder will involve an array of items that you want to be able to reorder.  To be practical, you will want to update the new sorted array somewhere to persist the state of that array.

This is what the **updatePositions** property is for.  It accepts a function, which will be called every time your list of items order is changed.  A **positions** object will be passed as the only argument to the function.  You can use this object to sort your own array, or use the sortArray helper function.

First, the shape of the **positions** object:

```typescript
export type Positions = {
  [key: string]: number;
};

// the key is the id in your original array, the value is the current position
// in the scrollview.
// 
const positionExample = {
  a: 0,
  c: 3,
  b: 1,
  d: 2
}
```

**sortArray** accepts the **positions** object, your **item array** and optionally the name of your position field (if you use one).

Here is an example usage:

```tsx
<DragDropEntry
	scrollStyles={{ width: "100%", height: "30%", borderWidth: 1, borderColor: "#aaa" }}
	updatePositions={(positions) =>
				updateItemList(sortArray<ItemType>(positions, items, "pos"))
		}
  ...
>
	...
</DragDropEntry>  
```

> NOTE: The sort array will always return the passed items array sorted and if your objects in the array include a *position* property.  This is optional and you do NOT need a position key in your object in the array.

