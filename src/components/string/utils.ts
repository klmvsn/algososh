import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArray } from "../../types/string";

export const swap = async (array:TArray[],step:number,delay: (ms: number) => Promise<null>) => {
    if (array.length === 1){
      array[0].state = ElementStates.Modified;
    }
  
    let temp = array[step];
    array[step] = array[array.length - step - 1];
    array[array.length - step - 1] = temp;
  
    array[step].state = ElementStates.Modified;
    array[array.length - step - 1].state = ElementStates.Modified;
  
    if (step + 1 < array.length - step - 2) {
      array[step + 1].state = ElementStates.Changing;
      array[array.length - step - 2].state = ElementStates.Changing;
    }
  
    if (step + 1 === array.length - step - 2) 
      array[step + 1].state = ElementStates.Modified;
  
    await delay(DELAY_IN_MS);
    return array;
  }