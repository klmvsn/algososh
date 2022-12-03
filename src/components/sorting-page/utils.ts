import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
type TNewArray = {
    item: number;
    state: ElementStates
}

export const randomArr = (min = 3, max = 17) => {
    const lim = Math.floor(min + Math.random() * (max + 1 - min));
    const arr = [];
    for (let i = 0; i < lim; i++) {
        arr.push({ item: Math.floor(Math.random() * 100), state: ElementStates.Default });
    }
    return arr;
}

export const swap = (arr: TNewArray[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

const sortAnimation = async (array: TNewArray[], setArray: Dispatch<SetStateAction<TNewArray[]>>, time:number) => {
    setArray([...array]);
    await delay(time);
}

export const selectionSort = async (isAscending: boolean, array: TNewArray[], setArray: Dispatch<SetStateAction<TNewArray[]>>, time:number) => {
    for (let i = 0; i < array.length; i++) {
        let maxInd = i;
        array[maxInd].state = ElementStates.Changing;
        setArray([...array]);
        for (let j = i + 1; j < array.length; j++) {
            array[j].state = ElementStates.Changing;
            await sortAnimation(array, setArray,time);
            if (isAscending) {
                if (array[maxInd].item > array[j].item)
                    maxInd = j;
            } else {
                if (array[maxInd].item < array[j].item)
                    maxInd = j;
            }
            array[j].state = ElementStates.Default;
            await sortAnimation(array, setArray,time);
        }
        swap(array, i, maxInd);
        array[maxInd].state = ElementStates.Default;
        array[i].state = ElementStates.Modified;
        await sortAnimation(array, setArray,time);
    }
}

export const bubbleSort = async (isAscending: boolean, array: TNewArray[], setArray: Dispatch<SetStateAction<TNewArray[]>>,time:number) => {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            array[j].state = ElementStates.Changing;
            array[j + 1].state = ElementStates.Changing;
            await sortAnimation(array, setArray,time);
            if (isAscending) {
                if (array[j].item > array[j + 1].item) {
                    swap(array, j, j + 1);
                    await sortAnimation(array, setArray,time);
                }
            } else {
                if (array[j].item < array[j + 1].item) {
                    swap(array, j, j + 1);
                    await sortAnimation(array, setArray,time);
                }
            }
            array[j].state = ElementStates.Default;
            array[j + 1].state = ElementStates.Default;
        }
        array[array.length - i - 1].state = ElementStates.Modified;
        await sortAnimation(array, setArray,time);
    }
    if (array.length) array[0].state = ElementStates.Modified;
    await sortAnimation(array, setArray,time);
}