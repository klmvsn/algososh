import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { ChangeHandler } from "../../types/handler";
import { TArray } from "../../types/string";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { swap } from "./utils";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [arrayOfChars, setArrayOfChars] = useState<TArray[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [step, setStep] = useState(-1);

  const swapString = async () => {
    if (step < 0)
      return;
    if (step >= arrayOfChars.length / 2) {
      setInProgress(false);
      return;
    }
    setArrayOfChars(await swap(arrayOfChars, step, delay));
    setStep(step + 1);
  }

  const handleChange: ChangeHandler = (e) => {
    setInput(e.target.value);
  }

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chars: TArray[] = [];
    input.split('').forEach((item, index) => {
      chars.push({ item: item, state: index === 0 || index === input.length - 1 ? ElementStates.Changing : ElementStates.Default });
    })

    setArrayOfChars([...chars]);

    setInProgress(true);
    setStep(0);
  }

  useEffect(() => {
    swapString();
  }, [step])

  return (
    <SolutionLayout title="Строка">
      <form className={styles.layout} onSubmit={handleClick}>
        <Input isLimitText={true} maxLength={11} extraClass='mr-6' value={input} onChange={handleChange} />
        <Button text={'Развернуть'} type={'submit'} disabled={!input} isLoader={inProgress} />
      </form>
      <ul className={styles.list}>
        {arrayOfChars.map((char, index) => {
          return <Circle letter={char.item} state={char.state} key={index} />
        })}
      </ul>
    </SolutionLayout>
  );
};