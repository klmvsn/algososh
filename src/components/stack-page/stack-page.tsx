import React, { ChangeEvent, useState } from "react";
import { EXTRA_SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TInProgress, TStack } from "../../types/stack";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack.module.css';


export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<TStack[]>([]);
  const [input, setInput] = useState<string>('');
  const [inProgress, setInProgress] = useState<TInProgress>({ push: false, pop: false });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const push = async () => {
    setInProgress({ ...inProgress, push: true })
    const updatedStack = stack;
    updatedStack.push({ item: input, state: ElementStates.Changing });
    setStack([...updatedStack]);
    setInput('');
    await delay(EXTRA_SHORT_DELAY_IN_MS);
    updatedStack[updatedStack.length - 1].state = ElementStates.Default;
    setStack([...updatedStack]);
    setInProgress({ ...inProgress, push: false })
  }

  const pop = async () => {
    setInProgress({ ...inProgress, pop: true })
    const updatedStack = stack;
    updatedStack[updatedStack.length - 1].state = ElementStates.Changing;
    setStack([...updatedStack]);
    await delay(EXTRA_SHORT_DELAY_IN_MS);
    updatedStack.pop();
    setStack([...updatedStack]);
    setInProgress({ ...inProgress, pop: false })
  }

  const clear = () => {
    setStack([]);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} >
        <div className={styles.inputContainer}>
          <Input type={'text'} maxLength={4} isLimitText={true} value={input} onChange={handleChange} />
          <Button text={'Добавить'} onClick={push} disabled={!input} isLoader={inProgress.push}/>
          <Button text={'Удалить'} onClick={pop} disabled={!stack.length} isLoader={inProgress.pop}/>
        </div>
        <Button text={'Очистить'} onClick={clear} disabled={!stack.length} />
      </form>
      <ul className={styles.list}>
        {stack.map((item, index) => {
          return <Circle letter={item.item} state={item.state} index={index} head={index === (stack.length - 1) ? 'top' : ''} key={index} />
        })}
      </ul>
    </SolutionLayout>
  );
};
