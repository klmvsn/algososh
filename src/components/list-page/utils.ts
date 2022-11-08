import { ElementStates } from "../../types/element-states";
import { TListItem } from "../../types/list";

export class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = next === undefined ? null : next;
    }
}

export interface ILinkedList<T> {
    append: (item: T) => void;
    prepend: (item: T) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    addByIndex: (item: T, index: number) => void;
    deleteByIndex: (index:number) => void;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;

    constructor(basicList?: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        basicList?.forEach(item => this.append(item))
    }

    append = (item: T) => {
        const node = new Node(item);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
        this.size++;
    }

    prepend = (item: T) => {
        const node = new Node(item, this.head);
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
        this.size++;
    }

    deleteHead = () => {
        if (this.head) {
            this.head = this.head.next;
            this.size--;
        }
    }

    deleteTail = () => {
        if (!this.head?.next) {
            this.head = null;
        } else {
            let current = this.head;
            while (current.next?.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }

    addByIndex = (item: T, index: number) => {
        if (index < 0 || index > this.size) {
            return;
        } else {
            const node = new Node(item);
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let current = this.head;
                let currentIndex = 0;
                while (currentIndex < index) {
                    currentIndex++;
                    if (current?.next && currentIndex !== index) {
                        current = current?.next;
                    }
                }
                if (current) {
                    node.next = current.next;
                    current.next = node;
                }
            }
            this.size++;
        }
    }

    deleteByIndex = (index: number) => {
        if (index >= 0 && index < this.size && this.head) {
            let current = this.head;
            let previous = current;
            let currIndex = 0;
            if (index === 0) {
                this.head = current.next;
            } else {
                while (currIndex < index) {
                    currIndex++
                    if (current.next) {
                        previous = current;
                        current = current.next;
                    }
                }
                previous.next = current.next;
            }
            this.size--;
        }
    }
}



const randomArray = () => {
    return Array.from({ length: 4 }, () => `${Math.floor(Math.random() * 100)}`);
}

export const basicArray:string[] = randomArray();
export const listArray:TListItem[] = basicArray.map(item => ({
    item: item,
    state: ElementStates.Default,
}))