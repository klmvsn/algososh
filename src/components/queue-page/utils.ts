export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    getHead: () => T | null;
    getHeadIndex: () => number;
    getTail: () => T | null;
    getTailIndex: () => number;
    getQueue: () => (T | null)[];
    isEmpty: () => boolean;
    isFull: () => boolean;
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        if (!this.isEmpty()) {
            this.tail = (this.tail + 1) % this.size;
        }
        this.container[this.tail % this.size] = item;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        this.container[this.head % this.size] = null;
        this.head = (this.head + 1) % this.size;
        this.length--;
    };

    getHead = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.head];
    };

    getHeadIndex = () => {
        return this.head;
    }

    getTail = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.tail];
    };

    getTailIndex = () => {
        return this.tail;
    }

    getQueue = (): (T | null)[] => {
        return this.container
    }

    isEmpty = () => this.length === 0;
    
    isFull = () => this.length >= this.size;
}
