import React, { useEffect, useState } from "react";
import { EXTRA_SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TInProgress, TNewArray } from "../../types/sorting";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting.module.css';
import { randomArr, swap } from "./utils";


export const SortingPage: React.FC = () => {

  const [newArray, setNewArray] = useState<TNewArray[]>([]);
  const [checked, setChecked] = useState<string>('selection');
  const [inProgress, setInProgress] = useState<TInProgress>({ascending: false, descending: false})

  const handleNewArray = () => {
    setNewArray(randomArr());
  }

  const handleAscending = () => {
    if (checked === 'selection')
      selectionSort(true);
    if (checked === 'bubble')
      bubbleSort(true);
  }

  const handleDescending = () => {
    if (checked === 'selection')
      selectionSort(false);
    if (checked === 'bubble')
      bubbleSort(false);
  }

  const sortAnimation = async () => {
    setNewArray([...newArray]);
    await delay(EXTRA_SHORT_DELAY_IN_MS);
  }

  const selectionSort = async (isAscending: boolean) => {
    setInProgress({...inProgress, ascending: isAscending, descending: !isAscending});
    for (let i = 0; i < newArray.length; i++) {
      let maxInd = i;
      newArray[maxInd].state = ElementStates.Changing;
      setNewArray([...newArray]);
      for (let j = i + 1; j < newArray.length; j++) {
        newArray[j].state = ElementStates.Changing;
        await sortAnimation();
        if (isAscending) {
          if (newArray[maxInd].item > newArray[j].item)
            maxInd = j;
        } else {
          if (newArray[maxInd].item < newArray[j].item)
            maxInd = j;
        }
        newArray[j].state = ElementStates.Default;
        await sortAnimation();
      }
      swap(newArray, i, maxInd);
      newArray[maxInd].state = ElementStates.Default;
      newArray[i].state = ElementStates.Modified;
      await sortAnimation();
    }
    setInProgress({...inProgress, ascending: false, descending: false});
  };

  const bubbleSort = async (isAscending: boolean) => {
    setInProgress({...inProgress, ascending: isAscending, descending: !isAscending});
    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - 1 - i; j++) {
        newArray[j].state = ElementStates.Changing;
        newArray[j + 1].state = ElementStates.Changing;
        await sortAnimation();
        if (isAscending) {
          if (newArray[j].item > newArray[j + 1].item) {
            swap(newArray, j, j + 1);
            await sortAnimation();
          }
        } else {
          if (newArray[j].item < newArray[j + 1].item) {
            swap(newArray, j, j + 1);
            await sortAnimation();
          }
        }
        newArray[j].state = ElementStates.Default;
        newArray[j + 1].state = ElementStates.Default;
      }
      newArray[newArray.length - i - 1].state = ElementStates.Modified;
      await sortAnimation();
    }
    newArray[0].state = ElementStates.Modified;
    await sortAnimation();
    setInProgress({...inProgress, ascending: false, descending: false});
  }

  useEffect(() => {
    setNewArray(randomArr())
  }, [])


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.handles}>
        <div className={styles.radio}>
          <RadioInput
            label={'Выбор'}
            value={'selection'}
            name={'sorting'}
            checked={checked === 'selection'}
            onChange={() => setChecked('selection')}
            disabled={inProgress.ascending || inProgress.descending}
          />
          <RadioInput
            label={'Пузырёк'}
            value={'bubble'}
            name={'sorting'}
            checked={checked === 'bubble'}
            onChange={() => setChecked('bubble')}
            disabled={inProgress.ascending || inProgress.descending}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            sorting={Direction.Ascending}
            text={'По возрастанию'}
            onClick={() => handleAscending()}
            disabled={inProgress.ascending || inProgress.descending}
            isLoader={inProgress.ascending}
          />
          <Button
            sorting={Direction.Descending}
            text={'По убыванию'}
            onClick={() => handleDescending()}
            disabled={inProgress.ascending || inProgress.descending}
            isLoader={inProgress.descending}
          />
        </div>
        <Button text={'Новый массив'} onClick={handleNewArray} disabled={inProgress.ascending || inProgress.descending} />
      </div>
      <ul className={styles.column}>
        {newArray.map((item, index) => {
          return <Column index={item.item} key={index} state={item.state} />
        })}
      </ul>
    </SolutionLayout>
  );
};
