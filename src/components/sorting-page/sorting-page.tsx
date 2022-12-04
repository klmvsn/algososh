import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { TInProgress, TNewArray } from "../../types/sorting";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting.module.css';
import { bubbleSort, randomArr, selectionSort } from "./utils";


export const SortingPage: React.FC = () => {

  const [newArray, setNewArray] = useState<TNewArray[]>([]);
  const [checked, setChecked] = useState<string>('selection');
  const [inProgress, setInProgress] = useState<TInProgress>({ ascending: false, descending: false })

  const handleNewArray = () => {
    setNewArray(randomArr());
  }

  const handleAscending = () => {
    setInProgress({ ...inProgress, ascending: true, descending: false });
    if (checked === 'selection')
      selectionSort(true, newArray, setNewArray,SHORT_DELAY_IN_MS);
    if (checked === 'bubble')
      bubbleSort(true, newArray, setNewArray,SHORT_DELAY_IN_MS);
    setInProgress({ ...inProgress, ascending: false, descending: false });
  }

  const handleDescending = () => {
    setInProgress({ ...inProgress, ascending: false, descending: true });
    if (checked === 'selection')
      selectionSort(false, newArray, setNewArray,SHORT_DELAY_IN_MS);
    if (checked === 'bubble')
      bubbleSort(false, newArray, setNewArray,SHORT_DELAY_IN_MS);
    setInProgress({ ...inProgress, ascending: false, descending: false });
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
