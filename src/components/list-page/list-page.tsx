import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAXLENGTH } from "../../constants/length";
import { ElementStates } from "../../types/element-states";
import { ChangeHandler } from "../../types/handler";
import { TListInProgress, TListItem } from "../../types/list";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list.module.css'
import { basicArray, LinkedList, listArray } from "./utils";

export const ListPage: React.FC = () => {

  const list = new LinkedList(basicArray);

  const [input, setInput] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [result, setResult] = useState<TListItem[]>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<TListInProgress>({
    append: false,
    prepend: false,
    deleteHead: false,
    deleteTail: false,
    addByIndex: false,
    deleteByIndex: false
  })

  const handleChange: ChangeHandler = (e) => {
    setInput(e.target.value);
  }

  const handleChangeInputIndex: ChangeHandler = (e) => {
    setInputIndex(e.target.value);
  }

  const getAnimation = async () => {
    setResult([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
  }

  const handleAppend = async () => {
    setDisabled(true);
    setInProgress({ ...inProgress, append: true });
    const lastElement = listArray.length - 1;
    list.append(input);
    listArray[lastElement].additionalElement = {
      item: input,
      state: ElementStates.Changing,
      action: 'add'
    }
    await getAnimation();
    listArray[lastElement].additionalElement = null;
    listArray.push({
      item: input,
      state: ElementStates.Modified,
    })
    await getAnimation();
    listArray[listArray.length - 1].state = ElementStates.Default;
    await getAnimation();
    setInput('');
    setInProgress({ ...inProgress, append: false });
    setDisabled(false);
  }

  const handlePrepend = async () => {
    setDisabled(true);
    setInProgress({ ...inProgress, prepend: true });
    list.prepend(input);
    listArray[0].additionalElement = {
      item: input,
      state: ElementStates.Changing,
      action: 'add'
    }
    await getAnimation();
    listArray[0].additionalElement = null;
    listArray.unshift({
      item: input,
      state: ElementStates.Modified,
    })
    await getAnimation();
    listArray[0].state = ElementStates.Default;
    await getAnimation();
    setInput('');
    setInProgress({ ...inProgress, prepend: false });
    setDisabled(false);
  }

  const handleDeleteHead = async () => {
    setDisabled(true);
    setInProgress({ ...inProgress, deleteHead: true });
    list.deleteHead();
    listArray[0] = {
      ...listArray[0],
      item: '',
      additionalElement: {
        item: listArray[0].item,
        state: ElementStates.Changing,
        action: 'remove'
      }
    }
    await getAnimation();
    listArray.shift();
    await getAnimation();
    setInput('');
    setInProgress({ ...inProgress, deleteHead: false });
    setDisabled(false);
  }

  const handleDeleteTail = async () => {
    setDisabled(true);
    setInProgress({ ...inProgress, deleteTail: true });
    const lastElement = listArray.length - 1;
    list.deleteTail();
    listArray[lastElement] = {
      ...listArray[lastElement],
      item: '',
      additionalElement: {
        item: listArray[lastElement].item,
        state: ElementStates.Changing,
        action: 'remove'
      }
    }
    await getAnimation();
    listArray.pop();
    await getAnimation();
    setInput('');
    setInProgress({ ...inProgress, deleteTail: false });
    setDisabled(false);
  }

  const handleAddByIndex = async () => {
    setInProgress({ ...inProgress, addByIndex: true });
    setDisabled(true);
    const index = parseInt(inputIndex);
    list.addByIndex(input, index);
    for (let i = 0; i <= index; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
        additionalElement: {
          item: input,
          state: ElementStates.Changing,
          action: 'add'
        }
      }
      await getAnimation();
      listArray[i] = {
        ...listArray[i],
        additionalElement: null
      }
      setResult([...listArray]);
    }
    listArray[index] = {
      ...listArray[index],
      state: ElementStates.Default,
      additionalElement: null
    }
    listArray.splice(parseInt(inputIndex), 0, { item: input, state: ElementStates.Modified });
    await getAnimation();
    for (let i = 0; i <= index; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Default
      }
    }
    await getAnimation();
    setInput('');
    setInputIndex('');
    setInProgress({ ...inProgress, addByIndex: false });
    setDisabled(false);
  }

  const handleDeleteByIndex = async () => {
    setDisabled(true);
    setInProgress({ ...inProgress, deleteByIndex: true });
    const index = parseInt(inputIndex);
    list.deleteByIndex(index);
    for (let i = 0; i <= index; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
      }
      await getAnimation();
    }
    listArray[index] = {
      ...listArray[index],
      item: '',
      state: ElementStates.Default,
      additionalElement: {
        item: listArray[index].item,
        state: ElementStates.Changing,
        action: 'remove'
      }
    }
    await getAnimation();
    listArray.splice(index, 1);
    for (let i = 0; i < index; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Default
      }
    }
    await getAnimation();
    setInput('');
    setInputIndex('');
    setInProgress({ ...inProgress, deleteByIndex: false });
    setDisabled(false);
  }

  useEffect(() => {
    setResult([...listArray]);
  }, [])

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.formRow} onSubmit={e => e.preventDefault()}>
        <Input
          extraClass={styles.input}
          type={'text'} maxLength={4}
          isLimitText={true}
          placeholder={'Введите значение'}
          value={input}
          onChange={handleChange}
        />
        <Button
          text={'Добавить в head'}
          onClick={handlePrepend}
          isLoader={inProgress.prepend}
          disabled={disabled || listArray.length >= MAXLENGTH || !input}
        />
        <Button
          text={'Добавить в tail'}
          onClick={handleAppend}
          isLoader={inProgress.append}
          disabled={disabled || listArray.length >= MAXLENGTH || !input}
        />
        <Button
          text={'Удалить из head'}
          onClick={handleDeleteHead}
          isLoader={inProgress.deleteHead}
          disabled={disabled || listArray.length <= 1}
        />
        <Button
          text={'Удалить из tail'}
          onClick={handleDeleteTail}
          isLoader={inProgress.deleteTail}
          disabled={disabled || listArray.length <= 1}
        />
      </form>
      <form className={styles.formRow} onSubmit={e => e.preventDefault()}>
        <Input
          extraClass={styles.input}
          type={'number'}
          placeholder={'Введите индекс'}
          value={inputIndex}
          onChange={handleChangeInputIndex}
        />
        <Button
          extraClass={styles.button}
          text={'Добавить по индексу'}
          onClick={handleAddByIndex}
          isLoader={inProgress.addByIndex}
          disabled={disabled || !input || !parseInt(inputIndex) || listArray.length >= MAXLENGTH || parseInt(inputIndex) > listArray.length - 1}
        />
        <Button
          extraClass={styles.button}
          text={'Удалить по индексу'}
          onClick={handleDeleteByIndex}
          isLoader={inProgress.deleteByIndex}
          disabled={disabled || !inputIndex || parseInt(inputIndex) > listArray.length - 1 || parseInt(inputIndex) < 0}
        />
      </form>
      <ul className={styles.listContainer} >
        {result?.map((item, index) => {
          return (
            <li key={index} className={styles.listElement}>
              {item.additionalElement &&
                <Circle
                  extraClass={`${styles[`${item.additionalElement.action}`]}`}
                  letter={item.additionalElement.item}
                  state={item.additionalElement.state}
                  isSmall
                />
              }
              <Circle
                letter={item?.item}
                state={item?.state}
                index={index}
              />
              {index !== result?.length - 1 && (<ArrowIcon />)}
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
