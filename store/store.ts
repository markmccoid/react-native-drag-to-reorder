import create, { UseStore } from "zustand";
import sortBy from "lodash/sortBy";
import {
  Positions,
  updatePositionArrayField,
} from "../components/DragAndSort/helperFunctions";

export type ItemType = {
  id: number | string;
  name: string;
  pos: number;
};

type StoreState = {
  itemList: ItemType[];
  addItem: (name: string) => void;
  removeItem: () => void;
  removeItemById: (id) => void;
  updateItemList: (newList: ItemType[] | undefined) => void;
  updatePositions: (positions: Positions) => void;
  updatePositions2: (positions: Positions) => void;
};

export const useStore = create<StoreState>((set) => ({
  itemList: [
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
  ],
  addItem: (name) =>
    set((state) => ({
      itemList: [
        ...state.itemList,
        { id: state.itemList.length + 1, name, pos: state.itemList.length },
      ],
    })),
  removeItem: () =>
    set((state) => ({ itemList: [...state.itemList.slice(0, state.itemList.length - 1)] })),
  removeItemById: (id) =>
    set((state) => ({
      itemList: updatePositionArrayField(
        [...state.itemList.filter((item) => item.id !== id)],
        "pos"
      ),
    })),
  updateItemList: (newList: ItemType[] | undefined) =>
    set((state) => ({ itemList: newList || [] })),
  updatePositions: (positions: Positions) =>
    set((state) => {
      const newItems: ItemType[] = [];
      for (const [key, value] of Object.entries(positions)) {
        state.itemList.forEach((el) => {
          if (el.id === parseInt(key)) {
            el.pos = positions[key];
            newItems.push(el);
          }
        });
      }
      return { itemList: newItems };
    }),
  updatePositions2: (positions: Positions) =>
    set((state) => {
      const newItems: ItemType[] = [];
      for (const [key, value] of Object.entries(positions)) {
        state.itemList.forEach((el) => {
          if (el.id === parseInt(key)) {
            el.pos = positions[key];
            newItems.push(el);
          }
        });
      }

      return { itemList: sortBy(newItems, ["pos"]) };
    }),
}));
