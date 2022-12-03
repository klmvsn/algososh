import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "./utils";

let testArray;
let sortedAscending;
let sortedDeascending;

const NO_DELAY = 0;

describe('Тестирование алгоритма сортировки выбором', () => {
    beforeEach(() => {
        testArray = [
            { item: '4', state: ElementStates.Default },
            { item: '3', state: ElementStates.Default },
            { item: '8', state: ElementStates.Default },
            { item: '1', state: ElementStates.Default },
            { item: '5', state: ElementStates.Default }
        ]

        sortedAscending = [
            { item: '1', state: ElementStates.Modified },
            { item: '3', state: ElementStates.Modified },
            { item: '4', state: ElementStates.Modified },
            { item: '5', state: ElementStates.Modified },
            { item: '8', state: ElementStates.Modified }
        ]

        sortedDeascending = [
            { item: '8', state: ElementStates.Modified },
            { item: '5', state: ElementStates.Modified },
            { item: '4', state: ElementStates.Modified },
            { item: '3', state: ElementStates.Modified },
            { item: '1', state: ElementStates.Modified }
        ]
    });
    it('Тест сортировки пустого массива по возрастанию', async () => {
        const mockState = jest.fn();
        const array = [];
        await selectionSort(true, array, mockState, NO_DELAY);
        expect(mockState).toBeCalledTimes(0);
    })
    it('Тест сортировки пустого массива по убыванию', async () => {
        const mockState = jest.fn();
        const array = [];
        await selectionSort(false, array, mockState, NO_DELAY);
        expect(mockState).toBeCalledTimes(0);
    })
    it('Тест сортировки массива из одного элемента по возрастанию', async () => {
        const mockState = jest.fn();
        const array = [{ item: '0', state: ElementStates.Default }];
        const sortedArray = [{ item: '0', state: ElementStates.Modified }];
        await selectionSort(true, array, mockState, NO_DELAY);
        expect(mockState).toHaveBeenLastCalledWith(sortedArray);
    })
    it('Тест сортировки массива из одного элемента по убыванию', async () => {
        const mockState = jest.fn();
        const array = [{ item: '0', state: ElementStates.Default }];
        const sortedArray = [{ item: '0', state: ElementStates.Modified }];
        await selectionSort(false, array, mockState, NO_DELAY);
        expect(mockState).toHaveBeenLastCalledWith(sortedArray);
    })
    it('Тест сортировки массива из нескольких элементов по возрастанию', async () => {
        const mockState = jest.fn();
        await selectionSort(true, testArray, mockState, NO_DELAY);
        expect(mockState).toHaveBeenLastCalledWith(sortedAscending);
    })
    it('Тест сортировки массива из нескольких элементов по убыванию', async () => {
        const mockState = jest.fn();
        await selectionSort(false, testArray, mockState, NO_DELAY);
        expect(mockState).toHaveBeenLastCalledWith(sortedDeascending);
    })
})

describe('Тестирование алгоритма сортировки пузырьком', () => {
    it('Тест сортировки пустого массива по возрастанию', async () => {
        const mockState = jest.fn();
        const array = [];
        await bubbleSort(true, array, mockState, NO_DELAY);
        expect(mockState).toBeCalledTimes(1);
    })
    it('Тест сортировки пустого массива по убыванию', async () => {
        const mockState = jest.fn();
        const array = [];
        await bubbleSort(false, array, mockState, NO_DELAY);
        expect(mockState).toBeCalledTimes(1);
    })
    it('Тест сортировки массива из одного элемента по возрастанию', async () => {
        const mockState = jest.fn();
        const array = [{ item: '0', state: ElementStates.Default }];
        const sortedArray = [{ item: '0', state: ElementStates.Modified }];
        await bubbleSort(true, array, mockState, NO_DELAY);
        expect(mockState).toHaveBeenLastCalledWith(sortedArray);
    })
    it('Тест сортировки массива из одного элемента по убыванию', async () => {
        const mockState = jest.fn();
        const array = [{ item: '0', state: ElementStates.Default }];
        const sortedArray = [{ item: '0', state: ElementStates.Modified }];
        await bubbleSort(false, array, mockState, NO_DELAY);
        expect(mockState).toHaveBeenLastCalledWith(sortedArray);
    })
    it('Тест сортировки массива из нескольких элементов по возрастанию', async () => {
        const mockState = jest.fn();
        await bubbleSort(true, testArray, mockState, NO_DELAY);
        expect(mockState).toHaveBeenLastCalledWith(sortedAscending);
    })
    it('Тест сортировки массива из нескольких элементов по убыванию', async () => {
        const mockState = jest.fn();
        await bubbleSort(false, testArray, mockState, NO_DELAY);
        expect(mockState).toHaveBeenLastCalledWith(sortedDeascending);
    })
})