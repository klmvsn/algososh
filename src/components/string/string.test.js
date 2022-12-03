import { ElementStates } from "../../types/element-states";
import { reverseString } from "./utils"

describe('Тестирование алгоритма разворота строки', () => {
    it('Тест разворота строки с четным количеством символов', async () => {
        const mockState = jest.fn();
        const testArray = [
            { item: '1', state: ElementStates.Default },
            { item: '2', state: ElementStates.Default },
            { item: '3', state: ElementStates.Default },
            { item: '4', state: ElementStates.Default },
        ];
        const reversedTestArray = [
            { item: '4', state: ElementStates.Modified },
            { item: '3', state: ElementStates.Modified },
            { item: '2', state: ElementStates.Modified },
            { item: '1', state: ElementStates.Modified },
        ];
        await reverseString(testArray, mockState);
        expect(mockState).toBeCalledTimes(4);
        expect(mockState).toHaveBeenLastCalledWith(reversedTestArray);
    })
    it('Тест разворота строки с нечетным количеством символов', async () => {
        const mockState = jest.fn();
        const testArray = [
            { item: '1', state: ElementStates.Default },
            { item: '2', state: ElementStates.Default },
            { item: '3', state: ElementStates.Default },
            { item: '4', state: ElementStates.Default },
            { item: '5', state: ElementStates.Default },
        ];
        const reversedTestArray = [
            { item: '5', state: ElementStates.Modified },
            { item: '4', state: ElementStates.Modified },
            { item: '3', state: ElementStates.Modified },
            { item: '2', state: ElementStates.Modified },
            { item: '1', state: ElementStates.Modified },
        ];
        await reverseString(testArray, mockState);
        expect(mockState).toBeCalledTimes(5);
        expect(mockState).toHaveBeenLastCalledWith(reversedTestArray);
    })
    it('Тест разворота строки с одним символом', async () => {
        const mockState = jest.fn();
        const testArray = [{ item: '1', state: ElementStates.Default }];
        const reversedTestArray = [{ item: '1', state: ElementStates.Modified }];
        await reverseString(testArray, mockState);
        expect(mockState).toBeCalledTimes(1);
        expect(mockState).toHaveBeenLastCalledWith(reversedTestArray);
    })
    it('Тест разворота пустой строки', async () => {
        const mockState = jest.fn();
        const testArray = [];
        await reverseString(testArray, mockState);
        expect(mockState).toBeCalledTimes(0);
    })
})