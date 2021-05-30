import create, { UseStore } from "zustand";
import sortBy from "lodash/sortBy";

export type ItemType = {
  id: number;
  name: string;
  pos: number;
};

type StoreState = {
  itemList: ItemType[];
  addItem: (name: string) => void;
  removeItem: () => void;
  updateItemList: (newList: ItemType[] | undefined) => void;
  updatePositions: (positions: Positions) => void;
  updatePositions2: (positions: Positions) => void;
};

export const useStore = create<StoreState>((set) => ({
  itemList: [
    { id: 1, name: "mark", pos: 0 },
    { id: 2, name: "lori", pos: 1 },
    { id: 3, name: "haley", pos: 2 },
    { id: 4, name: "hunter", pos: 3 },
    { id: 5, name: "Abby", pos: 4 },
    { id: 6, name: "Ellie", pos: 5 },
    { id: 7, name: "2-mark", pos: 6 },
    { id: 8, name: "2-lori", pos: 7 },
    { id: 9, name: "2-haley", pos: 8 },
    { id: 10, name: "2-hunter", pos: 9 },
    { id: 11, name: "2-Abby", pos: 10 },
    { id: 12, name: "2-Ellie", pos: 11 },
    { id: 13, name: "Next tolast", pos: 12 },
    { id: 14, name: "last", pos: 13 },
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
