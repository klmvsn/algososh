interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    getElements: () => T[];
    peak: () => T;
    getSize: () => number
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item)
    };

    pop = (): void => {
        this.container.pop()
    };

    clear = () => {
        this.container = [];
    }

    getElements = () => {
        return this.container;
    }

    peak = (): T => {
        const len = this.getSize();
        return this.container[len - 1];
    };

    getSize = () => this.container.length
}