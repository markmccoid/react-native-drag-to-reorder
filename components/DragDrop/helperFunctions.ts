import { Positions } from "../../store/store";

interface BaseArray {
  id: string | number;
}

export type Positions = {
  [key: string]: number;
};

export function sortArray<T extends BaseArray>(
  positions: Positions,
  baseArray: T[],
  positionField?: string
) {
  if (Object.keys(positions).length <= 1) {
    return;
  }

  // positions is object { [id_of_filter]: index position },
  // so this: { 'id': 0, 'id': 1, ... }
  // 1. create an array with just the ids from the positions object, SORTED by the position (i.e. Value of positions object)
  // 2. map through this array and create a new array of objects from the passed in baseArray, thus sorting the baseArray
  // 3. check to see if positionField was passed, if so, add this field to the new array
  const sortedIds: string[] = [];
  Object.entries(positions).forEach(([id, position]) => {
    sortedIds[position] = id;
  });

  const finalList = sortedIds.map((id, index) => {
    const arrayItem = baseArray.filter((baseItem) => {
      return baseItem.id == id;
    })[0];
    if (positionField) {
      return { ...arrayItem, [positionField]: index };
    }
    return arrayItem;
  });
  return finalList;
}

// USAGE
// sortArray(positions, itemList, 'pos')
