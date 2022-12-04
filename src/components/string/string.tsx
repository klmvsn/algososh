import React, { useCallback, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { ChangeHandler } from "../../types/handler";
import { TArray } from "../../types/string";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { reverseString } from "./utils";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [arrayOfChars, setArrayOfChars] = useState<TArray[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const handleChange: ChangeHandler = (e) => {
    setInput(e.target.value);
  }

  const handleClick = useCallback(
    async (value: string) => {
      setInProgress(true);
      setInput("");
      const chars = value.split("").map((item) => ({ item, state: ElementStates.Default }));
      setArrayOfChars(chars);
      await reverseString(chars, setArrayOfChars);
      setInProgress(false);
    },
    [setInProgress, setInput, setArrayOfChars]
  );

  return (
    <SolutionLayout title="Строка">
      <form className={styles.layout}>
        <Input isLimitText={true} maxLength={11} extraClass='mr-6' value={input} onChange={handleChange} data-cy='input'/>
        <Button text={'Развернуть'} disabled={!input} isLoader={inProgress} onClick={() => handleClick(input)} />
      </form>
      <ul className={styles.list}>
        {arrayOfChars.map((char, index) => {
          return <Circle letter={char.item} state={char.state} key={index} />
        })}
      </ul>
    </SolutionLayout>
  );
};