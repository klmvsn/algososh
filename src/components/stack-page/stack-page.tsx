import React, { useState } from "react";
import { EXTRA_SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { ChangeHandler } from "../../types/handler";
import { TInProgress, TStack } from "../../types/stack";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack.module.css';
import { Stack } from "./utils";


export const StackPage: React.FC = () => {

  const basicStack = new Stack<TStack>()
  const [stack, setStack] = useState<Stack<TStack>>(basicStack);
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<TStack[]>([]);
  const [inProgress, setInProgress] = useState<TInProgress>({ push: false, pop: false });

  const handleChange: ChangeHandler = (e) => {
    setInput(e.target.value);
  }

  const getAnimation = async (newStack: Stack<TStack>) => {
    setStack(newStack);
    setResult([...newStack.getElements()]);
    await delay(EXTRA_SHORT_DELAY_IN_MS);
  }

  const push = async () => {
    setInProgress({ ...inProgress, push: true })
    const updatedStack = stack;
    updatedStack.push({ item: input, state: ElementStates.Changing });
    await getAnimation(updatedStack);
    setInput('');
    updatedStack.peak().state = ElementStates.Default;
    await getAnimation(updatedStack);
    setInProgress({ ...inProgress, push: false })
  }

  const pop = async () => {
    setInProgress({ ...inProgress, pop: true })
    const updatedStack = stack;
    updatedStack.peak().state = ElementStates.Changing;
    await getAnimation(updatedStack);
    updatedStack.pop();
    await getAnimation(updatedStack);
    setInProgress({ ...inProgress, pop: false })
  }

  const clear = () => {
   const updatedStack = stack;
   updatedStack.clear();
   setStack(updatedStack);
   setResult([]);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <div className={styles.inputContainer}>
          <Input type={'text'} maxLength={4} isLimitText={true} value={input} onChange={handleChange} />
          <Button text={'Добавить'} onClick={push} disabled={!input} isLoader={inProgress.push} />
          <Button text={'Удалить'} onClick={pop} disabled={!stack.getSize()} isLoader={inProgress.pop} />
        </div>
        <Button text={'Очистить'} onClick={clear} disabled={!stack.getSize()} />
      </form>
      <ul className={styles.list}>
        {result.map((item, index) => {
          return <Circle letter={item.item} state={item.state} index={index} head={index === (stack.getSize() - 1) ? 'top' : ''} key={index} />
        })}
      </ul>
    </SolutionLayout>
  );
};
