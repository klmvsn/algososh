import React, { ChangeEvent, useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TInProgress, TQueue } from "../../types/queue";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue.module.css';
import { IQueue, Queue } from "./utils";

export const QueuePage: React.FC = () => {

  const basicQueue: TQueue[] = Array.from({ length: 7 }, () => ({
    item: '',
    state: ElementStates.Default
  }))

  const [queue, setQueue] = useState<IQueue<TQueue>>(new Queue<TQueue>(7));
  const [input, setInput] = useState<string>('');
  const [inProgress, setInProgress] = useState<TInProgress>({ add: false, remove: false });
  const [result, setResult] = useState<(TQueue | null)[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const getAnimation = async (queue: IQueue<TQueue>) => {
    setQueue(queue);
    setResult([...queue.getQueue()]);
    await delay(SHORT_DELAY_IN_MS);
  }

  const enqueue = async () => {
    setInProgress({ ...inProgress, add: true })
    const tempQueue = queue;
    tempQueue.enqueue({ item: input, state: ElementStates.Changing });
    const newTail = tempQueue.getTail();
    setInput('');
    await getAnimation(tempQueue);
    if (newTail) newTail.state = ElementStates.Default;
    getAnimation(tempQueue);
    setInProgress({ ...inProgress, add: false })
  }

  const dequeue = async () => {
    setInProgress({ ...inProgress, remove: true })
    const tempQueue = queue;
    const head = tempQueue.getHead();
    if (head) head.state = ElementStates.Changing;
    await getAnimation(tempQueue);
    tempQueue.dequeue();
    getAnimation(tempQueue);
    if(queue.isEmpty()) clear();
    setInProgress({ ...inProgress, remove: false })
  }

  const clear = () => {
    setQueue(new Queue<TQueue>(7));
    setResult(basicQueue);
  }

  useEffect(() => {
    setResult(basicQueue);
  }, [])

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} >
        <div className={styles.inputContainer}>
          <Input type={'text'} maxLength={4} isLimitText={true} value={input} onChange={handleChange} />
          <Button text={'Добавить'} onClick={enqueue} isLoader={inProgress.add} disabled={!input || queue.isFull()}/>
          <Button text={'Удалить'} onClick={dequeue} isLoader={inProgress.remove} disabled={queue.isEmpty()}/>
        </div>
        <Button text={'Очистить'} onClick={clear} disabled={queue.isEmpty()}/>
      </form>
      <ul className={styles.list}>
        {result.map((item, index) => {
          return <Circle
            letter={item?.item}
            state={item?.state}
            index={index}
            key={index}
            head={index === queue.getHeadIndex() && !queue.isEmpty() ? 'head' : ''}
            tail={index === queue.getTailIndex() && !queue.isEmpty() ? 'tail' : ''}
          />
        })}
      </ul>
    </SolutionLayout>
  );
};
