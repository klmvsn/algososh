import { ElementStates } from "../../types/element-states";
type TNewArray = {
    item: number;
    state: ElementStates
  }

export const randomArr = (min = 3, max = 17) => {
    const lim = Math.floor(min + Math.random() * (max + 1 - min));
    const arr = [];
    for (let i = 0; i < lim; i++) {
        arr.push({item: Math.floor(Math.random() * 100), state: ElementStates.Default});
    }
    return arr;
}

export const swap = (arr: TNewArray[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};
