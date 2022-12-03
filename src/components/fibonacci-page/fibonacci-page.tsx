import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ChangeHandler } from "../../types/handler";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci.module.css';

export const FibonacciPage: React.FC = () => {

  const [input, setInput] = useState<number>(0);
  const [result, setResult] = useState<number[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const getFibonacci = (n: number) => {
    let fib = [0, 1];
    for (let i = 2; i < n + 1; i++) {
      fib.push(fib[i - 2] + fib[i - 1])
    }
    return fib;
  }

  const handleChange:ChangeHandler = (e) => {
    setInput(Number(e.target.value));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInProgress(true);
    const arr = getFibonacci(input);
    for (let i = 0; i < arr.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setResult(arr.slice(0, i + 1));
    }
    setInProgress(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.layout} onSubmit={handleSubmit}>
        <Input extraClass='mr-6' type={'number'} min={0} max={19} isLimitText={true} onChange={handleChange} />
        <Button text={'Рассчитать'} type={'submit'} isLoader={inProgress} disabled={!input || input > 19} />
      </form>
      <ul className={styles.list}>
        {result.map((item, index) => {
          return <Circle letter={item.toString()} index={index} key={index} />
        })}
      </ul>
    </SolutionLayout>
  );
};
