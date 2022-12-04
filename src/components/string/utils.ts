import { Dispatch, SetStateAction } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArray } from "../../types/string";
import { delay } from "../../utils/delay";

const swap = <T>(array: T[], fistElement: number, secondElement: number) => {
  const temp = array[fistElement];
  array[fistElement] = array[secondElement];
  array[secondElement] = temp;
};

export const reverseString = async (array: TArray[], setState: Dispatch<SetStateAction<TArray[]>>) => {
  for (let i = 0; i < Math.ceil(array.length / 2); i++) {
    const firstElement = i;
    const secondElement = array.length - i - 1;
    if (firstElement < secondElement) {
      array[firstElement].state = ElementStates.Changing;
      array[secondElement].state = ElementStates.Changing;
      setState([...array]);
      await delay(DELAY_IN_MS);
      swap(array, firstElement, secondElement);
      array[firstElement].state = ElementStates.Modified;
      array[secondElement].state = ElementStates.Modified;
      setState([...array]);
    } else {
      array[firstElement].state = ElementStates.Modified;
      setState([...array]);
    }
  }
  await delay(DELAY_IN_MS);
}