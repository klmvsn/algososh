import { Button } from "./button";
import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Тест компонента Button', () => {
    it('Кнопка с текстом', () => {
        const button = renderer.create(<Button text="Text" />).toJSON();
        expect(button).toMatchSnapshot();
    })
    it('Тест кнопки без текста', () => {
        const button = renderer.create(<Button />).toJSON();
        expect(button).toMatchSnapshot();
    })
    it('Тест заблокированной кнопки', () => {
        const button = renderer.create(<Button disabled />).toJSON();
        expect(button).toMatchSnapshot();
    })
    it('Тест кнопки с индикацией загрузки', () => {
        const button = renderer.create(<Button isLoader={true} />).toJSON();
        expect(button).toMatchSnapshot();
    })
    it('Тест на корректность вызова коллбэка при клике на кнопку', () => {
        window.alert = jest.fn();
        render(<Button text="button" onClick={alert("Alert")} />);
        const button = screen.getByText('button');
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith('Alert');
    })
})